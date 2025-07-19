// Dummy data untuk demo
const userName = "Bapak/Ibu Pegawai";
const hearingsToday = [
  { time: "09:00", case: "342/A/2025", room: "II" },
  { time: "10:30", case: "123/B/2025", room: "I" },
];
const queue = [
  { case: "342/A/2025", status: "active", room: "II" },
  { case: "123/B/2025", status: "next", room: "I" },
];
const notifications = ["Nomor perkara 342/A/2025 dipanggil ke Ruang Sidang II"];

function panggilSidang() {
  const select = document.getElementById("perkaraSelect");
  const selected = select.options[select.selectedIndex];
  const nomor = selected.value;
  const ruang = selected.getAttribute("data-ruang");
  const text = `Nomor perkara ${nomor} dipanggil ke Ruang Sidang ${ruang}`;
  document.getElementById("callText").value = text;

  // Pastikan voices sudah ter-load
  const synth = window.speechSynthesis;
  let voices = synth.getVoices();
  if (!voices.length) {
    // Jika voices belum siap, tunggu event dan panggil ulang
    window.speechSynthesis.onvoiceschanged = function () {
      panggilSidang();
    };
    return;
  }
  let indoFemale = voices.find(
    (v) => v.lang.startsWith("id") && v.name.toLowerCase().includes("female")
  );
  if (!indoFemale) indoFemale = voices.find((v) => v.lang.startsWith("id"));
  if (!indoFemale) indoFemale = voices.find((v) => v.lang.startsWith("id-ID"));
  if (!indoFemale) indoFemale = voices.find((v) => v.lang.startsWith("id"));

  const utter = new SpeechSynthesisUtterance(text);
  utter.lang = "id-ID";
  if (indoFemale) utter.voice = indoFemale;
  synth.speak(utter);
}

document.getElementById("app").innerHTML = `
  <div class="dashboard">
    <header class="main-header">
      <img src="../public/logo-pengadilan.png" alt="Logo Pengadilan" class="logo" />
      <div>
        <h1>🏛️ eSidang</h1>
        <p class="greeting">Selamat Datang, <b>Bapak/Ibu Pegawai</b></p>
      </div>
    </header>
    <section class="widgets">
      <div class="widget today">
        <h2>📅 Sidang Hari Ini</h2>
        <ul>
          <li>09:00 - <b>342/A/2025</b> (Ruang II)</li>
          <li>10:30 - <b>123/B/2025</b> (Ruang I)</li>
        </ul>
      </div>
    </section>
  </div>
`;

// Agar suara Indonesia muncul di semua browser, panggil getVoices() setelah onvoiceschanged
if ("speechSynthesis" in window) {
  window.speechSynthesis.onvoiceschanged = function () {
    // No action needed, voices will be loaded for panggilSidang
  };
}

// Tambahan untuk menjalankan server lokal (tidak perlu di browser)
// cd c:\Users\ASUS\Videos\eSidang\eSidang\public
// python -m http.server 8080
