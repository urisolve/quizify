-- SQL Script to insert admin user
INSERT INTO users (id, username, avatar_url, email, password_hash, role) VALUES
(1, 'admin', '/img/logos/chatbot_icon.png', 'admin@halo.pt', '$2b$10$DsYnQpW9Fc4yzPJA9eucxeEarnXaRdsRS/205dM9v30TVZTwV30ee', 'admin')

ON DUPLICATE KEY UPDATE
  username = VALUES(username),
  avatar_url = VALUES(avatar_url),
  email = VALUES(email),
  password_hash = VALUES(password_hash),
  role = VALUES(role);