// Auto-trigger mountain rise animation on load
document.addEventListener('DOMContentLoaded', () => {
    const logo = document.querySelector('.logo-3d');
    setTimeout(() => logo.classList.add('animate'), 500);
    
    // Mouse tilt interaction
    const container = document.querySelector('.logo-3d-container');
    container.addEventListener('mousemove', (e) => {
        const rect = container.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        const rotateY = (x - centerX) / 20;
        const rotateX = (y - centerY) / -20;
        
        logo.style.transform = `
            translateZ(80px) 
            rotateX(${rotateX}deg) 
            rotateY(${rotateY}deg)
        `;
    });
    
    container.addEventListener('mouseleave', () => {
        logo.style.transform = 'translateZ(80px) rotateX(10deg) rotateY(0deg)';
    });
});

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

let isHindi = false;

const translations = {
  // Hero
  "logo-3d-title": { en: "HIMALAY DARSHAN", hi: "हिमालय दर्शन" },
  "subtitle": { en: "Social Service Organization", hi: "सामाजिक सेवा संस्थान" },
  "logo-subtitle": { en: "Strength • Resilience • Hope", hi: "सेवा • समर्पण• आशा" },

  // About
  "about-title": { en: "About Himalay Darshan", hi: "हिमालय दर्शन सामाजिक सेवा संस्थान " },
  "about-p1": { 
    en: "Founded in 2019, Himalay Darshan is dedicated to addressing discrimination, social challenges, and human welfare issues.",
    hi: "30 सितंबर 2025 को स्थापित हिमालय दर्शन सामाजिक सेवा संस्थान समाज में भारतीय संस्कृति, मानव मूल्य, स्वास्थ्य,शिक्षा, गरीब महिला एवं बच्चों के सर्वांगीण विकास एवं पर्यावरण संरक्षण मृदा संरक्षण एवं प्राकृतिक एवं मानव जनित आपदा से संबंधित जानकारी एवं बचाव राहत कार्य करने तथा सकारात्मक पहलू और सार्थक कार्यक्रमों के माध्यम से जीवन में बदलाव लाने सामाजिक चुनौतियों का सामना करने और मानव कल्याण को बढ़ावा देने के लिए प्रेरित / कार्य करता है"
  },
  "about-p2": { 
    en: "Guided by integrity and inspired by the enduring strength of the Himalayas, we provide structured support, awareness programs, and empowerment resources for individuals facing social inequities and personal struggles.",
    hi: "सत्यनिष्ठा द्वारा मार्गदर्शित और हिमालय की अटल शक्ति से प्रेरित, हम सामाजिक असमानताओं और व्यक्तिगत संघर्षों का सामना करने वाले व्यक्तियों के लिए संरचित समर्थन, जागरूकता कार्यक्रम और सशक्तिकरण संसाधन प्रदान करते हैं।" 
  },
  "about-p3": { 
    en: "Just as the mountains stand firm against every storm, Himalay Darshan stands with people in their toughest moments—helping them find clarity, resilience, and hope.",
    hi: "जैसे पहाड़ हर तूफान का सामना करते हैं, हिमालय दर्शन लोगों के सबसे कठिन समय में उनके साथ खड़ा रहता है—उन्हें स्पष्टता, सहनशीलता और आशा खोजने में मदद करता है।" 
  },

  // User Info
  "user-info-title": { en: "👤 User Information", hi: "👤 उपयोगकर्ता जानकारी" },
  "label-fullname": { en: "Full Name", hi: "पूरा नाम" },
  "label-email": { en: "Email", hi: "ईमेल" },
  "label-phone": { en: "Phone", hi: "फ़ोन" },
  "label-country": { en: "Country", hi: "देश" },
  "label-role": { en: "Account Type", hi: "खाता प्रकार" },

  // Footer
  "footer-doodle-brand": { en: "VisionCast", hi: "विजनकास्ट" },
  "footer-doodle-rights": { en: "All rights are reserved", hi: "सर्वाधिकार सुरक्षित हैं" },
  "footer-doodle-team": { en: "by the VisionCast Team", hi: "VisionCast टीम द्वारा" },

  //latest news
   "trusted-users-text": { en: "Plus 253 Trusted users!", hi: "253+ विश्वसनीय उपयोगकर्ता!" },
  "hero-title": { en: "Latest <br><em>Disaster Updates</em>", hi: "नवीनतम <br><em>आपदा अपडेट्स</em>" },
  "hero-subtitle": { 
    en: "Stay informed about recent natural disasters, emergencies, and critical alerts. Get timely updates to know what’s happening and how you can stay safe.", 
    hi: "हाल की प्राकृतिक आपदाओं, आपात स्थितियों और महत्वपूर्ण अलर्ट के बारे में सूचित रहें। समय पर अपडेट पाएं और जानें कि क्या हो रहा है और कैसे सुरक्षित रहें।"
  },
  "explore-btn": { en: "Explore", hi: "अन्वेषण करें" },
  "product-text": { 
    en: "DEAR ME<br>Sacred Secret<br>ILLUMINATING SAFFRON SERUM", 
    hi: "डियर मी<br>पवित्र रहस्य<br>प्रकाशमान केसर सीरम"
  },   "uploaded-title": { en: "Uploaded by Admin", hi: "एडमिन द्वारा अपलोड किया गया" },
    "uploaded-description": { 
        en: "All videos are verified and uploaded by the VisionCast Admin Team — your trusted source for content.", 
        hi: "सभी वीडियो  हिमालय दर्शन एडमिन टीम द्वारा सत्यापित और अपलोड किए जाते हैं — आपका विश्वसनीय स्रोत।" 
    },
        "team-title": {
        en: "Meet the Minds Behind HIMALAYA DARSHAN<br>social service organization",
        hi: "हिमालय दर्शन के पीछे के विचारशील लोग<br>सामाजिक सेवा संस्थान"
    },
    "team-description": {
        en: "The creative individuals who bring life to our language learning platform.",
        hi: "वे रचनात्मक व्यक्ति जो हमारे भाषा सीखने वाले प्लेटफ़ॉर्म में जीवन लाते हैं।"
    },
    "team-member": {
        en: "MUNA JOSHI",
        hi: "मुणा जोशी"
    },
    "team-role": {
        en: "Founder of",
        hi: "संस्थापक"
    },
    "org-info": {
        en: "HIMALAYA DARSHAN",
        hi: "हिमालय दर्शन सामाजिक सेवा संस्थान"
    },
    "org-subtitle": {
        en: "social service organization",
        hi: "सामाजिक सेवा संस्थान"
    }
};



