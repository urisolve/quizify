-- SQL Script to insert topics from Fundamentos de circuitos elétricos dataset

-- Insert Topics
INSERT INTO topics (id, title, description, badge, locked, date_unlock, number_subtopics, number_questions, number_tries, number_correct, time_spent) VALUES
(1, 'Sistemas de Unidades', 'Conceitos fundamentais sobre sistemas de unidades de medição', '{"name": "Units Master", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(2, 'Terminologia de Circuitos Elétricos', 'Conceitos básicos e terminologia fundamental dos circuitos elétricos', '{"name": "Circuit Expert", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(3, 'Componentes e Interligação de Circuitos Elétricos', 'Componentes básicos e métodos de conexão em circuitos elétricos', '{"name": "Component Specialist", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(4, 'Equipamentos de Teste e Medição', 'Instrumentos e métodos para medição de grandezas elétricas', '{"name": "Measurement Pro", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(5, 'Conceitos Fundamentais de Circuitos Elétricos', 'Elementos estruturais e conceitos básicos de circuitos', '{"name": "Circuit Fundamentals", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(6, 'Leis Fundamentais dos Circuitos Elétricos', 'Leis básicas que governam o comportamento dos circuitos', '{"name": "Law Master", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(7, 'Métodos de Análise de Circuitos Elétricos', 'Técnicas para análise e solução de circuitos complexos', '{"name": "Analysis Expert", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(8, 'Teoremas de Simplificação de Circuitos Elétricos', 'Teoremas para simplificar a análise de circuitos complexos', '{"name": "Theorem Specialist", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(9, 'Conceitos Fundamentais de Grandezas Alternadas Sinusoidais', 'Fundamentos matemáticos e conceituais de corrente alternada', '{"name": "AC Fundamentals", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(10, 'Circuitos de Corrente Alternada Monofásica', 'Análise detalhada de circuitos em corrente alternada', '{"name": "AC Circuit Master", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0),
(11, 'Circuitos de Corrente Alternada Trifásica', 'Sistemas trifásicos e suas aplicações', '{"name": "Three-Phase Expert", "svg": ""}', TRUE, NULL, 0, 0, 0, 0, 0)
ON DUPLICATE KEY UPDATE
  title = VALUES(title),
  description = VALUES(description),
  badge = VALUES(badge),
  locked = VALUES(locked),
  date_unlock = VALUES(date_unlock),
  number_subtopics = VALUES(number_subtopics),
  number_questions = VALUES(number_questions),
  number_tries = VALUES(number_tries),
  number_correct = VALUES(number_correct),
  time_spent = VALUES(time_spent);