// BASE URL
const BASE_URL = "https://test1.my.id/v1";

// Fungsi untuk menampilkan dan menyembunyikan password
function togglePassword(inputId, eyeId) {
  const input = document.getElementById(inputId);
  const eyeIcon = document.getElementById(eyeId);

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

  // Reset pesan error
  messageElement.textContent = "";
  messageElement.classList.add("hidden");

  try {
    const response = await fetch(`${BASE_URL}${endpoint}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bodyData),
    });

    const result = await response.json();

    if (!response.ok) throw new Error(result.message || "Terjadi kesalahan");

    messageElement.textContent = successRedirect
      ? "Berhasil! Mengalihkan..."
      : "Login berhasil!";
    messageElement.classList.remove("hidden", "text-red-500");
    messageElement.classList.add("text-green-500");

    if (successRedirect) {
      setTimeout(() => (window.location.href = successRedirect), 2000);
    } else {
      localStorage.setItem("token", result.token);
      localStorage.setItem("isLoggedIn", "true");
      window.location.href = "/";
    }
  } catch (error) {
    messageElement.textContent = error.message;
    messageElement.classList.remove("hidden", "text-green-500");
    messageElement.classList.add("text-red-500");
  }
}

// Event listener untuk form login
const loginForm = document.getElementById("loginForm");
if (loginForm) {
  loginForm.addEventListener("submit", (event) => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    const errorMessage = document.getElementById("error-message");

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

    if (password !== passwordConfirmation) {
      messageBox.textContent = "Password dan konfirmasi password tidak cocok!";
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
