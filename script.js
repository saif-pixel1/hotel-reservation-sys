/**
 * HOTELIER - LUXURY HOTEL & RESORT RESERVATION SYSTEM
 * Pure Vanilla JavaScript Architecture
 * Features: Booking Engine, Conflict Prevention, Dynamic Pricing,
 * Admin Dashboard, AI Concierge, Leaflet Map, Wishlist, Reviews
 */

// ==========================================
// 1. GLOBAL STATE & CONFIGURATION
// ==========================================
const HOTEL_DATA = {
  currency: 'INR',
  currencyRates: {
    INR: { symbol: '₹', rate: 83.5, name: 'Indian Rupee' },
    USD: { symbol: '$', rate: 1.0, name: 'US Dollar' },
    EUR: { symbol: '€', rate: 0.92, name: 'Euro' },
    GBP: { symbol: '£', rate: 0.79, name: 'British Pound' },
  },
  pricingMultiplier: 1.0, // Dynamic pricing multiplier
  rooms: [
    {
      id: 'urban-cozy-flat',
      name: 'Urban Cozy Studio Flat',
      category: 'flat',
      basePriceUSD: 45,
      priceUSD: 45,
      image: '/images/flat-cozy.jpg',
      capacity: '2 Guests',
      capacityNum: 2,
      size: '420 sq ft',
      bed: 'Queen Bed + Kitchenette',
      badge: 'Budget Friendly Flat',
      rating: 4.86,
      status: 'Available',
      desc: 'Modern and highly affordable studio apartment featuring an induction kitchenette, breakfast dining bar, rapid fiber Wi-Fi, and refreshing rain shower.',
      amenities: ['Induction Kitchenette', 'High-Speed Wi-Fi', 'Smart TV', 'Air Conditioning']
    },
    {
      id: 'sunset-1bhk-flat',
      name: 'Sunset Bay 1-BHK Serviced Flat',
      category: 'flat',
      basePriceUSD: 75,
      priceUSD: 75,
      image: '/images/flat-1bhk.jpg',
      capacity: '3 Guests',
      capacityNum: 3,
      size: '650 sq ft',
      bed: 'King Bedroom + Sofa Bed',
      badge: 'Value 1-BHK Flat',
      rating: 4.89,
      status: 'Available',
      desc: 'Bright and airy one-bedroom apartment with a dedicated living salon, dining counter, fully equipped kitchen with microwave and fridge, and sunset balcony.',
      amenities: ['Full Kitchen', 'Private Balcony', 'Sofa Bed', 'Washing Machine']
    },
    {
      id: 'serene-garden-flat',
      name: 'Serene Garden 2-BHK Family Flat',
      category: 'flat',
      basePriceUSD: 110,
      priceUSD: 110,
      image: '/images/flat-garden.jpg',
      capacity: '5 Guests',
      capacityNum: 5,
      size: '920 sq ft',
      bed: '2 Queen Bedrooms + Kitchen',
      badge: 'Family 2-BHK Flat',
      rating: 4.91,
      status: 'Available',
      desc: 'Spacious ground-floor family flat with lush lawn garden views, 4-seater dining table, full chef-ready kitchen, laundry suite, and children play corner.',
      amenities: ['2 Bedrooms', 'Garden Patio', 'Family Kitchen', 'Complimentary Parking']
    },
    {
      id: 'seaside-executive-flat',
      name: 'Seaside Executive 2-BHK Flat',
      category: 'flat',
      basePriceUSD: 180,
      priceUSD: 180,
      image: '/images/flat-executive.jpg',
      capacity: '4 Guests',
      capacityNum: 4,
      size: '1,150 sq ft',
      bed: '2 King Bedrooms + Gourmet Kitchen',
      badge: 'Executive 2-BHK Flat',
      rating: 4.93,
      status: 'Available',
      desc: 'Designer apartment with floor-to-ceiling windows, modern granite kitchen, ergonomic workstation, master soaking tub, and sweeping coastal views.',
      amenities: ['Granite Kitchen', 'Dedicated Workspace', 'Ocean Balcony', 'Washer / Dryer']
    },
    {
      id: 'oceanfront-duplex-flat',
      name: 'Royal Oceanfront Duplex Flat',
      category: 'flat',
      basePriceUSD: 1100,
      priceUSD: 1100,
      image: '/images/flat-1.jpg',
      capacity: '6 Guests',
      capacityNum: 6,
      size: '2,100 sq ft',
      bed: '3 King Bedrooms + Chef Kitchen',
      badge: 'Duplex Flat Residence',
      rating: 4.97,
      status: 'Available',
      desc: 'Multi-level residential duplex flat featuring a chef designer kitchen, marble breakfast island, double-height panoramic ocean living room, and private sea-facing terrace.',
      amenities: ['Full Gourmet Kitchen', 'Private Living Lounge', 'Dedicated Butler', 'Executive Sky Lounge Pass']
    },
    {
      id: 'grand-marina-flat',
      name: 'Grand Marina Penthouse Flat',
      category: 'flat',
      basePriceUSD: 980,
      priceUSD: 980,
      image: '/images/flat-2.jpg',
      capacity: '4 Guests',
      capacityNum: 4,
      size: '1,750 sq ft',
      bed: '2 King Bedrooms + Kitchenette',
      badge: 'Serviced Residence Flat',
      rating: 4.94,
      status: 'Available',
      desc: 'Sprawling private serviced flat with custom Italian cabinetry, gourmet kitchenette, open dining pavilion, private sea-view veranda, and en-suite marble spa bathrooms.',
      amenities: ['Designer Kitchenette', 'Sea-View Veranda', 'Dedicated Work Suite', 'Private In-Flat Dining']
    },
    {
      id: 'sky-lounge-suite',
      name: 'Celestial VIP Sky Lounge & Suite',
      category: 'lounge',
      basePriceUSD: 890,
      priceUSD: 890,
      image: '/images/lounge-1.jpg',
      capacity: '3 Guests',
      capacityNum: 3,
      size: '1,100 sq ft',
      bed: 'King Bed + Velvet Salon Bar',
      badge: 'VIP Sky Lounge Suite',
      rating: 4.96,
      status: 'Available',
      desc: 'Direct private lift access to our 51st floor Celestial Sky Lounge with private sommelier bar, velvet salon seating, panoramic twilight bay vistas, and all-day curated tapas service.',
      amenities: ['VIP Sky Lounge Access', 'Private Sommelier Bar', 'Complimentary High Tea & Tapas', 'Fast-Track Check-In & Butler']
    },
    {
      id: 'imperial-club-lounge',
      name: 'Imperial Club Lounge Residence',
      category: 'lounge',
      basePriceUSD: 720,
      priceUSD: 720,
      image: '/images/lounge-2.jpg',
      capacity: '4 Guests',
      capacityNum: 4,
      size: '1,350 sq ft',
      bed: 'King Bed + Private Library Salon',
      badge: 'Private Club Lounge',
      rating: 4.93,
      status: 'Available',
      desc: 'An exclusive club lounge residence featuring rich mahogany millwork, private cocktail mixologist service, boardroom lounge library, and all-inclusive club dining privileges.',
      amenities: ['24/7 Club Lounge Access', 'Sommelier Wine Tastings', 'Private Meeting Salon', 'Evening Artisan Cocktails']
    },
    {
      id: 'imperial-penthouse',
      name: 'Imperial Oceanfront Penthouse',
      category: 'penthouse',
      basePriceUSD: 1250,
      priceUSD: 1250,
      image: '/images/room-1.jpg',
      capacity: '4 Guests',
      capacityNum: 4,
      size: '1,450 sq ft',
      bed: 'King Bed',
      badge: 'Signature Suite',
      rating: 4.98,
      status: 'Available',
      desc: 'Perched on the highest floor with expansive wraparound panoramic ocean vistas, private infinity dip pool, and 24-hour dedicated butler service.',
      amenities: ['Private Infinity Pool', '24/7 Butler Service', 'Hermès Toiletries', 'Executive Sky Lounge Access']
    },
    {
      id: 'royal-horizon-villa',
      name: 'Royal Horizon Beach Villa',
      category: 'villa',
      basePriceUSD: 950,
      priceUSD: 950,
      image: '/images/room-2.jpg',
      capacity: '4 Guests',
      capacityNum: 4,
      size: '1,200 sq ft',
      bed: 'King Bed',
      badge: 'Beachfront',
      rating: 4.95,
      status: 'Available',
      desc: 'Direct private pathway to powdery white sands, sun-drenched outdoor terrace, marble soaking tub, and bespoke sunrise dining pavilion.',
      amenities: ['Direct Beach Access', 'Private Sun Deck', 'Outdoor Stone Tub', 'Daily Gourmet Breakfast']
    },
    {
      id: 'presidential-garden',
      name: 'Presidential Garden Residence',
      category: 'villa',
      basePriceUSD: 780,
      priceUSD: 780,
      image: '/images/room-3.jpg',
      capacity: '3 Guests',
      capacityNum: 3,
      size: '980 sq ft',
      bed: 'King Bed',
      badge: 'Botanical Oasis',
      rating: 4.92,
      status: 'Available',
      desc: 'Surrounded by lush tropical flora, open-concept living suite with bespoke teak furnishings, rain shower, and secluded patio jacuzzi.',
      amenities: ['Private Jacuzzi', 'Botanical Garden View', 'Nespresso Atelier', 'Evening Turn-down Service']
    },
    {
      id: 'serenity-wellness',
      name: 'Serenity Wellness Suite',
      category: 'executive',
      basePriceUSD: 620,
      priceUSD: 620,
      image: '/images/room-4.jpg',
      capacity: '2 Guests',
      capacityNum: 2,
      size: '850 sq ft',
      bed: 'King Bed',
      badge: 'Spa & Wellness',
      rating: 4.90,
      status: 'Available',
      desc: 'Crafted for restorative relaxation featuring organic linens, en-suite aromatherapy shower, sea-view balcony cabana, and herbal tea bar.',
      amenities: ['Aromatherapy Shower', 'Sea-View Cabana', 'Daily Yoga Pass', 'Custom Pillow Menu']
    },
    {
      id: 'executive-grand',
      name: 'Executive Grand Suite',
      category: 'executive',
      basePriceUSD: 490,
      priceUSD: 490,
      image: '/images/room-5.jpg',
      capacity: '2 Guests',
      capacityNum: 2,
      size: '750 sq ft',
      bed: 'Queen Bed',
      badge: 'Sunset Terrace',
      rating: 4.88,
      status: 'Available',
      desc: 'Warm acoustic wood wall paneling, elegant dining table, curated art collections, and private terrace offering stunning twilight views.',
      amenities: ['Sunset Balcony', 'Dedicated Workspace', 'Soundproof Suite', 'High-speed Fiber Wi-Fi']
    },
    {
      id: 'deluxe-horizon',
      name: 'Deluxe Horizon Room',
      category: 'deluxe',
      basePriceUSD: 380,
      priceUSD: 380,
      image: '/images/room-6.jpg',
      capacity: '2 Guests',
      capacityNum: 2,
      size: '550 sq ft',
      bed: 'Queen Bed',
      badge: 'Deluxe Classic',
      rating: 4.85,
      status: 'Available',
      desc: 'Stay in comfort and style with our exclusive room. Perfect for relaxation and convenience with plush linens, espresso maker, and luxury amenities.',
      amenities: ['Panoramic View', 'Italian Marble Bath', 'Smart Climate Control', 'Luxury Bathrobes']
    }
  ],
  addons: [
    { id: 'club-lounge', name: 'Royal Executive Club Lounge 24/7 Pass', priceUSD: 95, type: 'per_guest_daily', desc: 'All-inclusive 24-hr access to private VIP Sky Lounge, sommelier wine tastings, and afternoon high tea.' },
    { id: 'private-flat-chef', name: 'In-Flat Private Master Chef 5-Course Dinner', priceUSD: 180, type: 'per_booking', desc: 'Private Michelin-trained chef preparing bespoke fine dining directly in your flat kitchen.' },
    { id: 'transfer', name: 'Airport Luxury Chauffeur Transfer', priceUSD: 120, type: 'per_booking', desc: 'Mercedes Maybach private round-trip airport transfer.' },
    { id: 'breakfast', name: 'Daily Gourmet Champagne Breakfast', priceUSD: 65, type: 'per_guest_daily', desc: 'Caviar, French pastries, organic farm eggs, and fresh juices.' },
    { id: 'welcome', name: 'Dom Pérignon & Caviar Welcome Package', priceUSD: 250, type: 'per_booking', desc: 'Chilled vintage champagne & Oscietra caviar upon arrival.' },
    { id: 'yacht', name: 'Private Sunset Yacht Cruise', priceUSD: 380, type: 'per_booking', desc: '2-hour private coastal cruise with canapés & sommelier.' },
    { id: 'spa', name: 'Holistic Spa Sanctuary Full-Day Pass', priceUSD: 140, type: 'per_guest', desc: 'Unlimited hydrotherapy, herbal steam, and 60-min treatment.' },
    { id: 'valet', name: 'Priority Valet Parking & EV Charging', priceUSD: 45, type: 'per_day', desc: 'Guaranteed reserved spot with level-3 fast charging.' }
  ],
  bookingDraft: {
    roomId: 'imperial-penthouse',
    checkin: '',
    checkout: '',
    adults: 2,
    children: 0,
    selectedAddons: ['breakfast'],
    paymentMethod: 'Credit Card (Stripe Secured)',
    nights: 3,
    guest: {
      fullName: '',
      email: '',
      phone: '',
      country: '',
      pillow: 'Hypoallergenic Goose Feather',
      specialRequests: ''
    }
  }
};

