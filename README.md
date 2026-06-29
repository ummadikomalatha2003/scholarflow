# Student Management System

A web application to manage student records built using React.js.

## Features
- Add, Edit, Delete students
- Search and filter students
- Form validation

## Tech Stack
- React.js
- Tailwind CSS
- REST API
- MySQL

## How to Run

```bash
git clone https://github.com/your-username/student-management-system.git
cd student-management-system
npm install
npm run dev
```

## Database Table

```sql
CREATE TABLE students (
  id INT AUTO_INCREMENT PRIMARY KEY,
  student_id VARCHAR(20),
  name VARCHAR(100),
  email VARCHAR(100),
  course VARCHAR(100),
  age INT
);
```

## API Endpoints

- GET /students
- POST /students
- PUT /students/{id}
- DELETE /students/{id}
