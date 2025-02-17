// Fungsi untuk upload file dan menyimpan ringkasan
function setupUpload() {
  document.getElementById("upload").addEventListener("click", async () => {
    const fileInput = document.getElementById("file-input");
    const summaryDiv = document.getElementById("summary");
    const loadingDiv = document.getElementById("loading");

    if (fileInput.files.length === 0) {
      alert("Please select a file!");
      return;
    }

    const file = fileInput.files[0];
    const formData = new FormData();
    formData.append("document", file);

    summaryDiv.classList.add("hidden");
    loadingDiv.classList.remove("hidden");

    try {
      const response = await fetch(`${BASE_URL}/upload`, {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Failed to process document");
      }

      const result = await response.json();
      summaryDiv.innerText = result.summary;
      summaryDiv.classList.remove("hidden");

      // Simpan ringkasan ke localStorage
      saveToHistory(result.summary);
    } catch (error) {
      summaryDiv.innerText = "Error: " + error.message;
      summaryDiv.classList.remove("hidden");
    } finally {
      loadingDiv.classList.add("hidden");
    }
  });
}

// Fungsi untuk menyimpan ringkasan ke localStorage
function saveToHistory(summary) {
  let history = JSON.parse(localStorage.getItem("summaries")) || [];
  history.push({ date: new Date().toLocaleString(), text: summary });
  localStorage.setItem("summaries", JSON.stringify(history));
}

// Fungsi untuk menampilkan history dari localStorage
function loadHistory() {
  let historyList = document.getElementById("history-list");
  let history = JSON.parse(localStorage.getItem("summaries")) || [];

  if (history.length === 0) {
    historyList.innerHTML =
      "<p class='text-gray-400'>No history available.</p>";
    return;
  }

  historyList.innerHTML = history
    .map(
      (item, index) => `<li class="mb-2 p-2 rounded">
                            <p class="text-sm text-gray-400">${item.date}</p>
                            <p>${item.text}</p>
                        </li>`
    )
    .join("");

  document
    .getElementById("clear-history")
    .addEventListener("click", clearHistory);
}

// Fungsi untuk menghapus history
function clearHistory() {
  localStorage.removeItem("summaries");
  loadHistory();
}
