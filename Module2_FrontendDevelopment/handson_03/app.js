import { courses } from "./data.js";

/* ==========================
   ES6 Syntax Practice
========================== */

courses.forEach(course => {

    const { name, credits } = course;

    console.log(`${name} - ${credits} Credits`);

});

const courseList = courses.map(course =>
    `${course.name} (${course.credits} Credits)`
);

console.log(courseList);

const highCreditCourses = courses.filter(course =>
    course.credits >= 4
);

console.log("Courses with 4 or more credits:", highCreditCourses.length);

const totalCredits = courses.reduce(
    (sum, course) => sum + course.credits,
    0
);

console.log("Total Credits:", totalCredits);

/* ==========================
   DOM Elements
========================== */

const courseContainer =
    document.querySelector("#courseContainer");

const totalCreditsElement =
    document.querySelector("#totalCredits");

const selectedText =
    document.querySelector("#selectedText");

const searchBox =
    document.querySelector("#searchBox");

const sortBtn =
    document.querySelector("#sortBtn");

/* ==========================
   Render Function
========================== */

function renderCourses(courseArray)
{

    courseContainer.innerHTML = "";

    courseArray.forEach(course => {

        const article =
            document.createElement("article");

        article.className = "course-card";

        article.dataset.id = course.id;

        article.innerHTML = `

        <h3>${course.name}</h3>

        <p><strong>Course Code:</strong> ${course.code}</p>

        <p><strong>Credits:</strong> ${course.credits}</p>

`;

        courseContainer.appendChild(article);

    });

    const total = courseArray.reduce(
        (sum, course) => sum + course.credits,
        0
    );

    totalCreditsElement.textContent =
        `Total Credits : ${total}`;

}

/* ==========================
   Initial Render
========================== */

renderCourses(courses);

/* ==========================
   Search
========================== */

searchBox.addEventListener("input", () => {

    const value =
        searchBox.value.toLowerCase();

    const filteredCourses =
        courses.filter(course =>
            course.name.toLowerCase().includes(value)
        );

    renderCourses(filteredCourses);

});

/* ==========================
   Sort
========================== */

sortBtn.addEventListener("click", () => {

    const sortedCourses =
        [...courses];

    sortedCourses.sort(
        (a, b) => b.credits - a.credits
    );

    renderCourses(sortedCourses);

});

/* ==========================
   Event Delegation
========================== */

courseContainer.addEventListener("click", (event) => {

    const card =
        event.target.closest(".course-card");

    if (!card)
        return;

    const courseId =
        Number(card.dataset.id);

    const selectedCourse =
        courses.find(course =>
            course.id === courseId
        );

    selectedText.innerHTML = `

    <strong>Course:</strong> ${selectedCourse.name}<br>

    <strong>Code:</strong> ${selectedCourse.code}<br>

    <strong>Credits:</strong> ${selectedCourse.credits}<br>

    <strong>Grade:</strong> ${selectedCourse.grade}

`;

});