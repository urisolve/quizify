-- SQL Script to insert questions related to each subtopic


INSERT INTO questions (
  id, subtopic_id, question_text, image, correct_answer,
  incorrect_answer1, incorrect_answer2, incorrect_answer3,
  incorrect_answer4, incorrect_answer5, incorrect_answer6,
  feedback, difficulty
) VALUES
-- Subtopic 1: Unidades SI
(1, 1, 'Qual das seguintes é uma unidade base do SI?', NULL, 'Metro', 'Newton', 'Joule', 'Litro', NULL, NULL, NULL, 'Lembra-te de consultar a lista oficial das unidades base do SI.', 1),
(2, 1, 'Quantas unidades base existem no SI?', NULL, '7', '6', '8', '10', NULL, NULL, NULL, 'Pensa nas grandezas físicas fundamentais reconhecidas internacionalmente.', 1),
(3, 1, 'O que significa SI?', NULL, 'Sistema Internacional', 'Sistema Integrado', 'Sistema Inovador', 'Sistema Indutivo', NULL, NULL, NULL, 'Este acrónimo é usado mundialmente para padronizar medições.', 1),

-- Subtopic 2: Múltiplos e submúltiplos
(4, 2, 'Qual o prefixo SI para deste algarismo?', 'img/query/scientific_notation.png', 'Mili', 'Micro', 'Nano', 'Centi', NULL, NULL, NULL, 'Relembra os prefixos mais comuns do SI para valores pequenos.', 1),
(5, 2, 'O prefixo "kilo" corresponde a que potência de 10?', NULL, '10^3', '10^6', '10^9', '10^2', NULL, NULL, NULL, 'Este prefixo é muito usado para múltiplos de mil.', 1),
(6, 2, 'Qual destes é um submúltiplo?', NULL, 'Micro', 'Mega', 'Giga', 'Tera', NULL, NULL, NULL, 'Procura o prefixo que representa uma fração muito pequena.', 1),

-- Subtopic 3: Algarismos significativos
(7, 3, 'Quantos algarismos significativos tem o número 0,00450?', NULL, '3', '2', '4', '5', NULL, NULL, NULL, 'Atenção aos zeros à esquerda e à direita do número.', 1),
(8, 3, 'O número 1200 tem quantos algarismos significativos?', NULL, '2', '3', '4', '1', NULL, NULL, NULL, 'Considera se há ou não ponto decimal para determinar os significativos.', 1),
(9, 3, 'Qual destes números tem 4 algarismos significativos?', NULL, '0,1234', '0,012', '12,3', '1,2', NULL, NULL, NULL, 'Conta todos os dígitos que transmitem informação sobre a precisão.', 1),

-- Subtopic 4: Carga elétrica
(10, 4, 'A carga elementar do eletrão é:', NULL, '-1,6x10^-19 C', '+1,6x10^-19 C', '0', '+1,6x10^-18 C', NULL, NULL, NULL, 'Lembra-te do sinal da carga do eletrão.', 1),
(11, 4, 'A unidade de carga elétrica no SI é:', NULL, 'Coulomb', 'Ampere', 'Volt', 'Ohm', NULL, NULL, NULL, 'Pensa na unidade que representa a quantidade de eletricidade.', 1),
(12, 4, 'O que é carga elétrica?', NULL, 'Propriedade fundamental da matéria', 'Energia armazenada', 'Corrente elétrica', 'Quantidade de protões', NULL, NULL, NULL, 'Reflete sobre o que distingue materiais eletricamente.', 1),

-- Subtopic 5: Tensão elétrica
(13, 5, 'A unidade de tensão elétrica no SI é:', NULL, 'Volt', 'Ampere', 'Ohm', 'Watt', NULL, NULL, NULL, 'Procura a unidade associada à diferença de potencial.', 1),
(14, 5, 'A tensão elétrica é definida como:', NULL, 'Diferença de potencial', 'Corrente elétrica', 'Resistência elétrica', 'Potência elétrica', NULL, NULL, NULL, 'Pensa no que faz os eletrões moverem-se num circuito.', 1),
(15, 5, 'O símbolo da tensão elétrica é:', NULL, 'V', 'A', 'Ω', 'W', NULL, NULL, NULL, 'Lembra-te do símbolo usado nos esquemas elétricos.', 1),

-- Subtopic 6: Corrente elétrica
(16, 6, 'A corrente elétrica é definida como:', NULL, 'Movimento ordenado de cargas elétricas', 'Movimento de protões', 'Diferença de potencial', 'Resistência à passagem de eletrões', NULL, NULL, NULL, 'Pensa no que realmente circula num fio condutor.', 1),
(17, 6, 'A unidade de corrente elétrica no SI é:', NULL, 'Ampere', 'Volt', 'Coulomb', 'Ohm', NULL, NULL, NULL, 'Procura a unidade que mede a intensidade do fluxo de carga.', 1),
(18, 6, 'O sentido convencional da corrente é:', NULL, 'Do polo positivo para o negativo', 'Do negativo para o positivo', 'Aleatório', 'Circular', NULL, NULL, NULL, 'Recorda o sentido adotado nos esquemas elétricos clássicos.', 1),

-- Subtopic 41: Método da resistência equivalente
(19, 41, 'Considere o circuito a cima, formado por três resistências: R₁ = 100 Ω, R₂ = 220 Ω e R₃ = 330 Ω, ligados a uma fonte de 12 V. Qual é a resistência equivalente do circuito?', 'img/query/c_series.png', '650 Ω', '100 Ω', '220 Ω', '330 Ω', '12 Ω', '550 Ω', '750 Ω', 'Reflita sobre como as resistências se combinam quando estão em série. Pense na regra geral para esse tipo de associação.', 2),
(20, 41, 'Considere o circuito a cima, formado por três resistências: R₁ = 100 Ω, R₂ = 220 Ω e R₃ = 330 Ω, ligados a uma fonte de 12 V. Qual é a resistência equivalente do circuito?',  'img/query/c_parallel.png', '54,7 Ω', '142 Ω', '220 Ω', '75 Ω', '330 Ω', '650 Ω', '110 Ω', 'Lembre-se que, em paralelo, a resistência equivalente é sempre menor que o menor resistor. Pense na regra de combinação para esse tipo de associação.', 2)
ON DUPLICATE KEY UPDATE
  subtopic_id = VALUES(subtopic_id),
  question_text = VALUES(question_text),
  image = VALUES(image),
  correct_answer = VALUES(correct_answer),
  incorrect_answer1 = VALUES(incorrect_answer1),
  incorrect_answer2 = VALUES(incorrect_answer2),
  incorrect_answer3 = VALUES(incorrect_answer3),
  incorrect_answer4 = VALUES(incorrect_answer4),
  incorrect_answer5 = VALUES(incorrect_answer5),
  incorrect_answer6 = VALUES(incorrect_answer6),
  feedback = VALUES(feedback),
  difficulty = VALUES(difficulty);