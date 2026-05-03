-- SQL Script to insert subtopics from Fundamentos de circuitos elétricos dataset

-- Insert Subtopics
INSERT INTO subtopics (id, topic_id, title, description, image, locked, unlock_progress, number_questions, number_tries, number_correct, time_spent) VALUES

-- Topic 1: Método das Correntes nas Malhas
(1, 1, 'Interpretação de Circuito', 'Contar e Identificar os R ramos, N nós e M malhas principais do circuito', NULL, TRUE, 0, 3, 0, 0, 0),
(2, 1, 'Escolha das Malhas', 'Selecionar e marcar C Malhas Auxiliares e M malhas principais', NULL, TRUE, 0, 3, 0, 0, 0),
(3, 1, 'Escrita de Equações', 'Construir as M equações de malha, com base na Lei das Malhas e considerando as correntes de malha que influenciam cada carga', NULL, TRUE, 0, 3, 0, 0, 0),
(4, 1, 'Cálculo das Correntes', 'Calcular as correntes nos ramos', NULL, TRUE, 0, 3, 0, 0, 0)
ON DUPLICATE KEY UPDATE
  topic_id = VALUES(topic_id),
  title = VALUES(title),
  description = VALUES(description),
  image = VALUES(image),
  locked = VALUES(locked),
  unlock_progress = VALUES(unlock_progress),
  number_questions = VALUES(number_questions),
  number_tries = VALUES(number_tries),
  number_correct = VALUES(number_correct),
  time_spent = VALUES(time_spent);