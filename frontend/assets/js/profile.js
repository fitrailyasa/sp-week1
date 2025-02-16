// Fungsi untuk memuat data user ke halaman Profile
function loadUserProfile() {
  const name = localStorage.getItem("name") || "User";
  const email = localStorage.getItem("email") || "user@example.com";

  document.getElementById("content").innerHTML = `
        <div class="flex flex-col items-center backdrop-blur-2xl bg-white/10 text-white shadow-[0_0_15px_rgba(200,200,200,0.5)] ring-1 ring-white/20 p-6 rounded-lg w-80">
        <!-- Foto Profil (Avatar) -->
        <div class="w-24 h-24 rounded-full overflow-hidden border-4 border-green-400 mb-4">
            <img id="profile-avatar" src="https://ui-avatars.com/api/?name=${encodeURIComponent(
              name
            )}&background=10b981&color=ffffff&size=128" alt="Profile Avatar">
        </div>

        <!-- Nama & Email -->
        <h2 id="profile-name" class="text-2xl font-semibold">${name}</h2>
        <p id="profile-email" class="text-gray-400">${email}</p>

        <!-- Tombol Logout -->
        <button id="logout-btn" class="mt-6 bg-red-600 text-sm px-4 py-2 rounded-md hover:bg-red-700 transition">
            Logout
        </button>
        </div>
    `;

  // Event Listener untuk logout
  document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.clear();
    alert("Anda telah logout!");
    window.location.href = "/login/index.html";
  });
}