// Seed initial reservations if empty
function initializeSeedReservations() {
  const existing = localStorage.getItem('hotelier_reservations');
  if (!existing || JSON.parse(existing).length === 0) {
    const seed = [
      {
        code: 'HTL-849201',
        roomId: 'royal-horizon-villa',
        roomName: 'Royal Horizon Beach Villa',
        roomImage: '/images/room-2.jpg',
        checkin: '2026-11-01',
        checkout: '2026-11-04',
        nights: 3,
        adults: 2,
        guestName: 'Lord Marcus Sterling',
        guestEmail: 'marcus.sterling@zurich.ch',
        guestPhone: '+41 44 211 4400',
        paymentMethod: 'American Express Centurion',
        pillow: 'Organic Memory Foam Contour',
        specialRequests: 'Chilled champagne at arrival, extra beach towels.',
        currency: 'USD',
        totalPaidUSD: 3340,
        status: 'Confirmed',
        createdAt: 'Oct 15, 2026'
      },
      {
        code: 'HTL-932145',
        roomId: 'executive-grand',
        roomName: 'Executive Grand Suite',
        roomImage: '/images/room-5.jpg',
        checkin: '2026-11-10',
        checkout: '2026-11-14',
        nights: 4,
        adults: 1,
        guestName: 'Elena Rostova',
        guestEmail: 'elena.rostova@geneva.ch',
        guestPhone: '+41 22 819 0022',
        paymentMethod: 'Visa Platinum',
        pillow: 'Silk Infused Lavender Aromatherapy',
        specialRequests: 'Quiet high-floor suite for remote design workshop.',
        currency: 'USD',
        totalPaidUSD: 2410,
        status: 'Checked-in',
        createdAt: 'Oct 16, 2026'
      }
    ];
    localStorage.setItem('hotelier_reservations', JSON.stringify(seed));
  }
}

// ==========================================
// 2. HELPER UTILITIES
// ==========================================
function formatPrice(amountUSD) {
  const curr = HOTEL_DATA.currency || 'INR';
  const currencyInfo = HOTEL_DATA.currencyRates[curr] || HOTEL_DATA.currencyRates.INR;
  const converted = Math.round(amountUSD * currencyInfo.rate);
  if (curr === 'INR') {
    return `${currencyInfo.symbol}${converted.toLocaleString('en-IN')}`;
  }
  return `${currencyInfo.symbol}${converted.toLocaleString()}`;
}

function showToast(message, iconClass = 'fa-check-circle') {
  const container = document.getElementById('toast-container');
  if (!container) return;

  const toast = document.createElement('div');
  toast.className = 'toast';
  toast.innerHTML = `<i class="fas ${iconClass}"></i><span>${message}</span>`;
  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateX(100%)';
    toast.style.transition = 'all 0.4s ease';
    setTimeout(() => toast.remove(), 400);
  }, 4000);
}

function calculateNights(start, end) {
  if (!start || !end) return 3;
  const d1 = new Date(start);
  const d2 = new Date(end);
  const diffTime = d2.getTime() - d1.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 1;
}

// Check for conflicting reservations for a room in a given date range
function isRoomAvailableForDates(roomId, checkinStr, checkoutStr, ignoreBookingCode = null) {
  if (!checkinStr || !checkoutStr) return true;
  const newStart = new Date(checkinStr).getTime();
  const newEnd = new Date(checkoutStr).getTime();

  const reservations = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  const roomBookings = reservations.filter(b => b.roomId === roomId && b.status !== 'Cancelled');

  for (const b of roomBookings) {
    if (ignoreBookingCode && b.code === ignoreBookingCode) continue;
    const existingStart = new Date(b.checkin).getTime();
    const existingEnd = new Date(b.checkout).getTime();

    // Overlap condition: startA < endB and endA > startB
    if (newStart < existingEnd && newEnd > existingStart) {
      return {
        available: false,
        conflictingBooking: b
      };
    }
  }

  return { available: true };
}

// ==========================================
// 3. NAVIGATION & MENU CONTROLS
// ==========================================
let menu = document.querySelector('#menu-btn');
let navbar = document.querySelector('.header .navbar');

if (menu && navbar) {
  menu.onclick = () => {
    menu.classList.toggle('fa-times');
    navbar.classList.toggle('active');
  };

  window.onscroll = () => {
    menu.classList.remove('fa-times');
    navbar.classList.remove('active');
  };
}

// Currency selector handler
const currencySelect = document.getElementById('currency-selector');
if (currencySelect) {
  currencySelect.addEventListener('change', (e) => {
    HOTEL_DATA.currency = e.target.value;
    updateAllPricesInUI();
    showToast(`Currency changed to ${HOTEL_DATA.currency}`, 'fa-coins');
  });
}

// Quick INR Switcher handler
const quickInrBtn = document.getElementById('quick-inr-toggle');
if (quickInrBtn) {
  quickInrBtn.addEventListener('click', () => {
    HOTEL_DATA.currency = (HOTEL_DATA.currency === 'INR') ? 'USD' : 'INR';
    updateAllPricesInUI();
    showToast(`Currency set to ${HOTEL_DATA.currency} (${HOTEL_DATA.currencyRates[HOTEL_DATA.currency].symbol})`, 'fa-coins');
  });
}

