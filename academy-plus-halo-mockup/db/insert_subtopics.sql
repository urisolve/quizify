-- SQL Script to insert subtopics from Fundamentos de circuitos elétricos dataset

-- Insert Subtopics
INSERT INTO subtopics (id, topic_id, title, content, num_questions, weight, image) VALUES
-- Topic 1: Sistemas de Unidades
(1, 1, 'Unidades SI', 'Sistema Internacional de Unidades e suas 7 unidades elementais', 3, 1.0, 'img/practice-plus/SI.png'),
(2, 1, 'Múltiplos e submúltiplos', 'Prefixos padronizados do SI para diferentes escalas de medição', 3, 1.0, 'img/practice-plus/multiples.png'),
(3, 1, 'Algarismos significativos', 'Conceitos sobre precisão e significado dos dígitos em medições', 4, 1.0, 'img/practice-plus/significant_digits.png'),

-- Topic 2: Terminologia de Circuitos Elétricos
(4, 2, 'Carga elétrica', 'Origem dos fenómenos elétricos e tipos de cargas', 3, 1.0, NULL),
(5, 2, 'Tensão elétrica', 'Diferença de potencial e energia elétrica transferida', 5, 1.2, NULL),
(6, 2, 'Corrente elétrica', 'Movimento ordenado de cargas elétricas e intensidade da corrente', 5, 1.2, NULL),
(7, 2, 'Resistência elétrica e resistividade', 'Oposição à passagem da corrente e propriedades dos materiais', 6, 1.3, NULL),
(8, 2, 'Tipos de materiais condutores', 'Classificação dos materiais elétricos por condutividade', 4, 1.0, NULL),
(9, 2, 'Potência elétrica', 'Energia elétrica transferida por unidade de tempo', 5, 1.2, NULL),

-- Topic 3: Componentes e Interligação de Circuitos Elétricos
(10, 3, 'Resistências', 'Componentes resistivos e código de cores', 6, 1.3, NULL),
(11, 3, 'Bobinas (indutâncias)', 'Componentes indutivos e armazenamento de energia magnética', 6, 1.4, NULL),
(12, 3, 'Condensadores (capacitâncias)', 'Componentes capacitivos e armazenamento de energia elétrica', 6, 1.4, NULL),
(13, 3, 'Fontes de alimentação em corrente contínua', 'Fontes de tensão e corrente contínua', 5, 1.2, NULL),
(14, 3, 'Baterias', 'Dispositivos de armazenamento de energia química', 3, 1.0, NULL),
(15, 3, 'Breadboard', 'Placas de montagem para prototipagem de circuitos', 3, 0.8, NULL),
(16, 3, 'Acessórios de ligação', 'Cabos e conectores para interligação de componentes', 3, 0.8, NULL),

-- Topic 4: Equipamentos de Teste e Medição
(17, 4, 'Classificação dos instrumentos de medição', 'Tipos e características dos instrumentos de medição', 4, 1.0, NULL),
(18, 4, 'Simbologia dos Instrumentos de medição', 'Símbolos utilizados para representar instrumentos', 3, 0.8, NULL),
(19, 4, 'Método de medição por comparação - Ponte de Wheatstone', 'Método de medição por equilíbrio e ponte de Wheatstone', 5, 1.3, NULL),
(20, 4, 'Ohmímetro', 'Instrumento para medição direta de resistência', 4, 1.0, NULL),
(21, 4, 'Voltímetro', 'Instrumento para medição de tensão elétrica', 5, 1.2, NULL),
(22, 4, 'Amperímetro', 'Instrumento para medição de corrente elétrica', 5, 1.2, NULL),
(23, 4, 'Efeito de carga de voltímetros e amperímetros', 'Influência dos instrumentos nos circuitos medidos', 4, 1.1, NULL),
(24, 4, 'Wattímetro', 'Instrumento para medição de potência elétrica', 4, 1.0, NULL),
(25, 4, 'Multímetro', 'Instrumento multifuncional para medições elétricas', 4, 1.0, NULL),
(26, 4, 'Incertezas de medição', 'Conceitos sobre precisão e erro em medições', 4, 1.1, NULL),
(27, 4, 'Gerador de sinais', 'Equipamentos para geração de sinais elétricos', 3, 0.9, NULL),
(28, 4, 'Osciloscópio', 'Instrumento para visualização de sinais no tempo', 5, 1.2, NULL),

-- Topic 5: Conceitos Fundamentais de Circuitos Elétricos
(29, 5, 'Circuito elétrico', 'Definição e componentes básicos de um circuito', 4, 1.0, NULL),
(30, 5, 'Ramos', 'Segmentos de circuito entre dois nós', 3, 0.9, NULL),
(31, 5, 'Malhas', 'Caminhos fechados em circuitos elétricos', 4, 1.0, NULL),
(32, 5, 'Nós', 'Pontos de conexão entre componentes', 3, 0.9, NULL),
(33, 5, 'Associação de componentes', 'Conexões em série e paralelo de componentes', 6, 1.4, NULL),
(34, 5, 'Associações triângulo-estrela e estrela-triângulo', 'Transformações entre configurações de componentes', 5, 1.3, NULL),

