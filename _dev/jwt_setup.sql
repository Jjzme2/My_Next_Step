-- SQL script to set up and create users with JWT

-- Create users table
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create JWT tokens table
CREATE TABLE jwt_tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id),
    token VARCHAR(500) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL
);

-- Function to create a new user
CREATE OR REPLACE FUNCTION create_user(username VARCHAR, password VARCHAR, email VARCHAR) RETURNS VOID AS $$
BEGIN
    INSERT INTO users (username, password, email) VALUES (username, password, email);
END;
$$ LANGUAGE plpgsql;

-- Function to create a new JWT token
CREATE OR REPLACE FUNCTION create_jwt_token(user_id INTEGER, token VARCHAR, expires_at TIMESTAMP) RETURNS VOID AS $$
BEGIN
    INSERT INTO jwt_tokens (user_id, token, expires_at) VALUES (user_id, token, expires_at);
END;
$$ LANGUAGE plpgsql;
