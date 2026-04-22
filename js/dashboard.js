console.log("dashboard loaded");

// auth check
const user = localStorage.getItem("cloudx_user");

if (!user) {
  window.location.href = "index.html";
} else {
  document.getElementById("welcome").innerText =
    "Logged in as: " + user;
}

document.addEventListener("DOMContentLoaded", () => {
  document.getElementById("uploadBtn").addEventListener("click", uploadFile);
  document.getElementById("logoutBtn").addEventListener("click", logout);

  loadFiles();
});

// upload
async function uploadFile() {
  const file = document.getElementById("fileInput").files[0];

  if (!file) return alert("Select file ❌");

  const fileName = Date.now() + "-" + file.name;

  const { error } = await supabase.storage
    .from(CONFIG.BUCKET)
    .upload(fileName, file);

  if (error) {
    alert("Upload failed ❌");
    console.error(error);
    return;
  }

  alert("Uploaded ✅");
  loadFiles();
}

// list files
async function loadFiles() {
  const { data, error } = await supabase.storage
    .from(CONFIG.BUCKET)
    .list();

  const list = document.getElementById("fileList");
  list.innerHTML = "";

  if (error) {
    list.innerHTML = "<li>Error ❌</li>";
    return;
  }

  if (!data || data.length === 0) {
    list.innerHTML = "<li>No files 📂</li>";
    return;
  }

  data.forEach(file => {
    const { data: urlData } = supabase.storage
      .from(CONFIG.BUCKET)
      .getPublicUrl(file.name);

    const li = document.createElement("li");
    li.innerHTML = `<a href="${urlData.publicUrl}" target="_blank">${file.name}</a>`;
    list.appendChild(li);
  });
}

// logout
function logout() {
  localStorage.removeItem("cloudx_user");
  window.location.href = "index.html";
}