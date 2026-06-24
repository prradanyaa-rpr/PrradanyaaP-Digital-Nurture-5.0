
CREATE DATABASE college_db;
USE college_db;

CREATE TABLE departments (
    department_id INT PRIMARY KEY AUTO_INCREMENT,
    dept_name VARCHAR(100) NOT NULL,
    hod_name VARCHAR(100),
    budget DECIMAL(12,2)
);

CREATE TABLE students (
    student_id INT PRIMARY KEY AUTO_INCREMENT,
    first_name VARCHAR(50) NOT NULL,
    last_name VARCHAR(50) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    date_of_birth DATE,
    department_id INT,
    enrollment_year INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);


CREATE TABLE courses (
    course_id INT PRIMARY KEY AUTO_INCREMENT,
    course_name VARCHAR(150) NOT NULL,
    course_code VARCHAR(20) NOT NULL UNIQUE,
    credits INT,
    department_id INT,
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE professors (
    professor_id INT PRIMARY KEY AUTO_INCREMENT,
    prof_name VARCHAR(100) NOT NULL,
    email VARCHAR(100) NOT NULL UNIQUE,
    department_id INT,
    salary DECIMAL(10,2),
    FOREIGN KEY (department_id) REFERENCES departments(department_id)
);

CREATE TABLE enrollments (
    enrollment_id INT PRIMARY KEY AUTO_INCREMENT,
    student_id INT,
    course_id INT,
    enrollment_date DATE,
    grade CHAR(2),
    FOREIGN KEY (student_id) REFERENCES students(student_id),
    FOREIGN KEY (course_id) REFERENCES courses(course_id)
);

ALTER TABLE students 
ADD COLUMN phone_number VARCHAR(15);
ALTER TABLE courses 
ADD COLUMN max_seats INT DEFAULT 60;

ALTER TABLE enrollments 
ADD CONSTRAINT chk_grade CHECK (grade IN ('A', 'B', 'C', 'D', 'F') OR grade IS NULL);
ALTER TABLE departments 
RENAME COLUMN hod_name TO head_of_dept;

ALTER TABLE students 
DROP COLUMN phone_number;

SELECT table_name, column_name, data_type, column_default
FROM information_schema.columns
WHERE table_schema = 'college_db' 
  AND table_name IN ('departments', 'courses');

SELECT table_name, column_name 
FROM information_schema.columns 
WHERE table_schema = 'college_db' 
AND table_name = 'students'
AND column_name = 'phone_number';

