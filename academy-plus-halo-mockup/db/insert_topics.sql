-- SQL Script to insert topics from Fundamentos de circuitos elétricos dataset

-- Insert Topics
INSERT INTO topics (id, title, description, badge, locked, date_unlock, number_subtopics, number_questions, number_tries, number_corrects, time_spent) VALUES
(1, 'MCM', 'Método das Correntes nas Malhas', '{"name": "MCM Master", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  badge = VALUES(badge),
  locked = VALUES(locked),
  date_unlock = VALUES(date_unlock),
  number_subtopics = VALUES(number_subtopics),
  number_questions = VALUES(number_questions),
  number_tries = VALUES(number_tries),
  number_corrects = VALUES(number_corrects),
  time_spent = VALUES(time_spent);