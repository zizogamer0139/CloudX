function login() {
  const username = document.getElementById("user").value;
  const password = document.getElementById("pass").value;

  if (username === "admin" && password === "1234") {
    localStorage.setItem("cloudx_user", username);
    window.location.href = "dashboard.html";
  } else {
    alert("Wrong login ❌");
  }
}