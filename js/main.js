// Function to load external HTML
function includeHTML(id, file, callback) {
  fetch(file)
    .then(res => res.text())
    .then(data => {
      document.getElementById(id).innerHTML = data;
      if (callback) callback();
    });
}

// Load navbar and set active link
includeHTML('navbar', "nav.html", () => {
  const current = window.location.pathname.split("/").pop();
  const links = document.querySelectorAll('#navbar a');

  links.forEach(link => {
    if (link.getAttribute("href") === current && link.getAttribute("href") != 'main2.html') {
      link.parentElement.classList.add("active");
    }
  });

  // ======= Scroll background color change =======
  const navbar = document.querySelector('nav');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      navbar.classList.remove('lg:bg-transparent');
      navbar.classList.add('lg:bg-[#ef5689]');
    } else {
      navbar.classList.remove('lg:bg-[#ef5689]');
      navbar.classList.add('lg:bg-transparent');
    }
  });

  // ======= Mobile menu toggle =======
  document.getElementById('menu-toggle').addEventListener('click', function () {
    const menu = document.getElementById('menu');
    menu.classList.toggle('top-[50px]');

    const faSolid = document.querySelector('.menu-sym');
    if (faSolid.classList.contains("fa-bars")) {
      faSolid.classList.remove('fa-bars');
      faSolid.classList.add('fa-xmark');
    } else {
      faSolid.classList.remove('fa-xmark');
      faSolid.classList.add('fa-bars');
    }
  });

  // ======= Dropdown "تطوعي معنا" functionality =======
  const toggleBtn = document.getElementById("toggleBtn");
  const dropdownMenu = document.getElementById("dropdownMenu");
  const popup = document.getElementById("popup");

  if (toggleBtn && dropdownMenu) {
    toggleBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdownMenu.classList.toggle("hidden");
    });

    window.addEventListener("click", (e) => {
      if (!toggleBtn.contains(e.target) && !dropdownMenu.contains(e.target)) {
        dropdownMenu.classList.add("hidden");
      }
    });
  }

  // ======= Popup functions (كمشرفة) =======
  window.showPopup = function () {
    popup.classList.remove("hidden");
    dropdownMenu.classList.add("hidden");
  };

  window.closePopup = function () {
    popup.classList.add("hidden");
  };

  // ======= "انضمي لنا" redirection =======
  const joinLink = document.querySelector('a[href="#"]:not([id])'); // يلقا رابط انضمي لنا
  if (joinLink && joinLink.textContent.trim() === "انضمي لنا") {
    joinLink.addEventListener("click", (e) => {
      e.preventDefault();
      window.open("https://docs.google.com/forms/d/e/1FAIpQLSfXXXXX/viewform", "_blank"); 
      // 🔹 بدّل هذا الرابط برابط Google Form ديالك الحقيقي
    });
  }

  // ======= "تبرع للمبادرة" popup =======
  const donateLink = Array.from(document.querySelectorAll('a[href="#"]'))
    .find(a => a.textContent.trim() === "تبرع للمبادرة");

  if (donateLink) {
    donateLink.addEventListener("click", (e) => {
      e.preventDefault();

      // إنشاء popup خاص بالتبرع
      const existingPopup = document.getElementById("donate-popup");
      if (existingPopup) existingPopup.remove();

      const donatePopup = document.createElement("div");
      donatePopup.id = "donate-popup";
      donatePopup.className = "fixed inset-0 bg-black/50 flex items-center justify-center z-[999999999]";
      donatePopup.innerHTML = `
        <div class="bg-white rounded-xl shadow-lg p-6 max-w-sm text-center">
          <p class="text-lg font-medium mb-4 leading-relaxed">
            كتب اللّٰه أجركم<br>
            لسنا بصدد تجهيز جوائز قريبة<br>
            ننتظر مساهماتكم الكريمة لاحقا
          </p>
          <button id="close-donate-popup" class="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-700 transition">
            إغلاق
          </button>
        </div>
      `;
      document.body.appendChild(donatePopup);

      // زر الإغلاق
      document.getElementById("close-donate-popup").addEventListener("click", () => {
        donatePopup.remove();
      });
    });
  }
});

// Load footer
includeHTML('footer', "footer.html");
