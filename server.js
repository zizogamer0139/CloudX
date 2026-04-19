const express = require("express");
const multer = require("multer");
const fs = require("fs");
const path = require("path");

const app = express();
const upload = multer({ dest: "uploads/" });

app.use(express.json());
app.use(express.static("public"));

const users = {
    zizo: "0139"
};

let loggedInUsers = new Set();

// LOGIN
app.post("/login", (req, res) => {
    const { username, password } = req.body;

    if (users[username] && users[username] === password) {
        loggedInUsers.add(username);
        return res.json({ success: true });
    }

    res.json({ success: false });
});

// AUTH CHECK MIDDLEWARE
function auth(req, res, next) {
    const user = req.headers.user;

    if (!user || !loggedInUsers.has(user)) {
        return res.status(401).send("Not logged in");
    }

    next();
}

// UPLOAD
app.post("/upload", auth, upload.single("file"), (req, res) => {
    res.json({ message: "uploaded" });
});

// FILE LIST
app.get("/files", auth, (req, res) => {
    const files = fs.readdirSync("./uploads");
    res.json(files);
});

// DOWNLOAD
app.get("/download/:name", auth, (req, res) => {
    res.download(path.join(__dirname, "uploads", req.params.name));
});

// START
app.listen(3000, () => {
    console.log("CloudX running on http://localhost:3000");
});