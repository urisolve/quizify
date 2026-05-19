const db = require('../../config/db');
const User = require('../../models/User');

// Algoritmo Fisher-Yates para baralhar as opções
function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

//Renderizar o questionário ou mostrar página de bloqueio se já respondido
async function showQuestionario(req, res) {
    try {
        // 1. Validar se o utilizador está logado com base no teu padrão de sessão
        if (!req.session.user || !req.session.user.id) {
            return res.redirect('/login');
        }

        const userId = req.session.user.id;
        const userRole = req.session.user.role;

        // VERIFICAÇÃO DE PERMISSÕES ESPECIAIS
        const isStaff = (userRole === 'teacher' || userRole === 'admin');

        // 2. Verificar duplicações APENAS se NÃO for professor ou administrador
        if (!isStaff) {
            const [existingSubmissions] = await db.execute(`
                SELECT id FROM questionario_inicial_submissions 
                WHERE user_id = ? 
                LIMIT 1
            `, [userId]);

            // Se já respondeu, renderiza a vista de bloqueio
            if (existingSubmissions.length > 0) {
                return res.renderPage('questionario_concluido', {
                    layout: 'main',
                    headerTitle: 'Questionário Concluído',
                    user: req.session.user,
                    message: 'Já respondeste a este questionário de avaliação inicial.'
                });
            }
        }

        // 3. Carregar as perguntas normalmente para toda a gente
        const [questions] = await db.execute(`
            SELECT id, question_text, image, correct_answer, incorrect_answer, difficulty_rating 
            FROM questionario_inicial_questions
        `);

        const processedQuestions = questions.map(q => {
            let options = [];
            try {
                options = typeof q.incorrect_answer === 'string' 
                    ? JSON.parse(q.incorrect_answer) 
                    : q.incorrect_answer;
            } catch (err) {
                options = [];
            }

            options.push(q.correct_answer);
            const shuffledOptions = shuffleArray([...options]);

            return {
                id: q.id,
                question_text: q.question_text,
                image: q.image,
                difficulty_rating: q.difficulty_rating,
                all_answers_shuffled: shuffledOptions
            };
        });

        // Renderiza a página passando o estado de "Apenas Leitura"
        res.renderPage('questionario_inicial', {
            layout: 'main',
            headerTitle: isStaff ? 'Visualização do Questionário' : 'Questionário Inicial',
            questions: processedQuestions,
            user: req.session.user,
            isReadOnly: isStaff // Envia true se for admin/teacher, false caso contrário
        });

    } catch (error) {
        console.error('Error loading questionnaire:', error);
        res.status(500).send('Internal Server Error');
    }
}

// Processar e salvar as respostas se for a primeira submissão
async function submitQuestionario(req, res) {
    try {
        // 1. Validar sessão no POST por segurança
        if (!req.session.user || !req.session.user.id) {
            return res.status(401).send('Utilizador não autenticado.');
        }

        const userId = req.session.user.id;
        const userAnswers = req.body; 

        // 2. Dupla verificação na BD para mitigar manipulações de abas abertas em simultâneo
        const [existingSubmissions] = await db.execute(`
            SELECT id FROM questionario_inicial_submissions 
            WHERE user_id = ? 
            LIMIT 1
        `, [userId]);

        if (existingSubmissions.length > 0) {
            if (req.session) {
                req.session.flash = { type: 'warning', message: 'Já respondeste a este questionário anteriormente!' };
            }
            return res.redirect('/practice-plus');
        }

        // 3. Processar pontuação do formulário
        const [questions] = await db.execute(`
            SELECT id, correct_answer, difficulty_rating 
            FROM questionario_inicial_questions
        `);

        let totalScore = 0;
        let maxPossibleScore = 0;
        const answersToInsert = [];

        for (const q of questions) {
            maxPossibleScore += q.difficulty_rating;
            const submittedChoice = userAnswers[`question_${q.id}`]; 
            
            const isCorrect = (submittedChoice === q.correct_answer);
            const pointsEarned = isCorrect ? q.difficulty_rating : 0;
            
            if (isCorrect) {
                totalScore += pointsEarned;
            }

            answersToInsert.push({
                question_id: q.id,
                selected_answer: submittedChoice || '', 
                is_correct: isCorrect ? 1 : 0,
                points_earned: pointsEarned
            });
        }

        // 4. Guardar na Tabela Master (Submissions)
        await db.execute(`
            INSERT INTO questionario_inicial_submissions (user_id, total_score, max_possible_score) 
            VALUES (?, ?, ?)
        `, [userId, totalScore, maxPossibleScore]);
        
        // 5. Guardar respostas detalhadas
        for (const ans of answersToInsert) {
            await db.execute(`
                INSERT INTO questionario_inicial_submission_answers (user_id, question_id, selected_answer, is_correct, points_earned) 
                VALUES (?, ?, ?, ?, ?)
            `, [userId, ans.question_id, ans.selected_answer, ans.is_correct, ans.points_earned]);
        }

        // Verifica se o utilizador atual na sessão tem o cargo 'start'
        if (req.session.user && req.session.user.role === 'start') {
            try {
                // 1. Atualiza na Base de Dados usando a função do teu modelo
                await User.updateUserRole(userId, 'student');
                
                // 2. Atualiza imediatamente a sessão em memória para refletir a mudança
                req.session.user.role = 'student';
                
                console.log(`[Role Sync] User ${userId} upgraded from 'start' to 'student'.`);
            } catch (roleError) {
                console.error(`[Role Sync Error] Failed to update role for user ${userId}:`, roleError);
            }
        }


        // 6. Definir mensagem flash e redirecionar para /practice-plus
        if (req.session) {
            req.session.flash = {
                type: 'success',
                message: 'Quiz complete!'
            };
        }

        res.redirect('/practice-plus');

    } catch (error) {
        console.error('Error submitting questionnaire answers:', error);
        if (req.session) {
            req.session.flash = { type: 'danger', message: 'Erro ao guardar as respostas.' };
        }
        res.redirect('/questionario_inicial');
    }
}

module.exports = {
    showQuestionario,
    submitQuestionario
};