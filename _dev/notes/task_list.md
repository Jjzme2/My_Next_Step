# Task List for Goal, Habit, and Task Tracker App with Enhanced Features

## Project Overview

Develop a cost-effective web application using Node.js and Vite, aimed at helping males aged 25-35 achieve their goals through essential tracking features, motivational content, community support, journaling capabilities, comments, likes, and social media sharing. Utilize PostgreSQL as the database, with UUIDs for primary keys.

## Table of Contents

1. Planning and Setup
2. Database Design
3. Development
   - Backend Development
   - Frontend Development
   - Integration
4. Testing
5. Deployment
6. Marketing and User Engagement
7. Maintenance and Support
8. Legal and Compliance
9. Future Enhancements (Post-MVP)
10. Documentation

## 1. Planning and Setup

- Define MVP Features
- User Registration and Login
- Goal and Habit Creation
- Progress Tracking
- Journaling/Diary Feature
  - Ability to write journal entries
  - Option to make entries public or private
  - Public entries can be commented on and liked
  - Social media sharing for public entries
- Comments System with Comment Types
  - Comments on journal entries and community posts
- Likes System with Likes Count
  - Likes on journal entries and community posts
  - Display total likes (likes_count)
- Motivational Messages
- Basic Community Interaction (e.g., community posts)
- Choose Tech Stack
  - Backend: Node.js with Express.js
  - Frontend: Vite with React or Vue.js
  - Database: PostgreSQL
  - UUIDs for IDs
  - UI Framework: Bootstrap or Tailwind CSS
- Set Up Development Environment
  - Install Node.js and npm
  - Initialize project with Vite
  - Set up version control with Git and GitHub
  - Configure PostgreSQL database
  - Install necessary npm packages

## 2. Database Design

Design the database schema with the following tables and properties. All primary keys (id) are UUIDs.

### 2.1 Users Table

Stores user information.
- Table Name: users
- Columns:
  - id (UUID, Primary Key)
  - email (VARCHAR, Unique, Not Null)
  - password_hash (VARCHAR, Not Null)
  - first_name (VARCHAR)
  - last_name (VARCHAR)
  - created_at (TIMESTAMP, Default: NOW())
  - updated_at (TIMESTAMP, Default: NOW())

### 2.2 Goals Table

Stores user-defined goals.
- Table Name: goals
- Columns:
  - id (UUID, Primary Key)
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - title (VARCHAR, Not Null)
  - description (TEXT)
  - start_date (DATE)
  - end_date (DATE)
  - is_completed (BOOLEAN, Default: FALSE)
  - created_at (TIMESTAMP, Default: NOW())
  - updated_at (TIMESTAMP, Default: NOW())

### 2.3 Habits Table

Stores habits associated with users.
- Table Name: habits
- Columns:
  - id (UUID, Primary Key)
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - name (VARCHAR, Not Null)
  - description (TEXT)
  - frequency (VARCHAR)  // e.g., Daily, Weekly
  - created_at (TIMESTAMP, Default: NOW())
  - updated_at (TIMESTAMP, Default: NOW())

### 2.4 Habit_Trackers Table

Tracks habit completion (habit streaks).
- Table Name: habit_trackers
- Columns:
  - id (UUID, Primary Key)
  - habit_id (UUID, Foreign Key to habits(id), Not Null)
  - date (DATE, Not Null)
  - is_completed (BOOLEAN, Default: TRUE)
- Constraints:
  - Unique constraint on (habit_id, date)

### 2.5 Tasks Table

Stores tasks associated with goals or independently.
- Table Name: tasks
- Columns:
  - id (UUID, Primary Key)
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - goal_id (UUID, Foreign Key to goals(id), Nullable)
  - title (VARCHAR, Not Null)
  - description (TEXT)
  - due_date (DATE)
  - is_completed (BOOLEAN, Default: FALSE)
  - created_at (TIMESTAMP, Default: NOW())
  - updated_at (TIMESTAMP, Default: NOW())

