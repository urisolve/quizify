-- SQL Script to insert questions related to each subtopic
INSERT INTO questions (
  id, subtopic_id, rag_document_id, question_type, question_text, image, correct_answer, 
  incorrect_answer, feedback, difficulty, number_tries, number_corrects, 
  rating_sum_teacher, rating_count_teacher, rating_sum_student, rating_count_student
) VALUES

-- Subtopic 1: Unidades SI
( 1, 1, 1, 'EM', JSON_ARRAY('Qual das seguintes é uma unidade base do SI?','Qual das seguintes é uma unidade base do SI?'), NULL, JSON_ARRAY('Metro','Metro'), JSON_ARRAY(JSON_ARRAY('Newton', 'Joule', 'Litro'), JSON_ARRAY('Newton', 'Joule', 'Litro')), JSON_ARRAY('Lembra-te de consultar a lista oficial das unidades base do SI.','Lembra-te de consultar a lista oficial das unidades base do SI.'), 1, 0, 0, 0, 0, 0, 0),
( 2, 1, 1, 'EM', JSON_ARRAY('Quantas unidades base existem no SI?','Quantas unidades base existem no SI?'), NULL, JSON_ARRAY('7','7'), JSON_ARRAY(JSON_ARRAY('6', '8', '10'), JSON_ARRAY('6', '8', '10')), JSON_ARRAY('Pensa nas grandezas físicas fundamentais reconhecidas internacionalmente.','Pensa nas grandezas físicas fundamentais reconhecidas internacionalmente.'), 1, 0, 0, 0, 0, 0, 0),
( 3, 1, 1, 'EM', JSON_ARRAY('O que significa SI?','O que significa SI?'), NULL, JSON_ARRAY('Sistema Internacional','Sistema Internacional'), JSON_ARRAY(JSON_ARRAY('Sistema Integrado', 'Sistema Inovador', 'Sistema Indutivo'), JSON_ARRAY('Sistema Integrado', 'Sistema Inovador', 'Sistema Indutivo')), JSON_ARRAY('Este acrónimo é usado mundialmente para padronizar medições.','Este acrónimo é usado mundialmente para padronizar medições.'), 1, 0, 0, 0, 0, 0, 0)

ON DUPLICATE KEY UPDATE
  subtopic_id = VALUES(subtopic_id),
  rag_document_id = VALUES(rag_document_id),
  question_type = VALUES(question_type),
  question_text = VALUES(question_text),
  image = VALUES(image),
  correct_answer = VALUES(correct_answer),
  incorrect_answer = VALUES(incorrect_answer),
  feedback = VALUES(feedback),
  difficulty = VALUES(difficulty),
  number_tries = VALUES(number_tries),
  number_corrects = VALUES(number_corrects),
  rating_sum_teacher = VALUES(rating_sum_teacher),
  rating_count_teacher = VALUES(rating_count_teacher),
  rating_sum_student = VALUES(rating_sum_student),
  rating_count_student = VALUES(rating_count_student);