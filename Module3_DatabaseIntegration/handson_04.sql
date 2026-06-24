EXPLAIN
SELECT s.first_name,
s.last_name,
c.course_name
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;

CREATE INDEX idx_students_enrollment_year
ON students(enrollment_year);


CREATE UNIQUE INDEX idx_enrollment_unique
ON enrollments(student_id, course_id);


CREATE INDEX idx_course_code
ON courses(course_code);


EXPLAIN
SELECT s.first_name,
s.last_name,
c.course_name
FROM enrollments e
JOIN students s ON s.student_id = e.student_id
JOIN courses c ON c.course_id = e.course_id
WHERE s.enrollment_year = 2022;


SHOW INDEX FROM students;
SHOW INDEX FROM enrollments;
SHOW INDEX FROM courses;


SELECT *
FROM students
WHERE enrollment_year = 2022;

SELECT *
FROM courses
WHERE course_code = 'CS301';


SELECT c.course_name,
COUNT(e.student_id) AS total_students
FROM courses c
LEFT JOIN enrollments e
ON c.course_id = e.course_id
GROUP BY c.course_id,c.course_name;

SELECT c.course_name,
AVG(
CASE
WHEN e.grade='A' THEN 4
WHEN e.grade='B' THEN 3
WHEN e.grade='C' THEN 2
WHEN e.grade='D' THEN 1
ELSE 0
END
) AS avg_grade
FROM courses c
LEFT JOIN enrollments e
ON c.course_id=e.course_id
GROUP BY c.course_id,c.course_name;


SELECT student_id,
COUNT(course_id) AS total_courses
FROM enrollments
GROUP BY student_id
HAVING COUNT(course_id) > 1;

SELECT d.department_name,
COUNT(s.student_id) AS total_students
FROM departments d
LEFT JOIN students s
ON d.department_id=s.department_id
GROUP BY d.department_id,d.department_name;

SELECT prof_name,
salary
FROM professors
ORDER BY salary DESC;

SHOW INDEXES FROM students;
SHOW INDEXES FROM enrollments;
SHOW INDEXES FROM courses;