### 2.6 Progress_Updates Table

Tracks progress updates on goals.
- Table Name: progress_updates
- Columns:
  - id (UUID, Primary Key)
  - goal_id (UUID, Foreign Key to goals(id), Not Null)
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - content (TEXT, Not Null)
  - created_at (TIMESTAMP, Default: NOW())

### 2.7 Journal_Entries Table

Stores users’ journal or diary entries.
- Table Name: journal_entries
- Columns:
  - id (UUID, Primary Key)
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - title (VARCHAR)
  - content (TEXT, Not Null)
  - is_public (BOOLEAN, Default: FALSE)
  - likes_count (INTEGER, Default: 0)
  - created_at (TIMESTAMP, Default: NOW())
  - updated_at (TIMESTAMP, Default: NOW())

### 2.8 Community_Posts Table

Stores posts made in the community forum.
- Table Name: community_posts
- Columns:
  - id (UUID, Primary Key)
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - title (VARCHAR, Not Null)
  - content (TEXT, Not Null)
  - likes_count (INTEGER, Default: 0)
  - created_at (TIMESTAMP, Default: NOW())
  - updated_at (TIMESTAMP, Default: NOW())

### 2.9 Comment_Types Table

Stores the different types of entities that can have comments.
- Table Name: comment_types
- Columns:
  - id (UUID, Primary Key)
  - type_name (VARCHAR, Unique, Not Null)  // e.g., ‘journal_entry’, ‘community_post’
  - table_name (VARCHAR, Not Null)  // Name of the associated table
  - created_at (TIMESTAMP, Default: NOW())

### 2.10 Comments Table

Stores comments on journal entries and community posts.
- Table Name: comments
- Columns:
  - id (UUID, Primary Key)
  - comment_type_id (UUID, Foreign Key to comment_types(id), Not Null)
  - parent_id (UUID, Not Null)  // References the entity’s primary key
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - content (TEXT, Not Null)
  - created_at (TIMESTAMP, Default: NOW())

### 2.11 Like_Types Table

Stores the different types of entities that can receive likes.
- Table Name: like_types
- Columns:
  - id (UUID, Primary Key)
  - type_name (VARCHAR, Unique, Not Null)  // e.g., ‘journal_entry’, ‘community_post’
  - table_name (VARCHAR, Not Null)  // Name of the associated table
  - created_at (TIMESTAMP, Default: NOW())

### 2.12 Likes Table

Stores likes on journal entries and community posts.
- Table Name: likes
- Columns:
  - id (UUID, Primary Key)
  - like_type_id (UUID, Foreign Key to like_types(id), Not Null)
  - parent_id (UUID, Not Null)  // References the entity’s primary key
  - user_id (UUID, Foreign Key to users(id), Not Null)
  - created_at (TIMESTAMP, Default: NOW())
- Constraints:
  - Unique constraint on (like_type_id, parent_id, user_id)

### 2.13 Motivational_Messages Table

(Existing table; same as before.)

### 2.14 User_Settings Table

(Existing table; same as before.)

## 3. Development

### Backend Development

- Set Up Database Connection
  - Install pg npm package
  - Configure connection to PostgreSQL
  - Ensure UUID generation using PostgreSQL’s uuid-ossp extension
- Implement Database Schema
  - Create all tables as per the updated schema
  - Insert initial data into comment_types and like_types
- User Authentication
  - Implement authentication using Passport.js or JWT
  - Secure password storage with bcrypt hashing
- API Endpoints
  - Users
    - Register
    - Login
    - Profile management
  - Goals
    - CRUD operations
  - Habits
    - CRUD operations
    - Habit tracking
  - Tasks
    - CRUD operations
  - Progress Updates
    - Add progress updates
  - Journal Entries
    - CRUD operations
    - Toggle public/private status
    - Fetch public entries
  - Community Posts
    - CRUD operations
  - Comments
    - Add comments to journal entries and community posts
    - Retrieve comments
  - Likes
    - Add/remove likes on journal entries and community posts
  - Motivational Messages
    - Retrieve random message
