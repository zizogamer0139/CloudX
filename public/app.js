let currentUser = null;

// LOGIN
async function login() {
    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    const res = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password })
    });

    const data = await res.json();

    if (data.success) {
        currentUser = username;

        document.getElementById("loginBox").style.display = "none";
        document.getElementById("app").style.display = "block";

        loadFiles();
    } else {
        alert("Wrong login ❌");
    }
}

// UPLOAD
async function upload() {
    const file = document.getElementById("file").files[0];

    const formData = new FormData();
    formData.append("file", file);

    await fetch("/upload", {
        method: "POST",
        headers: { user: currentUser },
        body: formData
    });

    loadFiles();
}

// LOAD FILES
async function loadFiles() {
    const res = await fetch("/files", {
        headers: { user: currentUser }
    });

    const files = await res.json();

    const list = document.getElementById("list");
    list.innerHTML = "";

    files.forEach(f => {
        const li = document.createElement("li");
        li.innerHTML = `<a href="/download/${f}" target="_blank">📄 ${f}</a>`;
        list.appendChild(li);
    });
}