// Language toggle with font support
document.getElementById("langBtn").addEventListener("click", () => {
  isHindi = !isHindi;
  const lang = isHindi ? "hi" : "en";

  for (const id in translations) {
    const elem = document.getElementById(id);
    if (elem) {
        elem.innerHTML = translations[id][lang];

      // Apply font classes
      if (lang === "hi") {
        elem.classList.add("hindi-text");
        elem.classList.remove("english-text");
      } else {
        elem.classList.add("english-text");
        elem.classList.remove("hindi-text");
      }
    }
  }
});

document.querySelectorAll(".user").forEach(user => {

  user.addEventListener("mouseenter", () => {
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    tooltip.innerHTML = `<strong>${user.dataset.name}</strong><br>${user.dataset.role}`;
    document.body.appendChild(tooltip);
    user._tooltip = tooltip;
  });

  user.addEventListener("mousemove", (e) => {
    const tooltip = user._tooltip;
    if (!tooltip) return;

    // Smooth mouse follow 
    const x = e.pageX;
    const y = e.pageY - 60;

    tooltip.style.left = x + "px";
    tooltip.style.top = y + "px";
    
    tooltip.style.opacity = 1;
    tooltip.style.transform = "translateY(0px) scale(1) rotateX(0deg)";
  });

  user.addEventListener("mouseleave", () => {
    const tooltip = user._tooltip;
    if (!tooltip) return;

    tooltip.style.opacity = 0;
    tooltip.style.transform = "translateY(12px) scale(0.85) rotateX(25deg)";
    
    setTimeout(() => tooltip.remove(), 300);
  });

});

const card = document.getElementById("about-card");
const section = document.getElementById("about");

function updateScrollAnimation() {
  const rect = section.getBoundingClientRect();
  const viewportHeight = window.innerHeight;

  // MOBILE FIX: Increase range for small screens
  const mobile = window.innerWidth <= 768;

  // Detect how much of the section is visible
  let progress = 0;

  if (rect.top < viewportHeight && rect.bottom > 0) {
    const visible = Math.min(viewportHeight, rect.bottom) - Math.max(0, rect.top);
    const total = Math.min(rect.height, viewportHeight);

    progress = visible / total;
  }

  // Clamp 0–1
  progress = Math.max(0, Math.min(1, progress));

  // Animation values — tuned for mobile
  const rotateX = mobile
    ? 15 * (1 - progress)   // smoother 15° → 0°
    : 20 * (1 - progress);  // desktop 20° → 0°

  const scale = mobile
    ? 0.85 + progress * 0.10   // 0.85 → 0.95 on mobile (better readability)
    : 1.05 - progress * 0.05;  // desktop 1.05 → 1

  const translateY = mobile
    ? -10 * progress           // -10px max on mobile
    : -30 * progress;          // -30px on desktop

  card.style.transform = `
    translateY(${translateY}px)
    scale(${scale})
    rotateX(${rotateX}deg)
  `;
}

