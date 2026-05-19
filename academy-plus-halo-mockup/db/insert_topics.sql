-- SQL Script to insert topics from Fundamentos de circuitos elétricos dataset

-- Insert Topics
INSERT INTO topics (id, topic_key, title, generation_mode, badge, locked, date_unlock, number_subtopics, number_questions, number_tries, number_corrects, time_spent) VALUES
(1, 'conceitos_teoricos', JSON_ARRAY('Conceitos Teóricos','Theoretical Concepts'), 'prompt_only', '{"name": "Theory Master", "svg": ""}', TRUE, NULL, 6, 0, 0, 0, 0),
(2, 'metodo_correntes_malhas', JSON_ARRAY('Método das Correntes nas Malhas','Loop Current Method'), 'prompt_only', '{"name": "MCM Master", "svg": ""}', TRUE, NULL, 4, 0, 0, 0, 0)
ON DUPLICATE KEY UPDATE
  topic_key = VALUES(topic_key),
  title = VALUES(title),
  generation_mode = VALUES(generation_mode),
  badge = VALUES(badge),
  locked = VALUES(locked),
  date_unlock = VALUES(date_unlock),
  number_subtopics = VALUES(number_subtopics),
  number_questions = VALUES(number_questions),
  number_tries = VALUES(number_tries),
  number_corrects = VALUES(number_corrects),
  time_spent = VALUES(time_spent);