document.addEventListener('DOMContentLoaded', () => {
  // ===== Video Upload =====
  const fileInput = document.getElementById('fileInput');
  const uploadStatus = document.getElementById('uploadStatus');
  const clearBtn = document.getElementById('clearLocal');

  if (fileInput && uploadStatus && clearBtn) {
    fileInput.addEventListener('change', (e) => {
      const file = e.target.files[0];
      if (!file) return;

      const key = prompt("🔑 Enter your upload key to save this video:");
      if (!key) return alert("Upload cancelled — key is required.");

      const reader = new FileReader();
      reader.onload = (e) => {
        const base64Video = e.target.result;
        let videos = JSON.parse(localStorage.getItem('videos') || '[]');
        videos.push({ name: file.name, video: base64Video, key: key, time: new Date().toLocaleString() });
        localStorage.setItem('videos', JSON.stringify(videos));

        uploadStatus.textContent = "✅ Video saved locally!";
        uploadStatus.style.color = "green";
        fileInput.value = "";
      };
      reader.readAsDataURL(file);
    });

    clearBtn.addEventListener('click', () => {
      if (confirm("🗑️ Are you sure you want to delete all local videos?")) {
        localStorage.removeItem('videos');
        uploadStatus.textContent = "All local videos deleted!";
        uploadStatus.style.color = "red";
      }
    });
  }


  // ===== Hamburger Menu =====
  const hamburger = document.querySelector('.hamburger');
  const nav = document.querySelector('nav');
  const links = document.getElementById('primary-navigation');

  if (hamburger && nav && links) {
    function openMenu() {
      nav.classList.add('expanded');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    }
    function closeMenu() {
      nav.classList.remove('expanded');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    }

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      nav.classList.contains('expanded') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if (nav.classList.contains('expanded') && !nav.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && nav.classList.contains('expanded')) closeMenu();
    });

    links.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });
  }


const loginBtn = document.getElementById('loginBtn');

// Redirect to login.html when clicked
loginBtn.addEventListener('click', () => {
  window.location.href = 'login.html';
});
});
