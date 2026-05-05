-- SQL Script to insert subtopics from Fundamentos de circuitos elétricos dataset

-- Insert Subtopics
INSERT INTO subtopics (id, topic_id, title, description, image, locked, unlock_progress, number_questions, number_tries, number_correct, time_spent, rag_prompt, rag_system, rag_messages, rag_reference_documents) VALUES

-- Topic 1: Método das Correntes nas Malhas
(1, 1, 'Interpretação de Circuito', 'Contar e Identificar os R ramos, N nós e C fontes de corrente do circuito', NULL, TRUE, 0, 3, 0, 0, 0,'
Generate ONE multiple-choice question grounded in the section "Informações Topológicas" of the attached pedagogical document.
The question must focus on counting and identifying R ramos, N nós, or C fontes de corrente of the circuit, drawing strictly from one of the subsections "Nós", "Ramos", or "Número de Equações".
Requirements:
- Ask about topology (counting or identifying), not about numeric KVL/KCL solving.
- The correct answer must be directly supported by the grounding document.
- Provide at least 3 plausible but incorrect distractors in Portuguese.
- Feedback must briefly explain why the correct answer is correct and cite the relevant subsection name (Nós, Ramos, or Número de Equações).
- Return the image path of the schematic.
- Difficulty: introductory.', NULL, NULL, NULL),
(2, 1, 'Escolha das Malhas', 'Selecionar e marcar Ma Malhas Auxiliares e Mp malhas principais', NULL, TRUE, 0, 3, 0, 0, 0,'
Generate ONE multiple-choice question grounded in the section "Escolha das Malhas" (or equivalent) of the attached pedagogical document.
The question must focus on selecting and marking Ma Malhas Auxiliares (auxiliary meshes) and Mp Malhas Principais (principal meshes) — for example: "which set of branches forms a valid principal mesh?", "how many auxiliary meshes are needed?", or "which mesh choice is incorrect for this circuit?".
Requirements:
- The correct answer must be directly supported by the grounding document.
- Provide at least 3 plausible but incorrect distractors in Portuguese.
- Feedback must briefly explain why the correct mesh choice is valid (or why the others are not), and cite the relevant document section.
- Return an image path of the selected meshes diagram (e.g., "mesh-exports/04-selected-combined/selected-meshes.png").
- Difficulty: introductory.', NULL, NULL, NULL),
(3, 1, 'Escrita de Equações', 'Construir as Mp equações de malha, com base na Lei das Malhas e considerando as correntes de malha que influenciam cada carga', NULL, TRUE, 0, 3, 0, 0, 0,'
Generate ONE multiple-choice question grounded in the section about mesh equations / Lei das Malhas in the attached pedagogical document.
The question must focus on building the M mesh equations using Kirchhoff\'s Voltage Law and reasoning about which mesh currents pass through each load (carga). For example: "which mesh equation correctly describes Mp1?", "what is the signed coefficient of Ia2 on the load R3?", or "which term is missing from the KVL equation for mesh Mp2?".
Requirements:
- The correct answer must be directly supported by the grounding document.
- Provide at least 3 plausible but incorrect distractors in Portuguese (commonly: wrong sign, missing current, wrong load).
- Feedback must briefly explain why the correct equation/term is right and cite the relevant document section.
- Return an image path of the selected resolution meshes under discussion (e.g., a specific mesh image or the combined meshes image).
- Difficulty: introductory to intermediate.', NULL, NULL, NULL),
(4, 1, 'Cálculo das Correntes', 'Calcular as correntes nos ramos', NULL, TRUE, 0, 3, 0, 0, 0,'
Generate ONE multiple-choice question grounded in the section about computing branch currents in the attached pedagogical document.
The question must focus on calculating the currents in the branches once the mesh currents are known — for example: "what is the current in branch 5?", "how does Ia1 combine with Ia2 to produce I3?", or "what is the sign convention for the branch current relative to the chosen mesh direction?".
Requirements:
- The correct answer must be directly supported by the grounding document.
- Provide at least 3 plausible but incorrect distractors in Portuguese (e.g. wrong sign, swapped currents, omitted term).
- Feedback must briefly explain the calculation step by step and cite the relevant document section.
- Return an image path of the branch currents figure (e.g., something under "current-exports/" or "branch-exports/").
- Difficulty: intermediate.', NULL, NULL, NULL)
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
  time_spent = VALUES(time_spent),
  rag_prompt = VALUES(rag_prompt),
  rag_system = VALUES(rag_system),
  rag_messages = VALUES(rag_messages),
  rag_reference_documents = VALUES(rag_reference_documents);