async function registerUser() {

    const userData = {

        name: document.getElementById("name").value,

        email: document.getElementById("email").value,

        password: document.getElementById("password").value,

        role: document.getElementById("role").value
    };

    const response = await fetch("http://localhost:3000/register", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(userData)
    });

    const data = await response.json();

    alert(data.message);
}



// ================= LOGIN =================

async function loginUser() {

    const loginData = {

        email: document.getElementById("email").value,

        password: document.getElementById("password").value
    };

    const response = await fetch("http://localhost:3000/login", {

        method: "POST",

        headers: {
            "Content-Type": "application/json"
        },

        body: JSON.stringify(loginData)
    });

    const data = await response.json();

    alert(data.message);

    console.log(data);

    // admin login
    if (data.role === "admin") {

        localStorage.setItem("role", "admin");

        window.location.href = "admin.html";
    }

    // student login
    else if (data.role === "student") {

        localStorage.setItem("role", "student");

        localStorage.setItem("studentName", data.name);
        localStorage.setItem("studentEmail", data.email);

        window.location.href = "student.html";
    }
}