function updateAllPricesInUI() {
  // 1. Room cards in rooms section
  document.querySelectorAll('.room-card').forEach((card) => {
    const roomId = card.getAttribute('data-room-id');
    const room = HOTEL_DATA.rooms.find(r => r.id === roomId);
    if (room) {
      const priceElem = card.querySelector('.price-tag');
      if (priceElem) {
        priceElem.innerHTML = `${formatPrice(room.priceUSD)} <span>/ night</span>`;
      }
    }
  });

  // 2. Residence & Lounge collection showcase price pills
  document.querySelectorAll('.rl-price-pill .price-val').forEach(el => {
    const base = parseFloat(el.getAttribute('data-base-usd') || '1000');
    el.textContent = formatPrice(Math.round(base * HOTEL_DATA.pricingMultiplier));
  });

  // 3. Quick reservation bar options
  const roomTypeSelect = document.getElementById('bar-room-type');
  if (roomTypeSelect) {
    const currentVal = roomTypeSelect.value;
    roomTypeSelect.innerHTML = HOTEL_DATA.rooms.map(r => 
      `<option value="${r.id}" ${r.id === currentVal ? 'selected' : ''}>${r.name} (${formatPrice(r.priceUSD)}/night)</option>`
    ).join('');
  }

  // 4. Update Filter Range Slider Display
  const priceDisplay = document.getElementById('filter-price-display');
  const priceSlider = document.getElementById('filter-price-range');
  if (priceDisplay && priceSlider) {
    priceDisplay.textContent = formatPrice(parseInt(priceSlider.value, 10));
  }

  // 5. Update Quick INR Toggle Button active state
  const quickInrButton = document.getElementById('quick-inr-toggle');
  if (quickInrButton) {
    if (HOTEL_DATA.currency === 'INR') {
      quickInrButton.classList.add('active');
    } else {
      quickInrButton.classList.remove('active');
    }
  }

  // 6. Sync select dropdown
  const selectElem = document.getElementById('currency-selector');
  if (selectElem && selectElem.value !== HOTEL_DATA.currency) {
    selectElem.value = HOTEL_DATA.currency;
  }

  updateModalPriceCalculation();
}

// ==========================================
// 4. SWIPER INITIALIZATIONS
// ==========================================
var homeSwiper = new Swiper(".home-slider", {
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

const slides = document.querySelectorAll('.swiper-slide');
const slideObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const slideContent = entry.target.querySelector('.content');
    if (slideContent) {
      const fadeItems = slideContent.querySelectorAll('.fade-item');
      if (entry.isIntersecting) {
        slideContent.classList.add('active');
        fadeItems.forEach((item, index) => {
          item.style.transitionDelay = `${index * 0.4}s`;
        });
      } else {
        slideContent.classList.remove('active');
        fadeItems.forEach(item => {
          item.style.transitionDelay = '0s';
        });
      }
    }
  });
}, { threshold: 0.5 });

slides.forEach(slide => slideObserver.observe(slide));

var roomSwiper = new Swiper(".room-slider", {
  spaceBetween: 25,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 7500,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".room-slider .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1 },
    768: { slidesPerView: 2 },
    1100: { slidesPerView: 3 },
  },
});

var gallerySwiper = new Swiper(".gallery-slider", {
  spaceBetween: 15,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 2200,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".gallery-slider .swiper-pagination",
    clickable: true,
  },
  breakpoints: {
    0: { slidesPerView: 1.2 },
    640: { slidesPerView: 2.2 },
    991: { slidesPerView: 3.5 },
    1200: { slidesPerView: 4 },
  },
});

var reviewSwiper = new Swiper(".review-slider", {
  spaceBetween: 20,
  grabCursor: true,
  loop: true,
  centeredSlides: true,
  autoplay: {
    delay: 8000,
    disableOnInteraction: false,
  },
  pagination: {
    el: ".review-slider .swiper-pagination",
    clickable: true,
  },
});

// ==========================================
// 5. GALLERY POPUP LIGHTBOX
// ==========================================
const plusIcons = document.querySelectorAll('.gallery .slide .icon');
const popup = document.querySelector('.popup-image');
const popupImg = popup ? popup.querySelector('img') : null;
const closeBtn = popup ? popup.querySelector('.close-btn') : null;
const prevBtn = popup ? popup.querySelector('.prev-btn') : null;
const nextBtn = popup ? popup.querySelector('.next-btn') : null;
const imageCount = popup ? popup.querySelector('.image-count') : null;
let currentImageIndex = 0;

function updateImageCount() {
  const allSlides = document.querySelectorAll('.gallery .slide');
  if (imageCount) {
    imageCount.textContent = `${currentImageIndex + 1} / ${allSlides.length}`;
  }
}

function showImage(index) {
  const allSlides = document.querySelectorAll('.gallery .slide');
  if (!allSlides.length || !popupImg) return;
  currentImageIndex = index;
  const imageSource = allSlides[index].querySelector('img').getAttribute('src');
  popupImg.src = imageSource;
  updateImageCount();
}

if (popup && plusIcons) {
  plusIcons.forEach((icon, index) => {
    icon.onclick = (e) => {
      e.stopPropagation();
      popup.style.display = 'flex';
      showImage(index);
    };
  });

  if (closeBtn) closeBtn.onclick = () => { popup.style.display = 'none'; };
  if (prevBtn) {
    prevBtn.onclick = (e) => {
      e.stopPropagation();
      const allSlides = document.querySelectorAll('.gallery .slide');
      currentImageIndex = (currentImageIndex - 1 + allSlides.length) % allSlides.length;
      showImage(currentImageIndex);
    };
  }
  if (nextBtn) {
    nextBtn.onclick = (e) => {
      e.stopPropagation();
      const allSlides = document.querySelectorAll('.gallery .slide');
      currentImageIndex = (currentImageIndex + 1) % allSlides.length;
      showImage(currentImageIndex);
    };
  }

  popup.onclick = (e) => {
    if (e.target === popup) popup.style.display = 'none';
  };

  document.addEventListener('keydown', (e) => {
    if (popup.style.display === 'flex' || popup.style.display === 'block') {
      if (e.key === 'ArrowLeft' && prevBtn) prevBtn.click();
      else if (e.key === 'ArrowRight' && nextBtn) nextBtn.click();
      else if (e.key === 'Escape' && closeBtn) closeBtn.click();
    }
  });
}

// ==========================================
// 6. INTERSECTION OBSERVERS
// ==========================================
document.addEventListener('DOMContentLoaded', function () {
  initializeSeedReservations();

  // Philosophy section animations
  const philosophySection = document.querySelector('.about .row .content .philosophy');
  const philosophyItems = document.querySelectorAll('.philosophy-item');
  if (philosophySection && philosophyItems.length) {
    const philosophyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          philosophyItems.forEach((item, i) => {
            setTimeout(() => item.classList.add('animate'), i * 150);
          });
          philosophyObserver.disconnect();
        }
      });
    }, { threshold: 0.15 });
    philosophyObserver.observe(philosophySection);
  }

  // Services section animations
  const servicesContainer = document.querySelector('.services .box-container');
  const serviceBoxes = document.querySelectorAll('.services .box-container .box');
  if (servicesContainer && serviceBoxes.length) {
    const servicesObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          serviceBoxes.forEach((box, i) => {
            setTimeout(() => box.classList.add('animate'), i * 120);
          });
          servicesObserver.disconnect();
        }
      });
    }, { threshold: 0.15 });
    servicesObserver.observe(servicesContainer);
  }

  // FAQ Accordion
  const faqContent = document.querySelector('.faqs .row .content');
  const faqBoxes = document.querySelectorAll('.faqs .row .content .box');
  if (faqContent && faqBoxes.length) {
    const faqObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          faqBoxes.forEach((box, i) => {
            setTimeout(() => box.classList.add('animate'), i * 100);
          });
          faqObserver.disconnect();
        }
      });
    }, { threshold: 0.15 });
    faqObserver.observe(faqContent);
  }

  document.querySelectorAll('.faqs .content .box h3').forEach(header => {
    header.addEventListener('click', () => {
      const box = header.parentElement;
      const wasActive = box.classList.contains('active');
      document.querySelectorAll('.faqs .content .box').forEach(b => b.classList.remove('active'));
      if (!wasActive) box.classList.add('active');
    });
  });

  initDefaultBookingDates();
  initReservationSystem();
  initAdminDashboard();
  initHotelMap();
  initAIChatConcierge();
  initWishlistSystem();
  initAdvancedFilters();
  updateAllPricesInUI();
});

