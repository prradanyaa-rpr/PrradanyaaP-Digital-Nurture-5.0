import { courses } from "./data.js";

/* ===========================================
   Task 1 - Promise Chaining
=========================================== */

export function fetchUser(id) {

    return fetch(
        `https://jsonplaceholder.typicode.com/users/${id}`
    )
        .then(response => response.json())
        .then(user => {

            console.log("Promise User :", user.name);

            return user;

        });

}

/* ===========================================
   Task 1 - Async / Await
=========================================== */

export async function fetchUserAsync(id) {

    try {

        const response = await fetch(
            `https://jsonplaceholder.typicode.com/users/${id}`
        );

        const user = await response.json();

        console.log("Async User :", user.name);

        return user;

    }

    catch (error) {

        console.error(error);

    }

}

/* ===========================================
   Task 1 - Simulated Network Delay
=========================================== */

export function fetchAllCourses() {

    return new Promise(resolve => {

        setTimeout(() => {

            resolve(courses);

        }, 1000);

    });

}

/* ===========================================
   Task 2 - Reusable Fetch API
=========================================== */

export async function apiFetch(url) {

    const response = await fetch(url);

    if (!response.ok) {

        throw new Error(

            `HTTP Error : ${response.status}`

        );

    }

    return await response.json();

}

/* ===========================================
   Task 3 - Axios Interceptor
=========================================== */

axios.interceptors.request.use(config => {

    console.log(

        `API call started : ${config.url}`

    );

    return config;

});

/* ===========================================
   Task 3 - Axios Fetch
=========================================== */

export async function apiFetchAxios(url) {

    const response = await axios.get(

        url,

        {

            timeout:5000

        }

    );

    return response.data;

}

/* ===========================================
   Task 3 - Axios Params
=========================================== */

export async function fetchPostsByUser(userId) {

    const response = await axios.get(

        "https://jsonplaceholder.typicode.com/posts",

        {

            params:{

                userId:userId

            }

        }

    );

    return response.data;

}

/* ===========================================
   Promise.all()
=========================================== */

export async function fetchBothUsers() {

    const users = await Promise.all([

        fetchUserAsync(1),

        fetchUserAsync(2)

    ]);

    console.log(

        users[0].name,

        users[1].name

    );

}

/* ===========================================

Fetch vs Axios

1. Fetch requires response.ok checking.
   Axios throws automatically.

2. Fetch needs response.json().
   Axios parses JSON automatically.

3. Axios supports interceptors,
   timeout and request configuration.

=========================================== */