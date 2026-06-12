// script.js - Portfolio Interactivity

// Ensure DOM is ready
$(document).ready(function () {
  $(window).on('load', function () {
    $('#loading-screen').remove();
});

  // 2. Typed.js typing effect
  var typed = new Typed('#typed', {
    strings: ['Web Developer', 'Graphics Designer', 'Cyber Security Specialist', 'Software Developer'],
    typeSpeed: 50,
    backSpeed: 30,
    backDelay: 1500,
    loop: true,
  });

  // 3. Particles.js background
  particlesJS('particles-js', {
    "particles": {
      "number": { "value": 80, "density": { "enable": true, "value_area": 800 } },
      "color": { "value": '#00ffff' },
      "shape": { "type": 'circle' },
      "opacity": { "value": 0.5 },
      "size": { "value": 3, "random": true },
      "move": { "enable": true, "speed": 2, "direction": 'none', "out_mode": 'out' }
    },
    "interactivity": {
      "detect_on": 'canvas',
      "events": { "onhover": { "enable": true, "mode": 'repulse' } }
    },
    "retina_detect": true
  });

  // 4. AOS scroll animations initialization
  if (typeof AOS !== 'undefined') {
    AOS.init({
      duration: 800,
      once: true,
    });
  }

  // 5. Smooth scrolling for navigation links
  $('a.nav-link').on('click', function (e) {
    e.preventDefault();
    var target = $(this).attr('href');
    if (target && $(target).length) {
      $('html, body').animate({
        scrollTop: $(target).offset().top - 70
      }, 800);
    }
  });

  // 6. Back-to-top button functionality
  var $backToTop = $('#backToTop');
  $(window).on('scroll', function () {
    if ($(this).scrollTop() > 200) {
      $backToTop.fadeIn();
    } else {
      $backToTop.fadeOut();
    }
    // Sticky navbar
    if ($(this).scrollTop() > 50) {
      $('#mainNav').addClass('scrolled');
    } else {
      $('#mainNav').removeClass('scrolled');
    }
  });
  $backToTop.on('click', function () {
    $('html, body').animate({ scrollTop: 0 }, 600);
    return false;
  });
});