// ==========================================
// 7. ADVANCED HOTEL RESERVATION ENGINE
// ==========================================
function initDefaultBookingDates() {
  const today = new Date();
  const future = new Date();
  future.setDate(today.getDate() + 3);

  const format = (d) => d.toISOString().split('T')[0];

  const checkinInput = document.getElementById('bar-checkin');
  const checkoutInput = document.getElementById('bar-checkout');

  if (checkinInput && checkoutInput) {
    checkinInput.value = format(today);
    checkoutInput.value = format(future);
    checkinInput.min = format(today);
    checkoutInput.min = format(today);

    HOTEL_DATA.bookingDraft.checkin = checkinInput.value;
    HOTEL_DATA.bookingDraft.checkout = checkoutInput.value;
    HOTEL_DATA.bookingDraft.nights = 3;

    checkinInput.addEventListener('change', () => {
      checkoutInput.min = checkinInput.value;
      if (new Date(checkoutInput.value) <= new Date(checkinInput.value)) {
        const next = new Date(checkinInput.value);
        next.setDate(next.getDate() + 1);
        checkoutInput.value = format(next);
      }
      HOTEL_DATA.bookingDraft.checkin = checkinInput.value;
      HOTEL_DATA.bookingDraft.checkout = checkoutInput.value;
      HOTEL_DATA.bookingDraft.nights = calculateNights(checkinInput.value, checkoutInput.value);
      updateModalPriceCalculation();
    });

    checkoutInput.addEventListener('change', () => {
      HOTEL_DATA.bookingDraft.checkout = checkoutInput.value;
      HOTEL_DATA.bookingDraft.nights = calculateNights(checkinInput.value, checkoutInput.value);
      updateModalPriceCalculation();
    });
  }
}

function initReservationSystem() {
  // Quick booking form submission
  const quickBarForm = document.getElementById('quick-reservation-form');
  if (quickBarForm) {
    quickBarForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const roomTypeSelect = document.getElementById('bar-room-type');
      if (roomTypeSelect && roomTypeSelect.value) {
        HOTEL_DATA.bookingDraft.roomId = roomTypeSelect.value;
      }
      const guestsSelect = document.getElementById('bar-guests');
      if (guestsSelect) {
        HOTEL_DATA.bookingDraft.adults = parseInt(guestsSelect.value, 10);
      }
      openBookingModal(1);
    });
  }

  // Room card "Reserve Suite" buttons
  document.querySelectorAll('.btn-book-room').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      const roomId = btn.getAttribute('data-room-id');
      if (roomId) HOTEL_DATA.bookingDraft.roomId = roomId;
      openBookingModal(1);
    });
  });

  // Header "Book a Suite" and CTAs
  document.querySelectorAll('.open-booking-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openBookingModal(1);
    });
  });

  // My Bookings trigger
  document.querySelectorAll('.open-my-bookings-trigger').forEach(btn => {
    btn.addEventListener('click', (e) => {
      e.preventDefault();
      openMyBookingsModal();
    });
  });

  // Modal Step Navigation Buttons
  const nextToStep2 = document.getElementById('btn-to-step-2');
  const nextToStep3 = document.getElementById('btn-to-step-3');
  const backToStep1 = document.getElementById('btn-back-to-step-1');
  const backToStep2 = document.getElementById('btn-back-to-step-2');
  const confirmBookingBtn = document.getElementById('btn-confirm-booking');

  if (nextToStep2) nextToStep2.addEventListener('click', () => {
    // Validate that selected room is available for dates
    const check = isRoomAvailableForDates(
      HOTEL_DATA.bookingDraft.roomId,
      HOTEL_DATA.bookingDraft.checkin,
      HOTEL_DATA.bookingDraft.checkout
    );
    if (!check.available) {
      showToast('This suite is already reserved for your dates. Please select another suite.', 'fa-exclamation-triangle');
      return;
    }
    openBookingModal(2);
  });

  if (nextToStep3) nextToStep3.addEventListener('click', () => openBookingModal(3));
  if (backToStep1) backToStep1.addEventListener('click', () => openBookingModal(1));
  if (backToStep2) backToStep2.addEventListener('click', () => openBookingModal(2));
  if (confirmBookingBtn) confirmBookingBtn.addEventListener('click', handleConfirmReservation);

  // Modal close buttons
  document.querySelectorAll('.close-booking-modal').forEach(btn => {
    btn.addEventListener('click', closeBookingModal);
  });

  // Payment method selection cards in Step 3
  document.querySelectorAll('.payment-card-option').forEach(option => {
    option.addEventListener('click', () => {
      document.querySelectorAll('.payment-card-option').forEach(o => o.classList.remove('active'));
      option.classList.add('active');
      HOTEL_DATA.bookingDraft.paymentMethod = option.getAttribute('data-method');
    });
  });

  // Room filter tabs in Rooms section
  document.querySelectorAll('.rooms-filter .filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.rooms-filter .filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const cat = btn.getAttribute('data-filter');

      document.querySelectorAll('.room-slider .swiper-slide').forEach(slide => {
        const slideCat = slide.getAttribute('data-category');
        slide.style.display = (cat === 'all' || slideCat === cat) ? 'block' : 'none';
      });
      roomSwiper.update();
    });
  });

  // Newsletter form
  const newsletterForm = document.getElementById('newsletter-form');
  if (newsletterForm) {
    newsletterForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = newsletterForm.querySelector('input');
      if (input && input.value) {
        showToast('Thank you for subscribing! Your 15% VIP welcome voucher has been dispatched.', 'fa-envelope-open-text');
        input.value = '';
      }
    });
  }
}

// Open booking modal to specific step
function openBookingModal(step = 1) {
  const modalOverlay = document.getElementById('booking-modal-overlay');
  if (!modalOverlay) return;

  modalOverlay.classList.add('active');
  document.body.style.overflow = 'hidden';

  // 1. Update Stepper Header
  for (let i = 1; i <= 4; i++) {
    const node = document.getElementById(`step-node-${i}`);
    if (node) {
      node.classList.remove('active', 'completed');
      if (i === step) node.classList.add('active');
      else if (i < step) node.classList.add('completed');
    }
  }

  // 2. Explicitly toggle Body Step Panes
  for (let i = 1; i <= 4; i++) {
    const pane = document.getElementById(`booking-step-${i}`);
    if (pane) pane.style.display = (i === step) ? 'block' : 'none';
  }

  // 3. Explicitly toggle Footer Control Panes
  for (let i = 1; i <= 4; i++) {
    const controls = document.getElementById(`step-${i}-controls`);
    if (controls) controls.style.display = (i === step) ? 'flex' : 'none';
  }

  // Populate dynamic step data
  if (step === 1) renderModalRoomSelection();
  if (step === 2) renderModalAddonsSelection();
  if (step === 3) populateGuestDetailsReview();

  updateModalPriceCalculation();
}

function closeBookingModal() {
  const modalOverlay = document.getElementById('booking-modal-overlay');
  if (modalOverlay) {
    modalOverlay.classList.remove('active');
    document.body.style.overflow = 'auto';
  }
}

function renderModalRoomSelection() {
  const container = document.getElementById('modal-room-list');
  const alertContainer = document.getElementById('modal-conflict-alert');
  if (!container) return;

  container.innerHTML = '';
  if (alertContainer) alertContainer.innerHTML = '';

  const checkin = HOTEL_DATA.bookingDraft.checkin;
  const checkout = HOTEL_DATA.bookingDraft.checkout;

  const datesDisplay = document.getElementById('step1-dates-display');
  if (datesDisplay) {
    datesDisplay.textContent = `${checkin || 'Selected dates'} → ${checkout || 'Selected dates'}`;
  }

  HOTEL_DATA.rooms.forEach(room => {
    const isSelected = room.id === HOTEL_DATA.bookingDraft.roomId;
    const availability = isRoomAvailableForDates(room.id, checkin, checkout);
    const isAvailable = availability.available && room.status === 'Available';

    const card = document.createElement('div');
    card.className = `modal-room-item ${isSelected ? 'selected' : ''} ${!isAvailable ? 'disabled' : ''}`;
    card.innerHTML = `
      <img src="${room.image}" alt="${room.name}" />
      <div class="info">
        <h4>${room.name}</h4>
        <p>${room.desc}</p>
        <div style="display: flex; gap: 0.5rem; align-items: center; flex-wrap: wrap;">
          <span class="amenity-chip">${room.capacity} · ${room.size} · ${room.bed}</span>
          ${!isAvailable
            ? '<span class="status-badge cancelled"><i class="fas fa-times-circle"></i> Booked for dates</span>'
            : '<span class="status-badge confirmed"><i class="fas fa-check-circle"></i> Available</span>'
          }
        </div>
      </div>
      <div class="price-area">
        <div class="rate">${formatPrice(room.priceUSD)}</div>
        <span>per night</span>
      </div>
    `;

    card.addEventListener('click', () => {
      if (!isAvailable) {
        showToast('This suite has a confirmed reservation for the chosen dates. Please pick another suite.', 'fa-calendar-times');
        return;
      }
      HOTEL_DATA.bookingDraft.roomId = room.id;
      document.querySelectorAll('.modal-room-item').forEach(c => c.classList.remove('selected'));
      card.classList.add('selected');
      updateModalPriceCalculation();
    });

    container.appendChild(card);
  });
}

function renderModalAddonsSelection() {
  const container = document.getElementById('modal-addon-list');
  if (!container) return;

  container.innerHTML = '';
  HOTEL_DATA.addons.forEach(addon => {
    const isChecked = HOTEL_DATA.bookingDraft.selectedAddons.includes(addon.id);
    const card = document.createElement('label');
    card.className = `addon-card ${isChecked ? 'selected' : ''}`;
    card.innerHTML = `
      <input type="checkbox" value="${addon.id}" ${isChecked ? 'checked' : ''} />
      <div class="details">
        <h4>${addon.name}</h4>
        <p>${addon.desc}</p>
        <div class="price">+${formatPrice(addon.priceUSD)}</div>
      </div>
    `;

    const checkbox = card.querySelector('input');
    checkbox.addEventListener('change', () => {
      if (checkbox.checked) {
        if (!HOTEL_DATA.bookingDraft.selectedAddons.includes(addon.id)) {
          HOTEL_DATA.bookingDraft.selectedAddons.push(addon.id);
        }
        card.classList.add('selected');
      } else {
        HOTEL_DATA.bookingDraft.selectedAddons = HOTEL_DATA.bookingDraft.selectedAddons.filter(id => id !== addon.id);
        card.classList.remove('selected');
      }
      updateModalPriceCalculation();
    });

    container.appendChild(card);
  });
}

