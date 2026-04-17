INSERT INTO rag_documents (id, type_document, input_details, invalidations) VALUES

-- Subtopic 1: Unidades SI
(1, 'PMB', JSON_ARRAY('Isto vão ser documentos'), 0)

ON DUPLICATE KEY UPDATE
  type_document = VALUES(type_document),
  input_details = VALUES(input_details),
  invalidations = VALUES(invalidations);