-- Topic 6: Leis Fundamentais dos Circuitos Elétricos
(35, 6, 'Lei de Ohm', 'Relação fundamental entre tensão, corrente e resistência', 6, 1.5, 'img/practice-plus/ohms_law.svg'),
(36, 6, 'Lei de Kirchhoff dos nós', 'Conservação da corrente elétrica nos nós', 5, 1.3, NULL),
(37, 6, 'Lei de Kirchhoff das malhas', 'Conservação da tensão nas malhas fechadas', 5, 1.3, NULL),
(38, 6, 'Teorema de Tellegen', 'Conservação da potência em circuitos elétricos', 4, 1.1, NULL),
(39, 6, 'Divisores de tensão', 'Distribuição proporcional de tensão em resistências', 5, 1.2, NULL),
(40, 6, 'Divisores de corrente', 'Distribuição proporcional de corrente em resistências', 5, 1.2, NULL),

-- Topic 7: Métodos de Análise de Circuitos Elétricos
(41, 7, 'Método da resistência equivalente', 'Simplificação de circuitos através de resistências equivalentes', 2, 1.4,'img/practice-plus/equivelant_rez_method.png'),
(42, 7, 'Teorema da sobreposição', 'Análise de circuitos com múltiplas fontes', 5, 1.3, NULL),
(43, 7, 'Método da corrente nos ramos', 'Análise baseada nas correntes dos ramos', 6, 1.4, NULL),
(44, 7, 'Método da corrente nas malhas', 'Análise baseada em correntes fictícias nas malhas', 6, 1.4, NULL),
(45, 7, 'Método das tensões nodais', 'Análise baseada nas tensões dos nós', 6, 1.4, NULL),

-- Topic 8: Teoremas de Simplificação de Circuitos Elétricos
(46, 8, 'Teorema de Thévenin', 'Equivalente de circuito com fonte de tensão', 6, 1.5, NULL),
(47, 8, 'Teorema de Norton', 'Equivalente de circuito com fonte de corrente', 6, 1.5, NULL),
(48, 8, 'Teorema da máxima transferência de potência', 'Condições para máxima transferência de potência', 5, 1.3, NULL),
(49, 8, 'Teorema de Millman', 'Análise de circuitos com fontes em paralelo', 4, 1.2, NULL),
(50, 8, 'Teorema da Substituição', 'Substituição de ramos por fontes equivalentes', 4, 1.1, NULL),
(51, 8, 'Teorema da Reciprocidade', 'Propriedade de reciprocidade em circuitos lineares', 4, 1.1, NULL),

-- Topic 9: Conceitos Fundamentais de Grandezas Alternadas Sinusoidais
(52, 9, 'Corrente alternada sinusoidal', 'Características e propriedades da corrente alternada', 5, 1.2, NULL),
(53, 9, 'Valor médio', 'Cálculo e significado do valor médio em sinais alternados', 4, 1.1, NULL),
(54, 9, 'Valor eficaz', 'Valor RMS e sua importância prática', 5, 1.2, NULL),
(55, 9, 'Números complexos', 'Matemática dos números complexos aplicada a circuitos', 6, 1.4, NULL),
(56, 9, 'Transformada de Steinmetz', 'Transformação para análise fasorial', 5, 1.3, NULL),

-- Topic 10: Circuitos de Corrente Alternada Monofásica
(57, 10, 'Leis e métodos dos circuitos em corrente alternada', 'Aplicação das leis fundamentais em CA', 5, 1.2, NULL),
(58, 10, 'Componentes em corrente alternada', 'Comportamento de R, L e C em corrente alternada', 6, 1.4, NULL),
(59, 10, 'Regime de magnetização e desmagnetização de uma bobina', 'Transitórios em circuitos indutivos', 5, 1.3, NULL),
(60, 10, 'Regime de carga e descarga de um condensador', 'Transitórios em circuitos capacitivos', 5, 1.3, NULL),
(61, 10, 'Circuitos RLC série', 'Análise de circuitos com R, L e C em série', 6, 1.5, NULL),
(62, 10, 'Circuitos RLC paralelo', 'Análise de circuitos com R, L e C em paralelo', 6, 1.5, NULL),
(63, 10, 'Predominância indutiva e capacitiva', 'Análise do caráter reativo dos circuitos', 5, 1.3, NULL),
(64, 10, 'Ressonância', 'Fenômeno de ressonância em circuitos RLC', 6, 1.5, NULL),
(65, 10, 'Filtros passivos de primeira ordem', 'Filtros passa-baixo e passa-alto básicos', 5, 1.3, NULL),
(66, 10, 'Potência em corrente alternada', 'Conceitos de potência ativa, reativa e aparente', 6, 1.4, NULL),

-- Topic 11: Circuitos de Corrente Alternada Trifásica
(67, 11, 'Sistemas trifásicos', 'Fundamentos dos sistemas de três fases', 5, 1.3, NULL),
(68, 11, 'Ligações estrela e triângulo em trifásico', 'Configurações de ligação em sistemas trifásicos', 6, 1.4, NULL),
(69, 11, 'Potência em circuitos trifásicos', 'Cálculo de potência em sistemas trifásicos', 6, 1.5, NULL)
ON DUPLICATE KEY UPDATE
  topic_id = VALUES(topic_id),
  title = VALUES(title),
  content = VALUES(content),
  num_questions = VALUES(num_questions),
  weight = VALUES(weight),
  image = VALUES(image);