function populateGuestDetailsReview() {
  const summaryBox = document.getElementById('step3-summary-info');
  const selectedRoom = HOTEL_DATA.rooms.find(r => r.id === HOTEL_DATA.bookingDraft.roomId);

  if (summaryBox && selectedRoom) {
    summaryBox.innerHTML = `
      <div style="background: var(--dark-card); padding: 1.25rem; border-radius: 8px; border: 1px solid var(--gold-border); margin-bottom: 1.5rem; display: flex; align-items: center; justify-content: space-between; flex-wrap: wrap; gap: 1rem;">
        <div>
          <span class="status-badge confirmed"><i class="fas fa-check"></i> Suite Available</span>
          <h4 style="color: var(--white); font-size: 1.15rem; margin-top: 0.25rem;">${selectedRoom.name}</h4>
          <p style="color: var(--primary); font-size: 0.85rem; margin-top: 0.25rem;">
            ${HOTEL_DATA.bookingDraft.nights} Nights · ${HOTEL_DATA.bookingDraft.checkin} → ${HOTEL_DATA.bookingDraft.checkout} · ${HOTEL_DATA.bookingDraft.adults} Guests
          </p>
        </div>
        <div style="text-align: right;">
          <span style="font-size: 0.75rem; color: var(--text-dim); text-transform: uppercase;">Room Base Total</span>
          <div style="font-size: 1.35rem; font-weight: bold; color: var(--primary);">
            ${formatPrice(selectedRoom.priceUSD * HOTEL_DATA.bookingDraft.nights)}
          </div>
        </div>
      </div>
    `;
  }
}

function updateModalPriceCalculation() {
  const selectedRoom = HOTEL_DATA.rooms.find(r => r.id === HOTEL_DATA.bookingDraft.roomId) || HOTEL_DATA.rooms[0];
  const nights = HOTEL_DATA.bookingDraft.nights || 3;
  const roomBaseTotal = selectedRoom.priceUSD * nights;

  let addonsTotal = 0;
  HOTEL_DATA.bookingDraft.selectedAddons.forEach(addonId => {
    const addon = HOTEL_DATA.addons.find(a => a.id === addonId);
    if (addon) {
      if (addon.type === 'per_guest_daily') {
        addonsTotal += addon.priceUSD * nights * (HOTEL_DATA.bookingDraft.adults || 2);
      } else if (addon.type === 'per_day') {
        addonsTotal += addon.priceUSD * nights;
      } else if (addon.type === 'per_guest') {
        addonsTotal += addon.priceUSD * (HOTEL_DATA.bookingDraft.adults || 2);
      } else {
        addonsTotal += addon.priceUSD;
      }
    }
  });

  const resortFee = 35 * nights;
  const taxes = Math.round((roomBaseTotal + addonsTotal) * 0.12);
  const grandTotal = roomBaseTotal + addonsTotal + resortFee + taxes;

  document.querySelectorAll('.calc-room-base').forEach(el => el.textContent = formatPrice(roomBaseTotal));
  document.querySelectorAll('.calc-nights-count').forEach(el => el.textContent = `${nights} Nights`);
  document.querySelectorAll('.calc-addons-total').forEach(el => el.textContent = formatPrice(addonsTotal));
  document.querySelectorAll('.calc-resort-fee').forEach(el => el.textContent = formatPrice(resortFee));
  document.querySelectorAll('.calc-taxes').forEach(el => el.textContent = formatPrice(taxes));
  document.querySelectorAll('.calc-grand-total').forEach(el => el.textContent = formatPrice(grandTotal));
}

function handleConfirmReservation() {
  const nameInput = document.getElementById('guest-name');
  const emailInput = document.getElementById('guest-email');
  const phoneInput = document.getElementById('guest-phone');
  const countryInput = document.getElementById('guest-country');
  const pillowSelect = document.getElementById('guest-pillow');
  const requestsInput = document.getElementById('guest-requests');

  if (!nameInput || !nameInput.value.trim()) {
    showToast('Please provide your full legal name for the reservation.', 'fa-exclamation-triangle');
    if (nameInput) nameInput.focus();
    return;
  }

  if (!emailInput || !emailInput.value.includes('@')) {
    showToast('Please enter a valid guest email address.', 'fa-exclamation-triangle');
    if (emailInput) emailInput.focus();
    return;
  }

  // Double check availability against any new bookings (Concurrency protection)
  const check = isRoomAvailableForDates(
    HOTEL_DATA.bookingDraft.roomId,
    HOTEL_DATA.bookingDraft.checkin,
    HOTEL_DATA.bookingDraft.checkout
  );

  if (!check.available) {
    showToast('Conflict detected! This suite was just reserved by another guest for overlapping dates.', 'fa-ban');
    openBookingModal(1);
    return;
  }

  const selectedRoom = HOTEL_DATA.rooms.find(r => r.id === HOTEL_DATA.bookingDraft.roomId) || HOTEL_DATA.rooms[0];
  const bookingCode = `HTL-${Math.floor(100000 + Math.random() * 900000)}`;
  const nights = HOTEL_DATA.bookingDraft.nights || 3;

  const newBooking = {
    code: bookingCode,
    roomId: selectedRoom.id,
    roomName: selectedRoom.name,
    roomImage: selectedRoom.image,
    checkin: HOTEL_DATA.bookingDraft.checkin || '2026-11-01',
    checkout: HOTEL_DATA.bookingDraft.checkout || '2026-11-04',
    nights: nights,
    adults: HOTEL_DATA.bookingDraft.adults,
    guestName: nameInput.value.trim(),
    guestEmail: emailInput.value.trim(),
    guestPhone: phoneInput ? phoneInput.value : '+1 (555) 019-2831',
    paymentMethod: HOTEL_DATA.bookingDraft.paymentMethod,
    pillow: pillowSelect ? pillowSelect.value : 'Goose Feather',
    specialRequests: requestsInput ? requestsInput.value : '',
    currency: HOTEL_DATA.currency,
    totalPaidUSD: selectedRoom.priceUSD * nights + 200,
    status: 'Confirmed',
    createdAt: new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })
  };

  const existing = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  existing.unshift(newBooking);
  localStorage.setItem('hotelier_reservations', JSON.stringify(existing));

  renderConfirmationVoucher(newBooking);
  openBookingModal(4);

  showToast(`Suite reserved successfully! Confirmation #${bookingCode}`, 'fa-award');

  // Refresh admin tables if open
  updateAdminKPIs();
  renderAdminBookingsTable();
}

function renderConfirmationVoucher(booking) {
  const voucherContainer = document.getElementById('voucher-display');
  if (!voucherContainer) return;

  voucherContainer.innerHTML = `
    <div class="voucher-container">
      <div class="voucher-badge">
        <i class="fas fa-check"></i>
      </div>
      <h2 style="font-family: 'Cinzel', serif; color: var(--white); font-size: 2rem; margin-bottom: 0.5rem;">
        Reservation Confirmed
      </h2>
      <p style="color: var(--text-muted); max-width: 500px; margin: 0 auto 1.5rem;">
        Thank you, ${booking.guestName}. Your sanctuary at Hotelier has been guaranteed. A formal confirmation dossier has been dispatched to <strong>${booking.guestEmail}</strong>.
      </p>

      <div class="voucher-card">
        <div class="voucher-header">
          <div>
            <span style="font-size: 0.75rem; text-transform: uppercase; color: var(--primary); letter-spacing: 0.15em; font-weight: bold;">
              OFFICIAL RESERVATION DOSSIER
            </span>
            <div class="voucher-code">${booking.code}</div>
          </div>
          <div style="text-align: right;">
            <span class="status-badge confirmed"><i class="fas fa-shield-alt"></i> ${booking.status}</span>
            <div style="font-size: 0.75rem; color: var(--text-dim); margin-top: 0.2rem;">Booked: ${booking.createdAt}</div>
          </div>
        </div>

        <div class="voucher-grid">
          <div class="voucher-field">
            <div class="label">Reserved Suite</div>
            <div class="val">${booking.roomName}</div>
          </div>
          <div class="voucher-field">
            <div class="label">Check-In Date</div>
            <div class="val">${booking.checkin} (from 3:00 PM)</div>
          </div>
          <div class="voucher-field">
            <div class="label">Check-Out Date</div>
            <div class="val">${booking.checkout} (until 11:00 AM)</div>
          </div>
          <div class="voucher-field">
            <div class="label">Duration</div>
            <div class="val">${booking.nights} Nights</div>
          </div>
          <div class="voucher-field">
            <div class="label">Primary Guest</div>
            <div class="val">${booking.guestName}</div>
          </div>
          <div class="voucher-field">
            <div class="label">Payment Method</div>
            <div class="val">${booking.paymentMethod}</div>
          </div>
        </div>
      </div>

      <div style="display: flex; gap: 1rem; justify-content: center; margin-top: 1.5rem; flex-wrap: wrap;">
        <button class="btn" onclick="window.print()">
          <i class="fas fa-print"></i> Print Voucher
        </button>
        <button class="btn-outline close-booking-modal" onclick="closeBookingModal()">
          <i class="fas fa-times"></i> Return to Showcase
        </button>
      </div>
    </div>
  `;
}

