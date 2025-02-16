// Fungsi untuk memuat data user ke halaman Profile
function loadUserProfile() {
  const userId = localStorage.getItem("id");
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

        <!-- Tombol Edit Profile -->
        <button id="edit-profile-btn" class="mt-4 bg-blue-600 text-sm px-4 py-2 rounded-md hover:bg-blue-700 transition">
            Edit Profile
        </button>

        <!-- Form Edit Profile -->
        <div id="edit-profile-form" class="hidden mt-4 w-full">
            <input type="text" id="edit-name" class="w-full p-2 rounded bg-gray-700 text-white mb-2" placeholder="Enter new name" value="${name}">
            <input type="email" id="edit-email" class="w-full p-2 rounded bg-gray-700 text-white mb-2" placeholder="Enter new email" value="${email}">
            <button id="save-profile-btn" class="w-full bg-green-600 text-sm px-4 py-2 rounded-md hover:bg-green-700 transition">
            Save Changes
            </button>
        </div>

        <!-- Tombol Logout -->
        <button id="logout-btn" class="mt-6 bg-red-600 text-sm px-4 py-2 rounded-md hover:bg-red-700 transition">
            Logout
        </button>
        </div>
    `;

  // Event Listener untuk menampilkan form edit profil
  document
    .getElementById("edit-profile-btn")
    .addEventListener("click", function () {
      document.getElementById("edit-profile-form").classList.toggle("hidden");
    });

  // Event Listener untuk menyimpan perubahan profil
  document
    .getElementById("save-profile-btn")
    .addEventListener("click", async function () {
      const newName = document.getElementById("edit-name").value.trim();
      const newEmail = document.getElementById("edit-email").value.trim();

      if (!userId) {
        alert("User ID tidak ditemukan. Silakan login kembali.");
        return;
      }

      if (!newName || !newEmail) {
        alert("Nama dan email tidak boleh kosong!");
        return;
      }

      const updateData = {
        name: newName,
        email: newEmail,
      };

      try {
        const response = await fetch(`${BASE_URL}/profile/${userId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
          body: JSON.stringify(updateData),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.message || "Gagal memperbarui profil");
        }

        const result = await response.json();

        // Update localStorage dengan data baru
        localStorage.setItem("name", result.name);
        localStorage.setItem("email", result.email);

        // Perbarui UI dengan data baru
        document.getElementById("profile-name").innerText = result.name;
        document.getElementById("profile-email").innerText = result.email;
        document.getElementById(
          "profile-avatar"
        ).src = `https://ui-avatars.com/api/?name=${encodeURIComponent(
          result.name
        )}&background=10b981&color=ffffff&size=128`;

        // Sembunyikan form edit profil setelah update
        document.getElementById("edit-profile-form").classList.add("hidden");

        alert("Profil berhasil diperbarui!");
      } catch (error) {
        alert("Error: " + error.message);
      }
    });

  // Event Listener untuk logout
  document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.clear();
    alert("Anda telah logout!");
    window.location.href = "/login/index.html";
  });
}
