-- SQL Script to insert subtopics from Fundamentos de circuitos elétricos dataset

-- Insert Subtopics
INSERT INTO subtopics (id, topic_id, subtopic_key, title, description, image, locked, unlock_progress, number_questions, number_tries, number_corrects, time_spent) VALUES
-- Topic 1
(1, 1, 'terminologia_circuitos_eletricos', JSON_ARRAY('Terminologia de Circuitos Elétricos','Electrical Circuit Terminology'), JSON_ARRAY('',''), image, TRUE, 0, 0, 0, 0, 0),
(2, 1, 'lei_kirchhoff_malhas', JSON_ARRAY('Lei de Kirchhoff das Malhas','Kirchhoffs Loop Law'), JSON_ARRAY('',''), image, TRUE, 0, 0, 0, 0, 0),
(3, 1, 'passos_metodo', JSON_ARRAY('Interpretação sequencial dos passos do método','Sequential interpretation of the method steps'), JSON_ARRAY('',''), image, TRUE, 0, 0, 0, 0, 0),
(4, 1, 'fontes_corrente', JSON_ARRAY('Tratamento de fontes de corrente','Treatment of current sources'), JSON_ARRAY('',''), image, TRUE, 0, 0, 0, 0, 0),
(5, 1, 'corrente_malha_ramo', JSON_ARRAY('Relação entre corrente de malha e corrente nos ramos','Relationship between mesh current and branch current'), JSON_ARRAY('',''), image, TRUE, 0, 0, 0, 0, 0),
(6, 1, 'sentidos_correntes', JSON_ARRAY('Interpretação de sentidos de correntes','Interpretation of current directions'), JSON_ARRAY('',''), image, TRUE, 0, 0, 0, 0, 0),
-- Topic 2
(7, 2, 'interpretacao_circuito', JSON_ARRAY('Interpretação de Circuito','Circuit Interpretation'), JSON_ARRAY('Contar e Identificar os R ramos, N nós e C fontes de corrente do circuito','Counting and Identifying the R branches, N nodes, and M main loops of the circuit'), NULL, TRUE, 0, 0, 0, 0, 0),
(8, 2, 'escolha_das_malhas', JSON_ARRAY('Escolha das Malhas','Loop Selection'), JSON_ARRAY('Selecionar e marcar Ma Malhas Auxiliares e Mp malhas principais','Selecting and marking C Auxiliary Loops and M main loops'), NULL, TRUE, 0, 0, 0, 0, 0),
(9, 2, 'escrita_de_equacoes', JSON_ARRAY('Escrita de Equações','Equation Writing'), JSON_ARRAY('Construir as Mp equações de malha, com base na Lei das Malhas e considerando as correntes de malha que influenciam cada carga','Constructing the M loop equations, based on Loop Law and considering the loop currents that influence each load'), NULL, TRUE, 0, 0, 0, 0, 0),
(10, 2, 'calculo_das_correntes', JSON_ARRAY('Cálculo das Correntes','Current Calculation'), JSON_ARRAY('Calcular as correntes nos ramos','Calculating the currents in the branches'), NULL, TRUE, 0, 0, 0, 0, 0)

ON DUPLICATE KEY UPDATE
  topic_id = VALUES(topic_id),
  subtopic_key = VALUES(subtopic_key),
  title = VALUES(title),
  description = VALUES(description),
  image = VALUES(image),
  locked = VALUES(locked),
  unlock_progress = VALUES(unlock_progress),
  number_questions = VALUES(number_questions),
  number_tries = VALUES(number_tries),
  number_corrects = VALUES(number_corrects),
  time_spent = VALUES(time_spent);