// ==========================================
// 8. MY BOOKINGS & DATE MODIFICATION
// ==========================================
function openMyBookingsModal() {
  const modal = document.getElementById('my-bookings-modal');
  const container = document.getElementById('my-bookings-list');
  if (!modal || !container) return;

  const bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');

  if (bookings.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 3rem 1rem; color: var(--text-muted);">
        <i class="fas fa-suitcase-rolling" style="font-size: 3rem; color: var(--primary); opacity: 0.4; margin-bottom: 1rem;"></i>
        <h4 style="color: var(--white); font-size: 1.2rem; margin-bottom: 0.5rem;">No Active Bookings Found</h4>
        <p style="font-size: 0.9rem; margin-bottom: 1.5rem;">You do not currently have any active suite reservations stored.</p>
        <button class="btn btn-sm open-booking-trigger" onclick="document.getElementById('my-bookings-modal').classList.remove('active'); openBookingModal(1);">
          Reserve Your Suite Now
        </button>
      </div>
    `;
  } else {
    container.innerHTML = '';
    bookings.forEach((booking) => {
      const card = document.createElement('div');
      card.className = 'booking-item-card';
      card.innerHTML = `
        <div class="meta">
          <span class="status-badge ${booking.status === 'Cancelled' ? 'cancelled' : 'confirmed'}">
            <i class="fas ${booking.status === 'Cancelled' ? 'fa-times' : 'fa-check'}"></i> ${booking.status} #${booking.code}
          </span>
          <h4>${booking.roomName}</h4>
          <p><i class="far fa-calendar-alt"></i> ${booking.checkin} → ${booking.checkout} (${booking.nights} Nights) · Guest: ${booking.guestName}</p>
          <div style="font-size: 0.8rem; color: var(--primary); margin-top: 0.35rem;">
            Payment: ${booking.paymentMethod}
          </div>
        </div>
        <div style="display: flex; gap: 0.5rem; flex-direction: column;">
          <button class="btn-outline btn-sm" onclick="viewExistingVoucher('${booking.code}')">
            <i class="fas fa-file-invoice"></i> Voucher
          </button>
          ${booking.status !== 'Cancelled' ? `
            <button class="btn-outline btn-sm" onclick="openModifyBookingModal('${booking.code}')">
              <i class="fas fa-calendar-day"></i> Modify Dates
            </button>
            <button class="btn-sm btn-danger" onclick="cancelReservation('${booking.code}')">
              Cancel
            </button>
          ` : ''}
        </div>
      `;
      container.appendChild(card);
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

function cancelReservation(code) {
  if (confirm(`Are you sure you wish to cancel reservation ${code}? Free cancellation applies up to 48 hours prior to check-in.`)) {
    let bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
    bookings = bookings.map(b => b.code === code ? { ...b, status: 'Cancelled' } : b);
    localStorage.setItem('hotelier_reservations', JSON.stringify(bookings));
    showToast(`Reservation #${code} has been cancelled.`, 'fa-info-circle');
    openMyBookingsModal();
    updateAdminKPIs();
    renderAdminBookingsTable();
  }
}

function viewExistingVoucher(code) {
  const bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  const booking = bookings.find(b => b.code === code);
  if (booking) {
    document.getElementById('my-bookings-modal').classList.remove('active');
    renderConfirmationVoucher(booking);
    openBookingModal(4);
  }
}

// Modify reservation dates
function openModifyBookingModal(code) {
  const bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  const booking = bookings.find(b => b.code === code);
  if (!booking) return;

  const modal = document.getElementById('modify-booking-modal');
  const details = document.getElementById('modify-booking-details');
  if (!modal || !details) return;

  details.innerHTML = `
    <div style="margin-bottom: 1rem;">
      <h4 style="color: var(--white);">${booking.roomName} (#${booking.code})</h4>
      <p style="color: var(--text-muted); font-size: 0.85rem;">Currently: ${booking.checkin} → ${booking.checkout}</p>
    </div>
    <div class="guest-form-grid">
      <div class="form-group">
        <label>New Check-In Date</label>
        <input type="date" id="modify-new-checkin" value="${booking.checkin}" required>
      </div>
      <div class="form-group">
        <label>New Check-Out Date</label>
        <input type="date" id="modify-new-checkout" value="${booking.checkout}" required>
      </div>
    </div>
    <div style="margin-top: 1.5rem; display: flex; gap: 1rem; justify-content: flex-end;">
      <button class="btn-outline btn-sm" onclick="document.getElementById('modify-booking-modal').classList.remove('active');">Cancel</button>
      <button class="btn btn-sm" onclick="saveModifiedDates('${booking.code}')">
        <i class="fas fa-check"></i> Save New Dates
      </button>
    </div>
  `;

  modal.classList.add('active');
}

function saveModifiedDates(code) {
  const newIn = document.getElementById('modify-new-checkin').value;
  const newOut = document.getElementById('modify-new-checkout').value;

  if (new Date(newOut) <= new Date(newIn)) {
    showToast('Check-out date must be after check-in date.', 'fa-exclamation-triangle');
    return;
  }

  const bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  const booking = bookings.find(b => b.code === code);

  // Check conflicts
  const check = isRoomAvailableForDates(booking.roomId, newIn, newOut, code);
  if (!check.available) {
    showToast('Sorry, this suite is not available for those modified dates.', 'fa-ban');
    return;
  }

  const newNights = calculateNights(newIn, newOut);
  booking.checkin = newIn;
  booking.checkout = newOut;
  booking.nights = newNights;

  localStorage.setItem('hotelier_reservations', JSON.stringify(bookings));
  document.getElementById('modify-booking-modal').classList.remove('active');
  showToast(`Reservation #${code} modified successfully to ${newIn} → ${newOut}!`, 'fa-check-circle');

  openMyBookingsModal();
  updateAdminKPIs();
  renderAdminBookingsTable();
}

// ==========================================
// 9. HOTEL MANAGEMENT ADMIN DASHBOARD
// ==========================================
function initAdminDashboard() {
  const toggleBtn = document.getElementById('toggle-admin-view');
  const adminSection = document.getElementById('admin-dashboard-section');
  const mainSite = document.querySelectorAll('section:not(#admin-dashboard-section), .reservation-bar-wrapper');

  if (toggleBtn && adminSection) {
    toggleBtn.addEventListener('click', () => {
      const isVisible = adminSection.classList.contains('active');
      if (isVisible) {
        adminSection.classList.remove('active');
        mainSite.forEach(s => s.style.display = '');
        toggleBtn.innerHTML = '<i class="fas fa-lock"></i> Admin Portal';
      } else {
        adminSection.classList.add('active');
        mainSite.forEach(s => s.style.display = 'none');
        toggleBtn.innerHTML = '<i class="fas fa-eye"></i> Guest View';
        updateAdminKPIs();
        renderAdminBookingsTable();
        renderAdminRoomsTable();
        adminSection.scrollIntoView({ behavior: 'smooth' });
      }
    });
  }

  // Admin Tab Navigation
  document.querySelectorAll('.admin-tab-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.admin-tab-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
      const tabName = btn.getAttribute('data-tab');

      document.querySelectorAll('.admin-tab-content').forEach(c => {
        c.style.display = (c.id === `admin-${tabName}`) ? 'block' : 'none';
      });
    });
  });
}

function updateAdminKPIs() {
  const bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  const activeBookings = bookings.filter(b => b.status !== 'Cancelled');

  const totalBookings = activeBookings.length;
  const totalRevenue = activeBookings.reduce((sum, b) => sum + (b.totalPaidUSD || 2000), 0);
  const occupancyRate = Math.min(100, Math.round((activeBookings.length / HOTEL_DATA.rooms.length) * 100));
  const availableRoomsCount = Math.max(0, HOTEL_DATA.rooms.length - activeBookings.filter(b => b.status === 'Checked-in').length);

  const kpiBookings = document.getElementById('admin-kpi-bookings');
  const kpiRevenue = document.getElementById('admin-kpi-revenue');
  const kpiOccupancy = document.getElementById('admin-kpi-occupancy');
  const kpiRooms = document.getElementById('admin-kpi-rooms');

  if (kpiBookings) kpiBookings.textContent = totalBookings;
  if (kpiRevenue) kpiRevenue.textContent = formatPrice(totalRevenue);
  if (kpiOccupancy) kpiOccupancy.textContent = `${occupancyRate}%`;
  if (kpiRooms) kpiRooms.textContent = `${availableRoomsCount} / ${HOTEL_DATA.rooms.length}`;
}

