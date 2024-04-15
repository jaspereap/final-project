-- CREATE DATABASE travlr;

-- Users
DROP TABLE IF EXISTS users;
CREATE TABLE users (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255),
    createdOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updatedOn TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);
-- End Users
-- Role
INSERT INTO role (id, name) VALUES (1, 'ADMIN');
INSERT INTO role (id, name) VALUES (2, 'USER');
-- End Role

-- Chat
DROP TABLE IF EXISTS chat;
CREATE TABLE chat (
    id BIGINT AUTO_INCREMENT PRIMARY KEY,
    message VARCHAR(255) NOT NULL,
    tripId VARCHAR(20) NOT NULL,
    sender_id BIGINT NOT NULL,
    FOREIGN KEY (sender_id) REFERENCES users(id)
);