// Smooth handling
window.addEventListener("scroll", updateScrollAnimation);
window.addEventListener("resize", updateScrollAnimation);
updateScrollAnimation();



const track = document.querySelector('.events-track');
const carousel = document.querySelector('.events-carousel');
let scrollSpeed = 1; // pixels per frame
let autoScroll;

function startAutoScroll() {
  autoScroll = requestAnimationFrame(step);
}

function step() {
  carousel.scrollLeft += scrollSpeed;

  // Reset scroll for infinite effect
  if (carousel.scrollLeft >= track.scrollWidth / 2) {
    carousel.scrollLeft = 0;
  }

  autoScroll = requestAnimationFrame(step);
}

// Stop auto-scroll when user interacts
carousel.addEventListener('mouseenter', () => cancelAnimationFrame(autoScroll));
carousel.addEventListener('mouseleave', startAutoScroll);
carousel.addEventListener('mousedown', () => cancelAnimationFrame(autoScroll));
carousel.addEventListener('mouseup', startAutoScroll);

// Initialize
startAutoScroll();


const modal = document.getElementById("team-modal");
const closeBtn = document.querySelector(".close-modal");

function openModal(data) {
  // LEFT SIDE
  const imgEl = document.getElementById("modal-img");
  if (data.img) imgEl.src = data.img;
  else imgEl.removeAttribute('src');

  // social links (defensive)
  const fb = document.getElementById("modal-facebook");
  const ig = document.getElementById("modal-instagram");
  const li = document.getElementById("modal-linkedin");
  if (fb) fb.href = data.facebook || "#";
  if (ig) ig.href = data.instagram || "#";
  if (li) li.href = data.linkedin || "#";

  // RIGHT SIDE (name fallback to fullname)
  document.getElementById("modal-name").textContent = data.name || data.fullname || "";
  document.getElementById("modal-fullname").textContent = data.fullname || "";
  document.getElementById("modal-role").textContent = data.role || "";

  document.getElementById("modal-email").textContent = data.email || "";
  document.getElementById("modal-phone").textContent = data.phone || "";
  document.getElementById("modal-location").textContent = data.location || "";
  document.getElementById("modal-education").textContent = data.education || "";

  // BIO (typewriter — simple restart by toggling class)
  const bio = document.getElementById("modal-bio");
  bio.textContent = data.bio || "";
  // restart CSS typewriter if present
  bio.classList.remove("typewriter");
  void bio.offsetWidth;
  bio.classList.add("typewriter");

  // show modal (use flex-like centering)
  modal.style.display = "flex";
  modal.style.alignItems = "center";
  modal.style.justifyContent = "center";
}

/* TEAM DATA */
const teamMembers = {
  1: {
    img: "OIP (2).jpeg",
    fullname: "Mr. Muna Joshi",
    role: "Founder & CEO",
    email: "muna.joshi@example.com",
    phone: "+91 99999 00001",
    location: "Rishikesh, Uttarakhand",
    education: "Master's in Social Work (MSW)",
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/munajoshi",
    bio: "A visionary leader dedicated to social upliftment and women empowerment."
  },
  2: {
    img: "OIP (2).jpeg",
    fullname: "Mr. Mukul Pant",
    role: "Project Coordinator",
    email: "mukul.pant@example.com",
    phone: "+91 99999 00002",
    location: "Dehradun, Uttarakhand",
    education: "Bachelor's in Project Management",
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/mukulpant",
    bio: "Manages on-ground projects ensuring smooth execution and maximum impact."
  },
  3: {
    img: "OIP (2).jpeg",
    fullname: "Ms. Riya Sharma",
    role: "Content Specialist",
    email: "riya.sharma@example.com",
    phone: "+91 99999 00003",
    location: "Haridwar, Uttarakhand",
    education: "BA in Mass Communication",
    facebook: "#",
    instagram: "#",
    linkedin: "https://linkedin.com/in/riyasharma",
    bio: "Creates creative and educational content for community awareness."
  }
};

/* Open modal on card click */
document.querySelectorAll(".team-card").forEach(card => {
  card.addEventListener("click", () => {
    const id = card.getAttribute("data-member");
    if (teamMembers[id]) openModal(teamMembers[id]);
  });
});

/* Close modal */
closeBtn.addEventListener("click", () => {
  modal.style.display = "none";
});

/* Close when clicking outside content */
window.addEventListener("click", (e) => {
  if (e.target === modal) {
    modal.style.display = "none";
  }
});

/* keyboard esc to close */
window.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    modal.style.display = "none";
  }
});