function renderAdminBookingsTable() {
  const tbody = document.getElementById('admin-bookings-tbody');
  if (!tbody) return;

  const bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  tbody.innerHTML = '';

  if (bookings.length === 0) {
    tbody.innerHTML = `<tr><td colspan="7" style="text-align:center; padding: 2rem; color: var(--text-muted);">No reservations found in the database.</td></tr>`;
    return;
  }

  bookings.forEach(b => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><strong>${b.code}</strong></td>
      <td>
        <div style="font-weight: 600; color: var(--white);">${b.guestName}</div>
        <div style="font-size: 0.78rem; color: var(--text-dim);">${b.guestEmail}</div>
      </td>
      <td>${b.roomName}</td>
      <td>${b.checkin} → ${b.checkout} (${b.nights}n)</td>
      <td><strong>${formatPrice(b.totalPaidUSD || 2500)}</strong></td>
      <td>
        <span class="status-badge ${b.status === 'Cancelled' ? 'cancelled' : (b.status === 'Checked-in' ? 'checked-in' : 'confirmed')}">
          ${b.status}
        </span>
      </td>
      <td>
        <div style="display: flex; gap: 0.4rem;">
          ${b.status === 'Confirmed' ? `
            <button class="btn-sm btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="adminUpdateBookingStatus('${b.code}', 'Checked-in')">
              Check-In
            </button>
          ` : ''}
          ${b.status === 'Checked-in' ? `
            <button class="btn-sm btn-outline" style="padding: 0.3rem 0.6rem; font-size: 0.75rem; border-color: #10b981; color: #10b981;" onclick="adminUpdateBookingStatus('${b.code}', 'Completed')">
              Complete
            </button>
          ` : ''}
          ${b.status !== 'Cancelled' ? `
            <button class="btn-sm btn-danger" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="adminUpdateBookingStatus('${b.code}', 'Cancelled')">
              Cancel
            </button>
          ` : ''}
        </div>
      </td>
    `;
    tbody.appendChild(tr);
  });

  const fullTbody = document.getElementById('admin-bookings-full-tbody');
  if (fullTbody) fullTbody.innerHTML = tbody.innerHTML;
}

function adminUpdateBookingStatus(code, newStatus) {
  let bookings = JSON.parse(localStorage.getItem('hotelier_reservations') || '[]');
  bookings = bookings.map(b => b.code === code ? { ...b, status: newStatus } : b);
  localStorage.setItem('hotelier_reservations', JSON.stringify(bookings));
  showToast(`Booking #${code} status set to ${newStatus}`, 'fa-sync-alt');
  updateAdminKPIs();
  renderAdminBookingsTable();
}

function renderAdminRoomsTable() {
  const tbody = document.getElementById('admin-rooms-tbody');
  if (!tbody) return;

  tbody.innerHTML = '';
  HOTEL_DATA.rooms.forEach(room => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td><img src="${room.image}" style="width: 50px; height: 35px; object-fit: cover; border-radius: 4px;" /></td>
      <td><strong>${room.name}</strong></td>
      <td><span class="amenity-chip">${room.category.toUpperCase()}</span></td>
      <td>${room.capacity} (${room.size})</td>
      <td><strong>${formatPrice(room.priceUSD)} / night</strong></td>
      <td>
        <span class="status-badge ${room.status === 'Available' ? 'confirmed' : 'cancelled'}">
          ${room.status}
        </span>
      </td>
      <td>
        <button class="btn-outline btn-sm" style="padding: 0.3rem 0.6rem; font-size: 0.75rem;" onclick="toggleRoomMaintenance('${room.id}')">
          ${room.status === 'Available' ? 'Set Maintenance' : 'Set Available'}
        </button>
      </td>
    `;
    tbody.appendChild(tr);
  });
}

function toggleRoomMaintenance(roomId) {
  const room = HOTEL_DATA.rooms.find(r => r.id === roomId);
  if (room) {
    room.status = (room.status === 'Available') ? 'Maintenance' : 'Available';
    showToast(`${room.name} status updated to ${room.status}`, 'fa-wrench');
    renderAdminRoomsTable();
  }
}

// Dynamic Pricing Rules
function applyDynamicPricingRule(ruleType) {
  if (ruleType === 'weekend') {
    HOTEL_DATA.pricingMultiplier = 1.20;
    HOTEL_DATA.rooms.forEach(r => r.priceUSD = Math.round(r.basePriceUSD * 1.20));
    showToast('Weekend Rate Applied (+20% Demand Surcharge)', 'fa-chart-line');
  } else if (ruleType === 'festival') {
    HOTEL_DATA.pricingMultiplier = 1.35;
    HOTEL_DATA.rooms.forEach(r => r.priceUSD = Math.round(r.basePriceUSD * 1.35));
    showToast('Festival & Grand Prix Surcharge Applied (+35%)', 'fa-calendar-star');
  } else if (ruleType === 'earlybird') {
    HOTEL_DATA.pricingMultiplier = 0.90;
    HOTEL_DATA.rooms.forEach(r => r.priceUSD = Math.round(r.basePriceUSD * 0.90));
    showToast('Early-Bird Promotional Discount Applied (-10%)', 'fa-tag');
  } else {
    HOTEL_DATA.pricingMultiplier = 1.0;
    HOTEL_DATA.rooms.forEach(r => r.priceUSD = r.basePriceUSD);
    showToast('Standard Base Rates Restored', 'fa-undo');
  }

  updateAllPricesInUI();
  renderAdminRoomsTable();
}

// ==========================================
// 10. INTERACTIVE LEAFLET HOTEL MAP
// ==========================================
let hotelMapInstance = null;

function initHotelMap() {
  const mapElem = document.getElementById('hotel-map');
  if (!mapElem || typeof L === 'undefined') return;

  // Côte d'Azur coordinates
  const hotelCoord = [43.6961, 7.2718];

  hotelMapInstance = L.map('hotel-map', {
    center: hotelCoord,
    zoom: 13,
    scrollWheelZoom: false
  });

  L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; OpenStreetMap contributors | Hotelier Sanctuary'
  }).addTo(hotelMapInstance);

  // Custom Hotel Marker
  const hotelIcon = L.divIcon({
    className: 'custom-hotel-marker',
    html: `<div style="background: #c5a059; color: #0b0f17; border: 2px solid #fff; border-radius: 50%; width: 36px; height: 36px; display: flex; align-items: center; justify-content: center; font-size: 16px; box-shadow: 0 4px 15px rgba(0,0,0,0.5);"><i class="fas fa-crown"></i></div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18]
  });

  L.marker(hotelCoord, { icon: hotelIcon })
    .addTo(hotelMapInstance)
    .bindPopup(`
      <div style="font-family: 'Plus Jakarta Sans', sans-serif; padding: 0.5rem; text-align: center;">
        <strong style="color: #0b0f17; font-size: 1.1rem; display: block; font-family: 'Cinzel', serif;">Hotelier Resort & Spa</strong>
        <p style="color: #64748b; font-size: 0.8rem; margin: 0.25rem 0 0.5rem;">Côte d'Azur Oceanfront Sanctuary</p>
        <button onclick="openBookingModal(1)" style="background: #c5a059; color: #0b0f17; border: none; padding: 0.35rem 0.75rem; border-radius: 4px; font-weight: bold; cursor: pointer; font-size: 0.75rem;">
          Book a Suite
        </button>
      </div>
    `)
    .openPopup();

  // Nearby attractions
  const attractions = [
    { name: "Nice Côte d'Azur Airport (18 km)", coords: [43.6653, 7.2150], icon: "fa-plane" },
    { name: "Monaco Harbor & Yacht Club (12 km)", coords: [43.7384, 7.4246], icon: "fa-ship" },
    { name: "Private Coral Reef Beach (0 km)", coords: [43.6930, 7.2750], icon: "fa-umbrella-beach" }
  ];

  attractions.forEach(a => {
    const attIcon = L.divIcon({
      className: 'attraction-marker',
      html: `<div style="background: #17202f; color: #c5a059; border: 1px solid #c5a059; border-radius: 50%; width: 28px; height: 28px; display: flex; align-items: center; justify-content: center; font-size: 12px;"><i class="fas ${a.icon}"></i></div>`,
      iconSize: [28, 28]
    });
    L.marker(a.coords, { icon: attIcon })
      .addTo(hotelMapInstance)
      .bindPopup(`<strong>${a.name}</strong>`);
  });
}

// ==========================================
// 11. AI TRAVEL CONCIERGE & RECOMMENDATIONS
// ==========================================
function initAIChatConcierge() {
  const triggerBtn = document.getElementById('open-ai-concierge-trigger');
  const modal = document.getElementById('ai-concierge-modal');
  const sendBtn = document.getElementById('ai-send-btn');
  const input = document.getElementById('ai-chat-input');
  const chatBox = document.getElementById('ai-chat-messages');

  if (triggerBtn && modal) {
    triggerBtn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden';
    });
  }

  if (sendBtn && input) {
    sendBtn.addEventListener('click', () => handleAISearch(input.value));
    input.addEventListener('keydown', (e) => {
      if (e.key === 'Enter') handleAISearch(input.value);
    });
  }

  document.querySelectorAll('.ai-prompt-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      const query = btn.getAttribute('data-query');
      if (input) input.value = query;
      handleAISearch(query);
    });
  });
}

