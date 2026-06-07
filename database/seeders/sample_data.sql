USE training_management;

INSERT INTO ROLE(role_name, role_description)
VALUES
('ADMIN', 'System Administrator'),
('INSTRUCTOR', 'Instructor'),
('STUDENT', 'Student');

INSERT INTO ACCOUNT (role_id, username, password_hash, email)
  VALUES (3, 'student', '123456', 'student@gmail.com');