- Implement Triggers
  - For Comments
    - Create triggers or application-level checks to enforce referential integrity
  - For Likes
    - Implement triggers to update likes_count on journal entries and community posts

### Frontend Development

- User Interface
  - Design UI components for all features
  - Ensure responsive design for various devices
  - Use Bootstrap or Tailwind CSS for styling
- State Management
  - Use React’s Context API or Redux (if using React)
  - Use Vuex (if using Vue.js)
- Views and Components
  - Authentication Pages
    - Register
    - Login
  - Dashboard
    - Overview of goals, habits, and tasks
  - Goal Management
    - Create, view, edit, delete goals
  - Habit Tracking
    - View and update habits
  - Task Management
    - Create, view, edit, delete tasks
  - Journal Feature
    - Create/edit journal entries
    - Set entries as public or private
    - View public journal entries
    - Like and comment functionality
    - Social media sharing buttons
  - Community Forum
    - Create/edit community posts
    - View posts
    - Like and comment functionality
  - Settings
    - User preferences
    - Notification settings

### Integration

- Email Notifications
  - Integrate SendGrid (see guide below)
  - Set up email templates for:
    - Account confirmation
    - Password reset
    - Notifications for comments or likes (optional)
- Social Sharing
  - Implement sharing options for public journal entries on social media platforms
    - Facebook
    - Twitter
    - LinkedIn

## 4. Testing

- Unit Testing
  - Write tests for all backend services and API endpoints using Jest or Mocha
  - Write tests for frontend components using testing libraries like Jest and React Testing Library
- Integration Testing
  - Test interactions between different components and services
- Database Testing
  - Verify data integrity and constraints
  - Test triggers for comments and likes
- User Acceptance Testing
  - Conduct testing with a group of users
  - Gather feedback on usability and features

## 5. Deployment

- Hosting
  - Deploy backend to Heroku, AWS, or another cloud provider
  - Deploy frontend to Netlify, Vercel, or similar service
  - Set up environment variables securely
- Database Deployment
  - Host PostgreSQL database using services like Heroku Postgres
- CI/CD Pipeline
  - Set up continuous integration and deployment using GitHub Actions or another CI/CD tool
- SSL Certificate
  - Use Let’s Encrypt to enable HTTPS

## 6. Marketing and User Engagement

- Social Media Presence
  - Create accounts on relevant platforms
  - Develop content strategy
- User Onboarding
  - Design intuitive onboarding process
  - Provide tutorials or guides
- Feedback Mechanism
  - Integrate forms for collecting user feedback

## 7. Maintenance and Support

- Performance Monitoring
  - Use tools like New Relic or Sentry
- Regular Updates
  - Keep dependencies up to date
  - Monitor for security vulnerabilities
- User Support
  - Create FAQ section
  - Provide support contact information

## 8. Legal and Compliance

- Privacy Policy and Terms of Service
  - Draft documents using templates
  - Ensure compliance with data protection laws (e.g., GDPR)
- Content Moderation
  - Implement guidelines for user-generated content
  - Provide reporting mechanism for inappropriate content
- User Data Control
  - Allow users to delete their data
  - Provide options to download their data

## 9. Future Enhancements (Post-MVP)

- Advanced Analytics
  - Provide users with insights into their progress
- Notifications System
  - Implement real-time notifications for comments, likes, etc.
- Mobile Application
  - Develop mobile app using React Native or Flutter
- Gamification
  - Add badges, levels, or rewards

## 10. Documentation

- Technical Documentation
  - Document API endpoints
  - Document database schema
- User Documentation
  - Create user guides and tutorials
- Developer Guides
  - Provide setup instructions for new developers
