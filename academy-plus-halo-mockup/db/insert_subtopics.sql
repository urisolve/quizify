-- SQL Script to insert subtopics from Fundamentos de circuitos elétricos dataset

-- Insert Subtopics
INSERT INTO subtopics (id, topic_id, title, description, image, locked, unlock_progress, number_questions, number_tries, number_correct, time_spent) VALUES

-- Topic 1: Sistemas de Unidades
(1, 1, 'Unidades SI', 'Sistema Internacional de Unidades e suas 7 unidades elementais', 'img/practice-plus/SI.png', TRUE, 0, 3, 0, 0, 0),
(2, 1, 'Múltiplos e submúltiplos', 'Prefixos padronizados do SI para diferentes escalas de medição', 'img/practice-plus/multiples.png', TRUE, 0, 3, 0, 0, 0),
(3, 1, 'Algarismos significativos', 'Conceitos sobre precisão e significado dos dígitos em medições', 'img/practice-plus/significant_digits.png', TRUE, 0, 3, 0, 0, 0),

-- Topic 2: Terminologia de Circuitos Elétricos
(4, 2, 'Carga elétrica', 'Origem dos fenómenos elétricos e tipos de cargas', NULL, TRUE, 0, 3, 0, 0, 0),
(5, 2, 'Tensão elétrica', 'Diferença de potencial e energia elétrica transferida', NULL, TRUE, 0, 3, 0, 0, 0),
(6, 2, 'Corrente elétrica', 'Movimento ordenado de cargas elétricas e intensidade da corrente', NULL, TRUE, 0, 3, 0, 0, 0),
(7, 2, 'Resistência elétrica e resistividade', 'Oposição à passagem da corrente e propriedades dos materiais', NULL, TRUE, 0, 3, 0, 0, 0),
(8, 2, 'Tipos de materiais condutores', 'Classificação dos materiais elétricos por condutividade', NULL, TRUE, 0, 3, 0, 0, 0),
(9, 2, 'Potência elétrica', 'Energia elétrica transferida por unidade de tempo', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 3: Componentes e Interligação de Circuitos Elétricos
(10, 3, 'Resistências', 'Componentes resistivos e código de cores', NULL, TRUE, 0, 3, 0, 0, 0),
(11, 3, 'Bobinas (indutâncias)', 'Componentes indutivos e armazenamento de energia magnética', NULL, TRUE, 0, 3, 0, 0, 0),
(12, 3, 'Condensadores (capacitâncias)', 'Componentes capacitivos e armazenamento de energia elétrica', NULL, TRUE, 0, 3, 0, 0, 0),
(13, 3, 'Fontes de alimentação em corrente contínua', 'Fontes de tensão e corrente contínua', NULL, TRUE, 0, 3, 0, 0, 0),
(14, 3, 'Baterias', 'Dispositivos de armazenamento de energia química', NULL, TRUE, 0, 3, 0, 0, 0),
(15, 3, 'Breadboard', 'Placas de montagem para prototipagem de circuitos', NULL, TRUE, 0, 3, 0, 0, 0),
(16, 3, 'Acessórios de ligação', 'Cabos e conectores para interligação de componentes', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 4: Equipamentos de Teste e Medição
(17, 4, 'Classificação dos instrumentos de medição', 'Tipos e características dos instrumentos de medição', NULL, TRUE, 0, 3, 0, 0, 0),
(18, 4, 'Simbologia dos Instrumentos de medição', 'Símbolos utilizados para representar instrumentos', NULL, TRUE, 0, 3, 0, 0, 0),
(19, 4, 'Método de medição por comparação - Ponte de Wheatstone', 'Método de medição por equilíbrio e ponte de Wheatstone', NULL, TRUE, 0, 3, 0, 0, 0),
(20, 4, 'Ohmímetro', 'Instrumento para medição direta de resistência', NULL, TRUE, 0, 3, 0, 0, 0),
(21, 4, 'Voltímetro', 'Instrumento para medição de tensão elétrica', NULL, TRUE, 0, 3, 0, 0, 0),
(22, 4, 'Amperímetro', 'Instrumento para medição de corrente elétrica', NULL, TRUE, 0, 3, 0, 0, 0),
(23, 4, 'Efeito de carga de voltímetros e amperímetros', 'Influência dos instrumentos nos circuitos medidos', NULL, TRUE, 0, 3, 0, 0, 0),
(24, 4, 'Wattímetro', 'Instrumento para medição de potência elétrica', NULL, TRUE, 0, 3, 0, 0, 0),
(25, 4, 'Multímetro', 'Instrumento multifuncional para medições elétricas', NULL, TRUE, 0, 3, 0, 0, 0),
(26, 4, 'Incertezas de medição', 'Conceitos sobre precisão e erro em medições', NULL, TRUE, 0, 3, 0, 0, 0),
(27, 4, 'Gerador de sinais', 'Equipamentos para geração de sinais elétricos', NULL, TRUE, 0, 3, 0, 0, 0),
(28, 4, 'Osciloscópio', 'Instrumento para visualização de sinais no tempo', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 5: Conceitos Fundamentais de Circuitos Elétricos
(29, 5, 'Circuito elétrico', 'Definição e componentes básicos de um circuito', NULL, TRUE, 0, 3, 0, 0, 0),
(30, 5, 'Ramos', 'Segmentos de circuito entre dois nós', NULL, TRUE, 0, 3, 0, 0, 0),
(31, 5, 'Malhas', 'Caminhos fechados em circuitos elétricos', NULL, TRUE, 0, 3, 0, 0, 0),
(32, 5, 'Nós', 'Pontos de conexão entre componentes', NULL, TRUE, 0, 3, 0, 0, 0),
(33, 5, 'Associação de componentes', 'Conexões em série e paralelo de componentes', NULL, TRUE, 0, 3, 0, 0, 0),
(34, 5, 'Associações triângulo-estrela e estrela-triângulo', 'Transformações entre configurações de componentes', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 6: Leis Fundamentais dos Circuitos Elétricos
(35, 6, 'Lei de Ohm', 'Relação fundamental entre tensão, corrente e resistência', 'img/practice-plus/ohms_law.svg', TRUE, 0, 3, 0, 0, 0),
(36, 6, 'Lei de Kirchhoff dos nós', 'Conservação da corrente elétrica nos nós', NULL, TRUE, 0, 3, 0, 0, 0),
(37, 6, 'Lei de Kirchhoff das malhas', 'Conservação da tensão nas malhas fechadas', NULL, TRUE, 0, 3, 0, 0, 0),
(38, 6, 'Teorema de Tellegen', 'Conservação da potência em circuitos elétricos', NULL, TRUE, 0, 3, 0, 0, 0),
(39, 6, 'Divisores de tensão', 'Distribuição proporcional de tensão em resistências', NULL, TRUE, 0, 3, 0, 0, 0),
(40, 6, 'Divisores de corrente', 'Distribuição proporcional de corrente em resistências', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 7: Métodos de Análise de Circuitos Elétricos
(41, 7, 'Método da resistência equivalente', 'Simplificação de circuitos através de resistências equivalentes', 'img/practice-plus/equivelant_rez_method.png', TRUE, 0, 3, 0, 0, 0),
(42, 7, 'Teorema da sobreposição', 'Análise de circuitos com múltiplas fontes', NULL, TRUE, 0, 3, 0, 0, 0),
(43, 7, 'Método da corrente nos ramos', 'Análise baseada nas correntes dos ramos', NULL, TRUE, 0, 3, 0, 0, 0),
(44, 7, 'Método da corrente nas malhas', 'Análise baseada em correntes fictícias nas malhas', NULL, TRUE, 0, 3, 0, 0, 0),
(45, 7, 'Método das tensões nodais', 'Análise baseada nas tensões dos nós', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 8: Teoremas de Simplificação de Circuitos Elétricos
(46, 8, 'Teorema de Thévenin', 'Equivalente de circuito com fonte de tensão', NULL, TRUE, 0, 3, 0, 0, 0),
(47, 8, 'Teorema de Norton', 'Equivalente de circuito com fonte de corrente', NULL, TRUE, 0, 3, 0, 0, 0),
(48, 8, 'Teorema da máxima transferência de potência', 'Condições para máxima transferência de potência', NULL, TRUE, 0, 3, 0, 0, 0),
(49, 8, 'Teorema de Millman', 'Análise de circuitos com fontes em paralelo', NULL, TRUE, 0, 3, 0, 0, 0),
(50, 8, 'Teorema da Substituição', 'Substituição de ramos por fontes equivalentes', NULL, TRUE, 0, 3, 0, 0, 0),
(51, 8, 'Teorema da Reciprocidade', 'Propriedade de reciprocidade em circuitos lineares', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 9: Conceitos Fundamentais de Grandezas Alternadas Sinusoidais
(52, 9, 'Corrente alternada sinusoidal', 'Características e propriedades da corrente alternada', NULL, TRUE, 0, 3, 0, 0, 0),
(53, 9, 'Valor médio', 'Cálculo e significado do valor médio em sinais alternados', NULL, TRUE, 0, 3, 0, 0, 0),
(54, 9, 'Valor eficaz', 'Valor RMS e sua importância prática', NULL, TRUE, 0, 3, 0, 0, 0),
(55, 9, 'Números complexos', 'Matemática dos números complexos aplicada a circuitos', NULL, TRUE, 0, 3, 0, 0, 0),
(56, 9, 'Transformada de Steinmetz', 'Transformação para análise fasorial', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 10: Circuitos de Corrente Alternada Monofásica
(57, 10, 'Leis e métodos dos circuitos em corrente alternada', 'Aplicação das leis fundamentais em CA', NULL, TRUE, 0, 3, 0, 0, 0),
(58, 10, 'Componentes em corrente alternada', 'Comportamento de R, L e C em corrente alternada', NULL, TRUE, 0, 3, 0, 0, 0),
(59, 10, 'Regime de magnetização e desmagnetização de uma bobina', 'Transitórios em circuitos indutivos', NULL, TRUE, 0, 3, 0, 0, 0),
(60, 10, 'Regime de carga e descarga de um condensador', 'Transitórios em circuitos capacitivos', NULL, TRUE, 0, 3, 0, 0, 0),
(61, 10, 'Circuitos RLC série', 'Análise de circuitos com R, L e C em série', NULL, TRUE, 0, 3, 0, 0, 0),
(62, 10, 'Circuitos RLC paralelo', 'Análise de circuitos com R, L e C em paralelo', NULL, TRUE, 0, 3, 0, 0, 0),
(63, 10, 'Predominância indutiva e capacitiva', 'Análise do caráter reativo dos circuitos', NULL, TRUE, 0, 3, 0, 0, 0),
(64, 10, 'Ressonância', 'Fenômeno de ressonância em circuitos RLC', NULL, TRUE, 0, 3, 0, 0, 0),
(65, 10, 'Filtros passivos de primeira ordem', 'Filtros passa-baixo e passa-alto básicos', NULL, TRUE, 0, 3, 0, 0, 0),
(66, 10, 'Potência em corrente alternada', 'Conceitos de potência ativa, reativa e aparente', NULL, TRUE, 0, 3, 0, 0, 0),

-- Topic 11: Circuitos de Corrente Alternada Trifásica
(67, 11, 'Sistemas trifásicos', 'Fundamentos dos sistemas de três fases', NULL, TRUE, 0, 3, 0, 0, 0),
(68, 11, 'Ligações estrela e triângulo em trifásico', 'Configurações de ligação em sistemas trifásicos', NULL, TRUE, 0, 3, 0, 0, 0),
(69, 11, 'Potência em circuitos trifásicos', 'Cálculo de potência em sistemas trifásicos', NULL, TRUE, 0, 3, 0, 0, 0)
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