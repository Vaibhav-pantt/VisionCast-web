document.addEventListener('DOMContentLoaded', () => {
  const feed = document.getElementById('feed');

  function loadVideos() {
    const videos = JSON.parse(localStorage.getItem('videos') || '[]');
    feed.innerHTML = "";

    if (videos.length === 0) {
      feed.innerHTML = `<p style="text-align:center; color:gray;">No videos uploaded yet 🎥</p>`;
      return;
    }

    // Ask for key to view
    const userKey = prompt("🔑 Enter your key to view your videos:");
    if (!userKey) {
      feed.innerHTML = `<p style="text-align:center; color:red;">No key entered. Access denied.</p>`;
      return;
    }

    // Filter videos for this key
    const filteredVideos = videos.filter(v => v.key === userKey);

    if (filteredVideos.length === 0) {
      feed.innerHTML = `<p style="text-align:center; color:gray;">No videos found for this key 🚫</p>`;
      return;
    }

    filteredVideos.forEach(video => {
      const card = document.createElement('div');
      card.classList.add('card');
      card.innerHTML = `
        <strong style="color:#e50914; display:block; margin-bottom:10px;">${video.name}</strong>
        <video src="${video.video}" controls width="100%" style="border-radius:10px;"></video>
      `;
      feed.appendChild(card);
    });
  }

  loadVideos();
});
document.addEventListener('DOMContentLoaded', () => {
  const videos = document.querySelectorAll('.video-item');

  // Load saved ratings from localStorage
  const savedRatings = JSON.parse(localStorage.getItem('videoRatings') || '{}');

  videos.forEach(video => {
    const videoId = video.getAttribute('data-video-id');
    const stars = video.querySelectorAll('.star');

    // Highlight previously saved rating
    const savedRating = savedRatings[videoId];
    if (savedRating) highlightStars(stars, savedRating);

    // Add event listeners to each star
    stars.forEach(star => {
      star.addEventListener('click', () => {
        const ratingValue = parseInt(star.getAttribute('data-value'));

        // Save rating in localStorage
        savedRatings[videoId] = ratingValue;
        localStorage.setItem('videoRatings', JSON.stringify(savedRatings));

        highlightStars(stars, ratingValue);

        // Optional small animation or message
        showMessage(video, `⭐ You rated this ${ratingValue}/5`);
      });

      // Hover effect preview
      star.addEventListener('mouseover', () => {
        const hoverValue = parseInt(star.getAttribute('data-value'));
        highlightStars(stars, hoverValue);
      });

      // Reset to saved rating on mouse leave
      star.addEventListener('mouseleave', () => {
        const savedValue = savedRatings[videoId] || 0;
        highlightStars(stars, savedValue);
      });
    });
  });

  // Highlight stars up to a given value
  function highlightStars(stars, value) {
    stars.forEach(star => {
      const starValue = parseInt(star.getAttribute('data-value'));
      star.classList.toggle('active', starValue <= value);
    });
  }

  // Optional helper to show a small confirmation message
  function showMessage(video, text) {
    let msg = video.querySelector('.rating-message');
    if (!msg) {
      msg = document.createElement('div');
      msg.className = 'rating-message';
      video.appendChild(msg);
    }
    msg.textContent = text;
    msg.style.opacity = 1;
    setTimeout(() => msg.style.opacity = 0, 2000);
  }
});

  // ================== Hamburger Menu ==================
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






