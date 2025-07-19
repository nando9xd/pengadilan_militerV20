// eSidang - Main JavaScript File
// Sidebar and Navigation Logic

window.addEventListener('DOMContentLoaded', function() {
  // Clear session data on refresh
  localStorage.removeItem('sidangList');

  // Sidebar toggle logic (respecting memory: only hide menu, keep logo area visible)
  const sidebar = document.getElementById('sidebar');
  const sidebarHamburger = document.getElementById('sidebarHamburger');
  
  if (sidebarHamburger && sidebar) {
    sidebarHamburger.addEventListener('click', function() {
      sidebar.classList.toggle('sidebar--hidden');
      this.classList.toggle('active');
    });
  }

  // Menu content mapping
  const menuItems = document.querySelectorAll('.sidebar__item');
  const menuContent = document.getElementById('menuContent');
  
  const contentMap = {
    dashboard: generateDashboardContent(),
    jadwal: `<div class='card'><h2>Jadwal Sidang</h2><p>Fitur jadwal sidang akan ditambahkan di sini.</p></div>`,
    dokumen: `<div class='card'><h2>Dokumen Sidang</h2><p>Fitur dokumen sidang akan ditambahkan di sini.</p></div>`,
    presensi: `<div class='card'><h2>Presensi Sidang</h2><p>Fitur presensi sidang akan ditambahkan di sini.</p></div>`,
    pemanggilan: `<div class='card'><h2>Pemanggilan Digital</h2><p>Fitur pemanggilan digital akan ditambahkan di sini.</p></div>`
  };

  function generateDashboardContent() {
    return `
      <header class='main-header'>
        <h1>Selamat Datang di eSidang</h1>
        <p class='subtitle'>Aplikasi Manajemen Sidang Pengadilan Modern</p>
      </header>
      ${document.querySelector('.cards') ? document.querySelector('.cards').outerHTML : ''}
    `;
  }

  function setActiveMenu(menu) {
    if (!menuContent) return;
    
    // Remove active class from all menu items
    menuItems.forEach(item => item.classList.remove('active'));
    
    // Add active class to selected menu
    menuItems.forEach(item => {
      if (item.getAttribute('data-menu') === menu) {
        item.classList.add('active');
      }
    });

    // Update content
    if (contentMap[menu]) {
      menuContent.innerHTML = contentMap[menu];
    } else {
      menuContent.innerHTML = '<div class="card"><p>Menu tidak ditemukan.</p></div>';
    }
  }

  // Add click listeners to menu items
  menuItems.forEach(item => {
    item.addEventListener('click', function() {
      const menuType = this.getAttribute('data-menu');
      if (menuType) {
        setActiveMenu(menuType);
      }
    });
  });

  // Initialize with dashboard
  setActiveMenu('dashboard');
});

// Sidang Data Management Functions
function getSidangData() {
  try {
    const data = localStorage.getItem('sidangList');
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error('Error getting sidang data:', error);
    return [];
  }
}

function saveSidangData(data) {
  try {
    localStorage.setItem('sidangList', JSON.stringify(data));
  } catch (error) {
    console.error('Error saving sidang data:', error);
  }
}

function renderSidangTable() {
  const tbody = document.getElementById('tabelSidangBody');
  const data = getSidangData();
  
  if (!tbody) return;
  
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#888;font-style:italic;">Belum ada data sidang.</td></tr>`;
  } else {
    tbody.innerHTML = data.map((s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${s.nama}</td>
        <td>${s.noPerkara}</td>
        <td>${s.jam}</td>
        <td>${s.ruang || 'Ruang Sidang Utama'}</td>
      </tr>
    `).join('');
  }
}

function renderSidangTableWithExtra(data) {
  const tbody = document.getElementById('tabelSidangBody');
  
  if (!tbody) return;
  
  if (data.length === 0) {
    tbody.innerHTML = `<tr><td colspan="5" style="text-align:center;color:#888;font-style:italic;">Belum ada data sidang.</td></tr>`;
  } else {
    tbody.innerHTML = data.map((s, i) => `
      <tr>
        <td>${i + 1}</td>
        <td>${s.nama}</td>
        <td>${s.noPerkara || ''}</td>
        <td>${s.jam || ''}</td>
        <td>${s.ruang || ''}</td>
      </tr>
    `).join('');
  }
}

// Form handling and notifications
document.addEventListener('DOMContentLoaded', function() {
  localStorage.removeItem('sidangList');
  renderSidangTable();

  const form = document.getElementById('sidangForm');
  const notif = document.getElementById('notifSidang');
  const inputNama = document.getElementById('inputNama');
  let dummyRowAdded = false;

  // Real-time preview as user types
  if (inputNama) {
    inputNama.addEventListener('input', function() {
      const nama = inputNama.value.trim();
      let data = getSidangData();
      
      // Remove existing dummy row
      if (dummyRowAdded) {
        data = data.filter(s => !s._dummySidang);
        dummyRowAdded = false;
      }
      
      // Add new dummy row if name is entered
      if (nama) {
        data.push({
          nama: nama,
          noPerkara: '',
          jam: '',
          ruang: '',
          _dummySidang: true
        });
        dummyRowAdded = true;
      }
      
      renderSidangTableWithExtra(data);
    });
  }

  // Form submission
  if (form) {
    form.addEventListener('submit', function(e) {
      e.preventDefault();
      
      const nama = document.getElementById('inputNama')?.value.trim();
      const noPerkara = document.getElementById('inputPerkara')?.value.trim();
      const jam = document.getElementById('inputJam')?.value;
      
      if (!nama || !noPerkara || !jam) {
        showNotification('Mohon lengkapi semua field!', 'error');
        return;
      }
      
      const ruang = 'Ruang Sidang Utama';
      let data = getSidangData();
      
      // Update dummy row or add new entry
      const dummyIdx = data.findIndex(s => s._dummySidang);
      if (dummyIdx !== -1) {
        data[dummyIdx] = { nama, noPerkara, jam, ruang };
      } else {
        data.push({ nama, noPerkara, jam, ruang });
      }
      
      saveSidangData(data);
      renderSidangTable();
      form.reset();
      dummyRowAdded = false;
      
      showNotification('Data sidang berhasil ditambahkan!', 'success');
    });
  }

  // Excel download functionality
  const btnExcel = document.getElementById('downloadExcel');
  if (btnExcel) {
    btnExcel.addEventListener('click', function() {
      const data = getSidangData();
      
      if (data.length === 0) {
        showNotification('Belum ada data sidang untuk diunduh!', 'warning');
        return;
      }
      
      try {
        const ws = XLSX.utils.json_to_sheet(data.map((s, i) => ({
          'No': i + 1,
          'Nama Terpidana': s.nama,
          'Nomor Perkara': s.noPerkara,
          'Jam': s.jam,
          'Ruang': s.ruang
        })));
        
        const wb = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(wb, ws, 'Sidang');
        XLSX.writeFile(wb, 'data_sidang.xlsx');
        
        showNotification('File Excel berhasil diunduh!', 'success');
      } catch (error) {
        console.error('Error downloading Excel:', error);
        showNotification('Gagal mengunduh file Excel!', 'error');
      }
    });
  }
});

// Notification system
function showNotification(message, type = 'info') {
  const notif = document.getElementById('notifSidang');
  if (!notif) return;
  
  notif.textContent = message;
  notif.className = `notification ${type}`;
  notif.classList.add('show');
  
  setTimeout(() => {
    notif.classList.remove('show');
  }, 3000);
}
