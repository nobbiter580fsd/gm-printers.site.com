/* ============================================================
   GM Graphics & Printers — Business Cards page
   ============================================================ */

document.addEventListener('DOMContentLoaded', function () {

  var WA_NUMBER = '923287597901';

  /* ---------- WhatsApp link builder ---------- */
  function waLink(message) {
    return 'https://wa.me/' + WA_NUMBER + '?text=' + encodeURIComponent(message);
  }

  /* ---------- Elements ---------- */
  var searchInput    = document.getElementById('searchInput');
  var categoryFilter = document.getElementById('categoryFilter');
  var productCards   = document.querySelectorAll('.product-card');
  var emptyMessage   = document.getElementById('emptyMessage');
  var generalWhatsApp = document.getElementById('generalWhatsApp');

  /* ---------- Search + Category filter ---------- */
  function filterProducts() {
    var searchTerm = (searchInput.value || '').toLowerCase().trim();
    var selectedCategory = (categoryFilter.value || 'all').toLowerCase();
    var visibleCount = 0;

    productCards.forEach(function (card) {
      var tagEl  = card.querySelector('.tag');
      var titleEl = card.querySelector('.product-info h2');
      var descEl  = card.querySelector('.product-info p');

      var tagText   = tagEl   ? tagEl.textContent.toLowerCase()   : '';
      var titleText = titleEl ? titleEl.textContent.toLowerCase() : '';
      var descText  = descEl  ? descEl.textContent.toLowerCase()  : '';
      var combinedText = tagText + ' ' + titleText + ' ' + descText;

      var matchesSearch = searchTerm === '' || combinedText.indexOf(searchTerm) !== -1;

      var matchesCategory = true;
      if (selectedCategory !== 'all') {
        matchesCategory =
          tagText.indexOf(selectedCategory)   !== -1 ||
          titleText.indexOf(selectedCategory) !== -1 ||
          descText.indexOf(selectedCategory)  !== -1;
      }

      if (matchesSearch && matchesCategory) {
        card.style.display = '';
        visibleCount++;
      } else {
        card.style.display = 'none';
      }
    });

    if (emptyMessage) {
      emptyMessage.hidden = (visibleCount !== 0);
    }
  }

  if (searchInput)    searchInput.addEventListener('input',  filterProducts);
  if (categoryFilter) categoryFilter.addEventListener('change', filterProducts);

  /* ---------- Order buttons → WhatsApp with product name & price ---------- */
  document.querySelectorAll('.order-btn.whatsapp-btn').forEach(function (btn) {
    var product = btn.getAttribute('data-product') || 'Business Card';
    var price   = btn.getAttribute('data-price')   || '';
    var msg = 'Assalam-o-Alaikum, I want to order: ' + product +
              (price ? ' (' + price + ')' : '') +
              '. Please share details.';
    btn.setAttribute('href', waLink(msg));
    btn.setAttribute('target', '_blank');
    btn.setAttribute('rel', 'noopener noreferrer');
  });

  /* ---------- General WhatsApp button ---------- */
  if (generalWhatsApp) {
    generalWhatsApp.setAttribute(
      'href',
      waLink('Assalam-o-Alaikum, I want to order business cards. Please guide me.')
    );
  }

  /* ---------- Floating WhatsApp + footer WhatsApp link ---------- */
  document.querySelectorAll('[data-wa]').forEach(function (el) {
    var msg = el.getAttribute('data-wa') || 'Assalam-o-Alaikum, I need printing services.';
    el.setAttribute('href', waLink(msg));
    el.setAttribute('target', '_blank');
    el.setAttribute('rel', 'noopener noreferrer');
  });

  /* ---------- Mobile hamburger menu (UPDATED & ROBUST) ---------- */
  // HTML mein <button class="menu"> ya <button class="menu-btn"> jo bhi ho, yeh pakar lega
  var menuBtn  = document.querySelector('.menu') || document.querySelector('.menu-btn') || document.querySelector('.hamburger');
  var navLinks = document.querySelector('.navlinks');

  if (menuBtn && navLinks) {
    // Menu button par click event
    menuBtn.addEventListener('click', function (e) {
      e.preventDefault(); // Default behavior roke
      e.stopPropagation(); // Event bubble roke
      
      var isOpen = navLinks.classList.toggle('open');
      menuBtn.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
      
      // Icon change karein (☰ se ✕)
      menuBtn.textContent = isOpen ? '✕' : '☰';
    });

    // Jab koi nav link click ho toh menu band ho jaye
    navLinks.querySelectorAll('a').forEach(function (link) {
      link.addEventListener('click', function () {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      });
    });

    // Agar user menu ke bahar (bahar kisi bhi jaga) click kare toh menu band ho jaye
    document.addEventListener('click', function (e) {
      if (navLinks.classList.contains('open') &&
          !navLinks.contains(e.target) &&
          !menuBtn.contains(e.target)) {
        navLinks.classList.remove('open');
        menuBtn.setAttribute('aria-expanded', 'false');
        menuBtn.textContent = '☰';
      }
    });
  } else {
    console.warn("Hamburger Menu: Button ya NavLinks nahi mile. HTML classes check karein.");
  }

});