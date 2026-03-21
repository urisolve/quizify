-- SQL Script to insert topics from Fundamentos de circuitos elétricos dataset

-- Insert Topics
INSERT INTO topics (id, name, description, badge) VALUES
(1, 'Sistemas de Unidades', 'Conceitos fundamentais sobre sistemas de unidades de medição', '{"name": "Units Master", "svg": ""}'),
(2, 'Terminologia de Circuitos Elétricos', 'Conceitos básicos e terminologia fundamental dos circuitos elétricos', '{"name": "Circuit Expert", "svg": ""}'),
(3, 'Componentes e Interligação de Circuitos Elétricos', 'Componentes básicos e métodos de conexão em circuitos elétricos', '{"name": "Component Specialist", "svg": ""}'),
(4, 'Equipamentos de Teste e Medição', 'Instrumentos e métodos para medição de grandezas elétricas', '{"name": "Measurement Pro", "svg": ""}'),
(5, 'Conceitos Fundamentais de Circuitos Elétricos', 'Elementos estruturais e conceitos básicos de circuitos', '{"name": "Circuit Fundamentals", "svg": ""}'),
(6, 'Leis Fundamentais dos Circuitos Elétricos', 'Leis básicas que governam o comportamento dos circuitos', '{"name": "Law Master", "svg": ""}'),
(7, 'Métodos de Análise de Circuitos Elétricos', 'Técnicas para análise e solução de circuitos complexos', '{"name": "Analysis Expert", "svg": ""}'),
(8, 'Teoremas de Simplificação de Circuitos Elétricos', 'Teoremas para simplificar a análise de circuitos complexos', '{"name": "Theorem Specialist", "svg": ""}'),
(9, 'Conceitos Fundamentais de Grandezas Alternadas Sinusoidais', 'Fundamentos matemáticos e conceituais de corrente alternada', '{"name": "AC Fundamentals", "svg": ""}'),
(10, 'Circuitos de Corrente Alternada Monofásica', 'Análise detalhada de circuitos em corrente alternada', '{"name": "AC Circuit Master", "svg": ""}'),
(11, 'Circuitos de Corrente Alternada Trifásica', 'Sistemas trifásicos e suas aplicações', '{"name": "Three-Phase Expert", "svg": ""}')
ON DUPLICATE KEY UPDATE
  name = VALUES(name),
  description = VALUES(description),
  badge = VALUES(badge);
