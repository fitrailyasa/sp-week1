// Base URL API
const BASE_URL = "http://localhost:3000/api";

// Menu Navigasi
const menu = [
  { name: "Home", id: "home", icon: "ri-home-4-line" },
  { name: "Generate", id: "add", icon: "ri-add-circle-line" },
  { name: "History", id: "history", icon: "ri-history-line" },
];

// Halaman yang akan dimuat
const pages = {
  home: `<div>
            <h1 class='text-2xl font-bold'>SUMMARIZER APP</h1>
            <p class='my-4 px-5 text-justify md:text-center md:px-20'>
              Aplikasi berbasis web yang menggunakan metode <span class='text-green-400'>Retrieval-Augmented Generation (RAG)</span> untuk menghasilkan ringkasan atau resume dari dokumen yang diberikan pengguna.
            </p>
            <a href="#" id="nav-add" class="bg-green-500 text-sm px-4 py-2 rounded">START</a>
        </div>`,
  add: `<div class="">
        <h1 class="text-2xl font-bold text-center mb-4">Upload Document</h1>
        <div class="mb-4 mx-7">
            <input type="file" id="file-input" class="block w-full text-sm text-gray-100 border rounded-lg p-2" accept=".pdf">
        </div>
        <div class="flex justify-center">
            <button id="upload" class="bg-green-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-green-700">Upload & Summarize</button>
        </div>
        <div id="loading" class="text-center mt-4 hidden">
          <div class="animate-spin h-8 w-8 border-4 border-green-500 border-t-transparent rounded-full mx-auto"></div>
          <p class="text-gray-200 mt-2">Processing...</p>
        </div>
        <div id="summary" class="my-4 mx-7 p-4 text-sm bg-green-100 border-l-4 border-green-500 text-green-700 rounded-lg max-h-60 overflow-y-auto hidden"></div>
      </div>`,
  history: `<div class="">
        <h1 class="text-2xl font-bold text-center mb-4">History</h1>
            <ul id="history-list" class="text-lg text-left px-4 mx-7 max-h-80 overflow-y-auto border border-gray-300 rounded-lg p-2"></ul>
            <button id="clear-history" class="mt-4 bg-red-600 text-sm text-white px-4 py-2 rounded-lg hover:bg-red-700">Clear History</button>
          </div>`,
};