// Fungsi untuk menampilkan dan menyembunyikan password
function togglePassword(inputId, eyeId) {
  const input = document.getElementById(inputId);
  const eyeIcon = document.getElementById(eyeId);

  if (!input || !eyeIcon) {
    console.error("Elemen tidak ditemukan:", inputId, eyeId);
    return;
  }

  const isPassword = input.type === "password";
  input.type = isPassword ? "text" : "password";
  eyeIcon.classList.toggle("ri-eye-line", isPassword);
  eyeIcon.classList.toggle("ri-eye-off-line", !isPassword);
}

// Fungsi untuk menangani submit form (Login/Register)
async function handleSubmit(
  event,
  endpoint,
  bodyData,
  messageElement,
  successRedirect = null
) {
  event.preventDefault();

  if (!messageElement) {
    console.error("Elemen pesan tidak ditemukan");
    return;
  }

  // Reset pesan error
  messageElement.textContent = "";
  messageElement.classList.add("hidden");

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    // Jika status bukan 200-299, langsung lempar error
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Terjadi kesalahan pada server");
    }

    const result = await response.json();

    // Pastikan token ada dalam response
    const token = result.token || result.data?.token;
    const user = result.user || result.data?.user;

    if (!user) throw new Error("Data pengguna tidak ditemukan dalam response!");
    if (!token) throw new Error("Token tidak ditemukan dalam response!");

    messageElement.textContent = successRedirect
      ? "Berhasil! Mengalihkan..."
      : "Login berhasil!";
    messageElement.classList.remove("hidden", "text-red-500");
    messageElement.classList.add("text-green-500");

    // Simpan token, name, dan email ke localStorage
    localStorage.setItem("token", token);
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("id", user.id);
    localStorage.setItem("name", user.name);
    localStorage.setItem("email", user.email);

    if (successRedirect) {
      setTimeout(() => (window.location.href = successRedirect), 2000);
    } else {
      window.location.href = "/";
    }
  } catch (error) {
    console.error("Error:", error.message);
    messageElement.textContent = error.message;
    messageElement.classList.remove("hidden", "text-green-500");
    messageElement.classList.add("text-red-500");
  }
}

// Tunggu DOM siap sebelum menjalankan script
document.addEventListener("DOMContentLoaded", () => {
  // Event listener untuk form login
  const loginForm = document.getElementById("loginForm");
  if (loginForm) {
    loginForm.addEventListener("submit", (event) => {
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const errorMessage = document.getElementById("error-message");

      if (!email || !password) {
        errorMessage.textContent = "Email dan password harus diisi!";
        errorMessage.classList.remove("hidden", "text-green-500");
        errorMessage.classList.add("text-red-500");
        return;
      }

      handleSubmit(event, "/auth/login", { email, password }, errorMessage);
    });
  }

  // Event listener untuk form register
  const registerForm = document.getElementById("registerForm");
  if (registerForm) {
    registerForm.addEventListener("submit", (event) => {
      const name = document.getElementById("name").value;
      const email = document.getElementById("email").value;
      const password = document.getElementById("password").value;
      const passwordConfirmation = document.getElementById(
        "password_confirmation"
      ).value;
      const messageBox = document.getElementById("message");

      if (!name || !email || !password || !passwordConfirmation) {
        messageBox.textContent = "Semua kolom harus diisi!";
        messageBox.classList.remove("hidden", "text-green-500");
        messageBox.classList.add("text-red-500");
        return;
      }

      if (password !== passwordConfirmation) {
        messageBox.textContent =
          "Password dan konfirmasi password tidak cocok!";
        messageBox.classList.remove("hidden", "text-green-500");
        messageBox.classList.add("text-red-500");
        return;
      }

      handleSubmit(
        event,
        "/auth/register",
        { name, email, password },
        messageBox,
        "/login/index.html"
      );
    });
  }
});
