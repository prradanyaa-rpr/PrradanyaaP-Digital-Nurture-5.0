import { courses } from "./data.js";

import {

    fetchUser,
    fetchUserAsync,
    fetchAllCourses,
    apiFetch,
    fetchPostsByUser,
    fetchBothUsers

} from "./api.js";

/* ===============================
   DOM Elements
================================ */

const loadingCourses =
    document.querySelector("#loadingCourses");

const courseContainer =
    document.querySelector("#courseContainer");

const totalCredits =
    document.querySelector("#totalCredits");

const selectedText =
    document.querySelector("#selectedText");

const searchBox =
    document.querySelector("#searchBox");

const sortBtn =
    document.querySelector("#sortBtn");

const loadingPosts =
    document.querySelector("#loadingPosts");

const notificationContainer =
    document.querySelector("#notificationContainer");

const errorMessage =
    document.querySelector("#errorMessage");

const retryBtn =
    document.querySelector("#retryBtn");

/* ===============================
   Render Courses
================================ */

function renderCourses(courseArray)
{

    courseContainer.innerHTML = "";

    courseArray.forEach(course=>{

        const card =
            document.createElement("article");

        card.className = "course-card";

        card.dataset.id = course.id;

        card.innerHTML = `

            <h3>${course.name}</h3>

            <p><strong>Course Code:</strong> ${course.code}</p>

            <p><strong>Credits:</strong> ${course.credits}</p>

        `;

        courseContainer.appendChild(card);

    });

    const credits =
        courseArray.reduce(

            (sum,course)=>sum+course.credits,

            0

        );

    totalCredits.textContent =
        `Total Credits : ${credits}`;

}

/* ===============================
   Load Courses
================================ */

async function loadCourses()
{

    loadingCourses.style.display = "block";

    const data =
        await fetchAllCourses();

    renderCourses(data);

    loadingCourses.style.display = "none";

}

loadCourses();

/* ===============================
   Search
================================ */

searchBox.addEventListener("input",()=>{

    const value =
        searchBox.value.toLowerCase();

    const filtered =
        courses.filter(course=>

            course.name
                  .toLowerCase()
                  .includes(value)

        );

    renderCourses(filtered);

});

/* ===============================
   Sort
================================ */

sortBtn.addEventListener("click",()=>{

    const sorted =
        [...courses];

    sorted.sort(

        (a,b)=>b.credits-a.credits

    );

    renderCourses(sorted);

});

/* ===============================
   Selected Course
================================ */

courseContainer.addEventListener("click",(event)=>{

    const card =
        event.target.closest(".course-card");

    if(!card)
        return;

    const id =
        Number(card.dataset.id);

    const course =
        courses.find(c=>c.id===id);

    selectedText.innerHTML = `

        <strong>Course:</strong> ${course.name}<br>

        <strong>Code:</strong> ${course.code}<br>

        <strong>Credits:</strong> ${course.credits}<br>

        <strong>Grade:</strong> ${course.grade}

    `;

});

/* ===============================
   Notifications
================================ */

async function loadNotifications(useBadUrl = false)
{

    loadingPosts.style.display = "block";

    retryBtn.style.display = "none";

    errorMessage.innerHTML = "";

    notificationContainer.innerHTML = "";

    try{

        const url = useBadUrl

            ? "https://jsonplaceholder.typicode.com/nonexistent"

            : "https://jsonplaceholder.typicode.com/posts";

        await apiFetch(url);

        const notificationTitles = [

            "New Assignment Available",
            "Upcoming Mid Semester Exam",
            "Project Submission Reminder",
            "Workshop Registration Open",
            "Placement Training Schedule"

        ];

        const notificationMessages = [

            "A new assignment has been uploaded. Please complete it before the deadline.",

            "Your Mid Semester Examination timetable has been published. Check the exam schedule.",

            "Final year project submissions are due this Friday. Upload your project report on time.",

            "Registration is now open for the Full Stack Development Workshop. Seats are limited.",

            "Placement aptitude training starts next Monday. Please attend all scheduled sessions."

        ];

        notificationTitles.forEach((title,index)=>{

            const card =
                document.createElement("div");

            card.className = "course-card";

            card.innerHTML = `

                <h3>${title}</h3>

                <p>${notificationMessages[index]}</p>

            `;

            notificationContainer.appendChild(card);

        });

    }

    catch(error){

        errorMessage.innerHTML = `

            <p>

                Unable to load notifications.

                Please try again.

            </p>

        `;

        retryBtn.style.display = "block";

    }

    finally{

        loadingPosts.style.display = "none";

    }

}

/* ===============================
   First demonstrate 404 error
================================ */

loadNotifications(true);

/* ===============================
   Retry Button
================================ */

retryBtn.addEventListener("click",()=>{

    loadNotifications(false);

});

/* ===============================
   Promise Demo
================================ */

fetchUser(1);

fetchUserAsync(1);

fetchBothUsers();

fetchPostsByUser(1).then(posts=>{

    console.log(

        "Axios User 1 Posts:",

        posts.length

    );

});