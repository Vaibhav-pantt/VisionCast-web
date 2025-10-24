document.addEventListener('DOMContentLoaded', () => {
  const fileInput = document.getElementById('fileInput');
  const uploadStatus = document.getElementById('uploadStatus');
  const clearBtn = document.getElementById('clearLocal');

  // When user selects a file
  fileInput.addEventListener('change', async (event) => {
    const file = event.target.files[0];
    if (!file) return;

    // Ask user for a key before uploading
    const key = prompt("🔑 Enter your upload key to save this video:");
    if (!key) {
      alert("Upload cancelled — key is required.");
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const base64Video = e.target.result;

      // Retrieve existing videos
      let videos = JSON.parse(localStorage.getItem('videos') || '[]');

      // Add new video entry
      videos.push({
        name: file.name,
        video: base64Video,
        key: key,
        time: new Date().toLocaleString()
      });

      // Save back to localStorage
      localStorage.setItem('videos', JSON.stringify(videos));

      uploadStatus.textContent = "✅ Video saved locally!";
      uploadStatus.style.color = "green";
      fileInput.value = "";
    };

    reader.readAsDataURL(file);
  });

  // Clear all videos from local storage
  clearBtn.addEventListener('click', () => {
    if (confirm("🗑️ Are you sure you want to delete all local videos?")) {
      localStorage.removeItem('videos');
      uploadStatus.textContent = "All local videos deleted!";
      uploadStatus.style.color = "red";
    }
  });
});




  // ====== Hamburger Menu ======
  const hamburger = document.querySelector('.hamburger');
  const navbar = document.querySelector('.navbar');
  const navLinks = document.querySelector('.nav-links');

  if (hamburger && navbar && navLinks) {
    const openMenu = () => {
      navbar.classList.add('expanded');
      hamburger.classList.add('active');
      hamburger.setAttribute('aria-expanded', 'true');
    };
    const closeMenu = () => {
      navbar.classList.remove('expanded');
      hamburger.classList.remove('active');
      hamburger.setAttribute('aria-expanded', 'false');
    };

    hamburger.addEventListener('click', (e) => {
      e.stopPropagation();
      navbar.classList.contains('expanded') ? closeMenu() : openMenu();
    });

    document.addEventListener('click', (e) => {
      if (!navbar.classList.contains('expanded')) return;
      if (!navbar.contains(e.target)) closeMenu();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && navbar.classList.contains('expanded')) closeMenu();
    });

    navLinks.addEventListener('click', (e) => {
      if (e.target.closest('a')) closeMenu();
    });
  }









