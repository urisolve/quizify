-- SQL Script to insert questions related to each subtopic
INSERT INTO questionario_inicial_questions (id, question_text, image, correct_answer, incorrect_answer, difficulty_rating) VALUES

(1, 'Exemplo Pergunta 1', NULL, 'Resposta Correta', JSON_ARRAY('Resposta Incorreta A', 'Resposta Incorreta B', 'Resposta Incorreta C'),  100),
(2, 'Exemplo Pergunta 2', NULL, 'Resposta Correta', JSON_ARRAY('Resposta Incorreta A', 'Resposta Incorreta B', 'Resposta Incorreta C'),  100),
(3, 'Exemplo Pergunta 3', NULL, 'Resposta Correta', JSON_ARRAY('Resposta Incorreta A', 'Resposta Incorreta B', 'Resposta Incorreta C'),  100),
(4, 'Exemplo Pergunta 4', NULL, 'Resposta Correta', JSON_ARRAY('Resposta Incorreta A', 'Resposta Incorreta B', 'Resposta Incorreta C'),  100),
(5, 'Exemplo Pergunta 5', NULL, 'Resposta Correta', JSON_ARRAY('Resposta Incorreta A', 'Resposta Incorreta B', 'Resposta Incorreta C'),  100),
(6, 'Exemplo Pergunta 6', NULL, 'Resposta Correta', JSON_ARRAY('Resposta Incorreta A', 'Resposta Incorreta B', 'Resposta Incorreta C'),  100)

ON DUPLICATE KEY UPDATE
  question_text = VALUES(question_text),
  image = VALUES(image),
  correct_answer = VALUES(correct_answer),
  incorrect_answer = VALUES(incorrect_answer),
  difficulty_rating = VALUES(difficulty_rating);