function handleAISearch(query) {
  if (!query || !query.trim()) return;
  const chatBox = document.getElementById('ai-chat-messages');
  const input = document.getElementById('ai-chat-input');
  if (!chatBox) return;

  // Append user message
  const userMsg = document.createElement('div');
  userMsg.className = 'ai-message user';
  userMsg.textContent = query;
  chatBox.appendChild(userMsg);
  input.value = '';

  // Calculate Explainable Match Score for each room
  // Formula: S(h) = w_b * B(h) + w_l * L(h) + w_a * A(h) + w_r * R(h)
  const qLower = query.toLowerCase();

  const scoredRooms = HOTEL_DATA.rooms.map(room => {
    let budgetScore = 0.8;
    if (qLower.includes('under 800') || qLower.includes('< 800') || qLower.includes('budget')) {
      budgetScore = (room.priceUSD <= 800) ? 1.0 : (room.priceUSD <= 1000 ? 0.5 : 0.2);
    } else if (qLower.includes('under 1000') || qLower.includes('< 1000')) {
      budgetScore = (room.priceUSD <= 1000) ? 1.0 : 0.4;
    }

    let amenityScore = 0.5;
    if (qLower.includes('pool') && room.amenities.some(a => a.toLowerCase().includes('pool'))) amenityScore += 0.3;
    if (qLower.includes('jacuzzi') && room.amenities.some(a => a.toLowerCase().includes('jacuzzi'))) amenityScore += 0.3;
    if (qLower.includes('breakfast') && room.amenities.some(a => a.toLowerCase().includes('breakfast'))) amenityScore += 0.2;
    if (qLower.includes('spa') && (room.category === 'executive' || room.desc.toLowerCase().includes('spa'))) amenityScore += 0.3;

    let locationScore = (room.category === 'villa' || room.desc.toLowerCase().includes('beach')) ? 1.0 : 0.8;
    let ratingScore = room.rating / 5.0;

    const totalScore = Math.round((0.35 * budgetScore + 0.25 * locationScore + 0.25 * amenityScore + 0.15 * ratingScore) * 100);

    return {
      room,
      totalScore,
      budgetScore: Math.round(budgetScore * 100),
      amenityScore: Math.round(amenityScore * 100),
      ratingScore: Math.round(ratingScore * 100)
    };
  });

  scoredRooms.sort((a, b) => b.totalScore - a.totalScore);
  const best = scoredRooms[0];

  setTimeout(() => {
    const botMsg = document.createElement('div');
    botMsg.className = 'ai-message bot';
    botMsg.innerHTML = `
      <div style="margin-bottom: 0.5rem;">
        <span class="status-badge confirmed"><i class="fas fa-brain"></i> AI Recommendation (${best.totalScore}% Match)</span>
      </div>
      <p style="margin-bottom: 0.75rem;">
        Based on your criteria, I strongly recommend the <strong>${best.room.name}</strong> (${formatPrice(best.room.priceUSD)}/night).
      </p>
      <div style="background: var(--dark-bg); padding: 0.75rem; border-radius: 6px; font-size: 0.82rem; margin-bottom: 0.75rem; border: 1px solid var(--dark-border);">
        <strong>Explainable Score Rationale:</strong>
        <div style="margin-top: 0.25rem; color: var(--text-muted);">
          • <strong>Budget Match:</strong> ${best.budgetScore}% (${formatPrice(best.room.priceUSD)}/night)<br>
          • <strong>Amenities Match:</strong> ${best.amenityScore}% (${best.room.amenities.join(', ')})<br>
          • <strong>Guest Rating:</strong> ${best.room.rating}/5.0 (Top 1% Luxury Index)
        </div>
      </div>
      <button class="btn btn-sm" onclick="selectAIRecommendedRoom('${best.room.id}')">
        <i class="fas fa-calendar-check"></i> Reserve This Recommended Suite
      </button>
    `;
    chatBox.appendChild(botMsg);
    chatBox.scrollTop = chatBox.scrollHeight;
  }, 400);
}

function selectAIRecommendedRoom(roomId) {
  document.getElementById('ai-concierge-modal').classList.remove('active');
  HOTEL_DATA.bookingDraft.roomId = roomId;
  openBookingModal(1);
}

// ==========================================
// 12. WISHLIST / SAVED SUITES
// ==========================================
function initWishlistSystem() {
  const trigger = document.getElementById('open-wishlist-trigger');
  const modal = document.getElementById('wishlist-modal');

  if (trigger && modal) {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      openWishlistModal();
    });
  }

  // Update heart buttons active state
  updateWishlistHeartsUI();
}

function toggleWishlist(roomId) {
  let list = JSON.parse(localStorage.getItem('hotelier_wishlist') || '[]');
  if (list.includes(roomId)) {
    list = list.filter(id => id !== roomId);
    showToast('Suite removed from your saved Wishlist.', 'fa-heart-broken');
  } else {
    list.push(roomId);
    showToast('Suite saved to your private Wishlist!', 'fa-heart');
  }
  localStorage.setItem('hotelier_wishlist', JSON.stringify(list));
  updateWishlistHeartsUI();
}

function updateWishlistHeartsUI() {
  const list = JSON.parse(localStorage.getItem('hotelier_wishlist') || '[]');
  document.querySelectorAll('.wishlist-heart-btn').forEach(btn => {
    const roomId = btn.getAttribute('data-room-id');
    if (list.includes(roomId)) {
      btn.classList.add('active');
      btn.innerHTML = '<i class="fas fa-heart"></i>';
    } else {
      btn.classList.remove('active');
      btn.innerHTML = '<i class="far fa-heart"></i>';
    }
  });

  const countBadge = document.getElementById('wishlist-count-badge');
  if (countBadge) countBadge.textContent = list.length;
}

function openWishlistModal() {
  const modal = document.getElementById('wishlist-modal');
  const container = document.getElementById('wishlist-items-container');
  if (!modal || !container) return;

  const list = JSON.parse(localStorage.getItem('hotelier_wishlist') || '[]');
  container.innerHTML = '';

  if (list.length === 0) {
    container.innerHTML = `
      <div style="text-align: center; padding: 2.5rem 1rem; color: var(--text-muted);">
        <i class="far fa-heart" style="font-size: 3rem; color: var(--primary); opacity: 0.4; margin-bottom: 1rem;"></i>
        <h4 style="color: var(--white); font-size: 1.15rem; margin-bottom: 0.5rem;">Your Wishlist is Empty</h4>
        <p style="font-size: 0.85rem;">Click the heart icon on any suite card to save it for your upcoming escape.</p>
      </div>
    `;
  } else {
    list.forEach(roomId => {
      const room = HOTEL_DATA.rooms.find(r => r.id === roomId);
      if (room) {
        const item = document.createElement('div');
        item.className = 'booking-item-card';
        item.innerHTML = `
          <img src="${room.image}" style="width: 80px; height: 60px; object-fit: cover; border-radius: 6px;" />
          <div class="meta" style="flex: 1;">
            <h4>${room.name}</h4>
            <p>${room.capacity} · ${room.size} · ${formatPrice(room.priceUSD)} / night</p>
          </div>
          <div style="display: flex; gap: 0.5rem;">
            <button class="btn btn-sm" onclick="document.getElementById('wishlist-modal').classList.remove('active'); HOTEL_DATA.bookingDraft.roomId='${room.id}'; openBookingModal(1);">
              Book Now
            </button>
            <button class="btn-sm btn-danger" onclick="toggleWishlist('${room.id}'); openWishlistModal();">
              <i class="fas fa-trash"></i>
            </button>
          </div>
        `;
        container.appendChild(item);
      }
    });
  }

  modal.classList.add('active');
  document.body.style.overflow = 'hidden';
}

// ==========================================
// 13. ADVANCED ROOMS SEARCH FILTERS
// ==========================================
function initAdvancedFilters() {
  const priceSlider = document.getElementById('filter-price-range');
  const priceDisplay = document.getElementById('filter-price-display');
  const guestsFilter = document.getElementById('filter-guests-select');

  if (priceSlider && priceDisplay) {
    priceSlider.addEventListener('input', () => {
      priceDisplay.textContent = formatPrice(parseInt(priceSlider.value, 10));
      filterRoomsList();
    });
  }

  if (guestsFilter) {
    guestsFilter.addEventListener('change', filterRoomsList);
  }
}

function filterRoomsList() {
  const priceSlider = document.getElementById('filter-price-range');
  const guestsFilter = document.getElementById('filter-guests-select');

  const maxPrice = priceSlider ? parseInt(priceSlider.value, 10) : 2000;
  const minGuests = guestsFilter ? parseInt(guestsFilter.value, 10) : 1;

  document.querySelectorAll('.room-slider .swiper-slide').forEach(slide => {
    const card = slide.querySelector('.room-card');
    if (!card) return;
    const roomId = card.getAttribute('data-room-id');
    const room = HOTEL_DATA.rooms.find(r => r.id === roomId);

    if (room) {
      const matchPrice = room.priceUSD <= maxPrice;
      const matchGuests = room.capacityNum >= minGuests;
      slide.style.display = (matchPrice && matchGuests) ? 'block' : 'none';
    }
  });

  roomSwiper.update();
}

// Global exposure
window.viewExistingVoucher = viewExistingVoucher;
window.cancelReservation = cancelReservation;
window.openModifyBookingModal = openModifyBookingModal;
window.saveModifiedDates = saveModifiedDates;
window.closeBookingModal = closeBookingModal;
window.openBookingModal = openBookingModal;
window.openMyBookingsModal = openMyBookingsModal;
window.toggleWishlist = toggleWishlist;
window.openWishlistModal = openWishlistModal;
window.selectAIRecommendedRoom = selectAIRecommendedRoom;
window.adminUpdateBookingStatus = adminUpdateBookingStatus;
window.toggleRoomMaintenance = toggleRoomMaintenance;
window.applyDynamicPricingRule = applyDynamicPricingRule;
