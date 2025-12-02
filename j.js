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
  "logo-subtitle": { en: "Strength • Resilience • Hope", hi: "शक्ति • सहनशीलता • आशा" },

  // About
  "about-title": { en: "About Himalay Darshan", hi: "हिमालय दर्शन के बारे में" },
  "about-p1": { 
    en: "Founded in 2019, Himalay Darshan is dedicated to addressing discrimination, social challenges, and human welfare issues.",
    hi: "2019 में स्थापित, हिमालय दर्शन भेदभाव, सामाजिक चुनौतियों और मानव कल्याण मुद्दों को हल करने के लिए समर्पित है।" 
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






