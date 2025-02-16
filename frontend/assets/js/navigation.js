const fullName = localStorage.getItem("name") || "User";
const firstName = fullName.split(" ")[0]; 
document.getElementById("profileName").innerText = firstName;

// Redirect otomatis jika halaman login dimuat
function redirectToLogin() {
  window.location.href = "/login/index.html";
}

// Fungsi untuk logout pengguna
function logoutUser() {
  localStorage.clear();
  alert("Anda telah logout!");
  window.location.href = "/login/index.html";
}

// Event listener untuk tombol logout di dropdown
document
  .getElementById("logout-dropdown")
  .addEventListener("click", logoutUser);

// Fungsi untuk generate navigasi dan footer
function generateNavAndFooter() {
  document.getElementById("nav-links").innerHTML = menu
    .map(
      (item) =>
        `<li><a href="#" id="nav-${item.id}" class="nav-link">${item.name} <i class="${item.icon}"></i></a></li>`
    )
    .join("");

  document.getElementById("footer").innerHTML = menu
    .map(
      (item) =>
        `<a href="#" id="foot-${item.id}" class="foot-link flex flex-col items-center"><i class="${item.icon}"></i><span class="text-xs">${item.name}</span></a>`
    )
    .join("");
}

// Fungsi untuk memuat halaman
function loadPage(page) {
  if (!auth(page)) return;
  document.getElementById("content").innerHTML = pages[page];
  document
    .querySelectorAll(".nav-link, .foot-link")
    .forEach((link) => link.classList.remove("text-green-400"));
  if (document.getElementById(`nav-${page}`))
    document.getElementById(`nav-${page}`).classList.add("text-green-400");
  if (document.getElementById(`foot-${page}`))
    document.getElementById(`foot-${page}`).classList.add("text-green-400");

  if (page === "profile") loadUserProfile();
  if (page === "add") setupUpload();
  if (page === "history") loadHistory();
}

// Event Listener untuk navigasi
document.addEventListener("click", function (event) {
  menu.forEach((item) => {
    if (event.target.closest(`#nav-${item.id}, #foot-${item.id}`)) {
      loadPage(item.id);
    }
  });

  if (event.target.closest("#nav-profile")) {
    loadPage("profile");
  }
});

// Profile dropdown
document.getElementById("profileBtn").addEventListener("click", function () {
  document.getElementById("profileMenu").classList.toggle("hidden");
});

document.addEventListener("click", function (event) {
  let profileMenu = document.getElementById("profileMenu");
  if (!event.target.closest("#profileBtn")) profileMenu.classList.add("hidden");
});

function auth(page) {
  const protectedPages = ["add", "history", "profile"];
  const isLoggedIn = localStorage.getItem("isLoggedIn") === "true";

  if (protectedPages.includes(page) && !isLoggedIn) {
    alert("Anda harus login terlebih dahulu!");
    redirectToLogin();
    return false;
  }
  return true;
}

generateNavAndFooter();
loadPage("home");
