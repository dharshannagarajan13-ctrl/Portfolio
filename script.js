/**
 * DHARSHAN N - Portfolio Script
 * Modern animations, Canvas Matrix rain, interactive terminal, validation, and AOS triggers.
 */

$(document).ready(function() {
  
  /* --- 1. PRELOADER BOOT SEQUENCE --- */
  const bootMessages = [
    "&gt; SYSTEM: INITIATING SECURE BOOT PROTOCOL...",
    "&gt; LOADING: CORE VIRTUAL SHELL DRIVERS... [OK]",
    "&gt; ESTABLISHING SECURE SSH TUNNEL ON PORT 8080...",
    "&gt; LOADING DESIGN MATRIX ASSETS... [OK]",
    "&gt; CONNECTING DATABASE: TBML_COLLEGE_DATALINK... [SUCCESS]",
    "&gt; READING PROFILE RECORD: 'DHARSHAN N'...",
    "&gt; PARSING PORTFOLIO STACK (HTML5, CSS3, BOOTSTRAP, JS, JQUERY)...",
    "&gt; INTRODUCING WEB DEVELOPER & GRAPHICS DESIGNER HYBRID INTERFACE...",
    "&gt; SECURE SYSTEM DIAGNOSTIC COMPLETED.",
    "&gt; SYSTEM STATE: SECURE // DEPLOYING LANDING PAGE..."
  ];

  let logIndex = 0;
  const logContainer = $("#preloader-log");
  const progressBar = $("#preloader-progress");
  
  function runPreloaderLogs() {
    if (logIndex < bootMessages.length) {
      // Append logs
      logContainer.append(`<div class="terminal-line">${bootMessages[logIndex]}</div>`);
      logContainer.scrollTop(logContainer[0].scrollHeight);
      
      // Update progress bar
      let progressPct = ((logIndex + 1) / bootMessages.length) * 100;
      progressBar.css("width", `${progressPct}%`);
      
      logIndex++;
      setTimeout(runPreloaderLogs, 250);
    } else {
      // Fade out preloader
      setTimeout(function() {
        $("#preloader").fadeOut(600, function() {
          $(this).remove();
          // Initialize AOS animations on scroll once preloader vanishes
          AOS.init({
            duration: 800,
            easing: 'ease-in-out',
            once: true,
            mirror: false
          });
          // Start skills animation check
          animateSkillsProgress();
        });
      }, 500);
    }
  }
  
  runPreloaderLogs();

  /* --- 2. MATRIX RAIN EFFECT --- */
  const canvas = document.getElementById("bg-canvas");
  const ctx = canvas.getContext("2d");

  // Resize canvas to cover screen
  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  $(window).resize(resizeCanvas);

  // Characters to draw
  const charString = "010101ABCDEFGHIJKLMNOPQRSTUVWXYZ@#$%&*+%";
  const characters = charString.split("");
  
  const fontSize = 14;
  let columns = canvas.width / fontSize;
  
  // Track drops
  let drops = [];
  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  // Draw rain
  function drawMatrix() {
    // Semi-transparent black to fade characters slowly
    ctx.fillStyle = "rgba(5, 10, 24, 0.08)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Set text color and font
    ctx.font = fontSize + "px monospace";
    
    for (let i = 0; i < drops.length; i++) {
      // Pick a random color: blue or green tint
      if (Math.random() > 0.5) {
        ctx.fillStyle = "#00FF95"; // Neon Green
      } else {
        ctx.fillStyle = "#00E5FF"; // Neon Blue
      }
      
      // Random character
      const text = characters[Math.floor(Math.random() * characters.length)];
      
      // x coordinate, y coordinate
      const x = i * fontSize;
      const y = drops[i] * fontSize;
      
      ctx.fillText(text, x, y);
      
      // Reset drop to top if it leaves page bounds
      if (y > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);

  /* --- 3. DYNAMIC SCROLL ACTIONS --- */
  $(window).scroll(function() {
    if ($(this).scrollTop() > 50) {
      $("#navbar").addClass("navbar-scrolled");
    } else {
      $("#navbar").removeClass("navbar-scrolled");
    }
    
    // Check viewport for active nav-link highlighting
    const scrollPos = $(document).scrollTop();
    $(".nav-link").each(function() {
      const currLink = $(this);
      const refElement = $(currLink.attr("href"));
      if (refElement.length) {
        const topPos = refElement.position().top - 150;
        const bottomPos = topPos + refElement.outerHeight();
        
        if (scrollPos >= topPos && scrollPos < bottomPos) {
          $(".nav-link").removeClass("active");
          currLink.addClass("active");
        }
      }
    });

    // Check viewport for counters
    animateCounters();
    
    // Check viewport for skills progress bars
    animateSkillsProgress();
  });

  /* --- 4. TYPING DESIGNATION EFFECT --- */
  const titles = ["Web Developer", "Graphics Designer", "Creative Designer"];
  let titleIdx = 0;
  let charIdx = 0;
  let isDeleting = false;
  const typeContainer = $("#typing-text");
  
  function typeWords() {
    const currentTitle = titles[titleIdx];
    
    if (isDeleting) {
      typeContainer.text(currentTitle.substring(0, charIdx - 1));
      charIdx--;
    } else {
      typeContainer.text(currentTitle.substring(0, charIdx + 1));
      charIdx++;
    }
    
    let typeSpeed = isDeleting ? 60 : 120;
    
    if (!isDeleting && charIdx === currentTitle.length) {
      typeSpeed = 1500; // Pause at end of word
      isDeleting = true;
    } else if (isDeleting && charIdx === 0) {
      isDeleting = false;
      titleIdx = (titleIdx + 1) % titles.length;
      typeSpeed = 500; // Pause before writing next word
    }
    
    setTimeout(typeWords, typeSpeed);
  }

  // Kick off typing sequence
  setTimeout(typeWords, 1500);

  /* --- 5. INTERACTIVE TERMINAL SIMULATOR --- */
  const terminalInput = $("#terminal-cmd-input");
  const terminalOutput = $("#terminal-output-log");
  const terminalBody = $("#terminal-body-scroll");

  terminalInput.keydown(function(e) {
    if (e.key === "Enter") {
      let inputVal = $(this).val().trim();
      $(this).val(""); // Clear input bar
      
      if (inputVal === "") return;
      
      // Append the command entered by visitor
      terminalOutput.append(`
        <div class="terminal-line">
          <span class="prompt-prefix">visitor@dharshan-pc:~$</span> <span class="prompt-cmd">${escapeHtml(inputVal)}</span>
        </div>
      `);
      
      // Process Command
      processTerminalCommand(inputVal.toLowerCase());
      
      // Scroll to bottom
      terminalBody.animate({ scrollTop: terminalBody[0].scrollHeight }, 200);
    }
  });

  function escapeHtml(text) {
    return text
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function processTerminalCommand(cmd) {
    let response = "";
    
    switch (cmd) {
      case "help":
        response = `Available commands:<br>
          - <span class="text-info">about</span> : Brief biography<br>
          - <span class="text-info">skills</span> : Show core technical skills<br>
          - <span class="text-info">education</span> : Academic background details<br>
          - <span class="text-info">clear</span> : Reset screen log`;
        break;
      case "about":
      case "whoami":
        response = `Dharshan N. Web Developer & Graphic Designer. B.Sc graduate from TBML College. 
          Expertise in responsive design and high-end aesthetics.`;
        break;
      case "skills":
        response = `<span class="text-warning">FRONTEND:</span> HTML5, CSS3, JavaScript (ES6+), Bootstrap 5, jQuery.<br>
          <span class="text-success">CREATIVE:</span> Graphic Design, UI/UX Layouts, Branding, Vector Illustration.`;
        break;
      case "education":
        response = `B.Sc (Bachelor of Science) // TBML College.<br>
          Focused on Computer Science, Algorithmic Logic, Database Systems.`;
        break;
      case "clear":
        terminalOutput.html("");
        return;
      default:
        response = `<span class="text-danger">Command not found: '${escapeHtml(cmd)}'.</span> Type <span class="text-info">help</span> for a list of valid commands.`;
    }
    
    terminalOutput.append(`<div class="terminal-line">${response}</div>`);
  }

  /* --- 6. ANIMATED VISUAL COUNTERS --- */
  let countersStarted = false;
  
  function animateCounters() {
    if (countersStarted) return;
    
    const countersSection = $(".about-stats");
    if (countersSection.length === 0) return;
    
    const docHeight = $(window).height();
    const sectionTop = countersSection.offset().top;
    const scrollTop = $(window).scrollTop();
    
    if (scrollTop + docHeight > sectionTop + 100) {
      countersStarted = true;
      $(".counter").each(function() {
        const $this = $(this);
        const target = parseInt($this.attr("data-target"));
        
        $({ countNum: 0 }).animate({ countNum: target }, {
          duration: 2000,
          easing: "swing",
          step: function() {
            $this.text(Math.floor(this.countNum));
          },
          complete: function() {
            $this.text(target + "+");
          }
        });
      });
    }
  }

  /* --- 7. SKILLS PROGRESS ANIMATION --- */
  let skillsAnimated = false;

  function animateSkillsProgress() {
    if (skillsAnimated) return;
    
    const skillsSection = $("#skills");
    if (skillsSection.length === 0) return;
    
    const docHeight = $(window).height();
    const sectionTop = skillsSection.offset().top;
    const scrollTop = $(window).scrollTop();
    
    if (scrollTop + docHeight > sectionTop + 150) {
      skillsAnimated = true;
      $(".progress-bar-fill").each(function() {
        const targetPercent = $(this).attr("data-percent");
        $(this).css("width", targetPercent);
      });
    }
  }

  /* --- 8. CONTACT FORM VALIDATION & ENCRYPTION MOCK --- */
  const contactForm = $("#contact-form");
  const statusMsg = $("#form-status-msg");

  contactForm.submit(function(e) {
    e.preventDefault();
    
    const nameInput = $("#form-name");
    const emailInput = $("#form-email");
    const messageInput = $("#form-message");
    
    let isNameValid = nameInput.val().trim().length >= 3;
    let emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    let isEmailValid = emailPattern.test(emailInput.val().trim());
    let isMessageValid = messageInput.val().trim().length >= 10;
    
    // Clear status classes
    statusMsg.removeClass("success error").hide();
    
    // Apply UI classes for validation state
    toggleInputValidation(nameInput, isNameValid);
    toggleInputValidation(emailInput, isEmailValid);
    toggleInputValidation(messageInput, isMessageValid);
    
    if (isNameValid && isEmailValid && isMessageValid) {
      // Show transmission status
      statusMsg.addClass("success").text("TRANSMITTING ENCRYPTED PACKET... PLEASE WAIT.").fadeIn();
      
      // Simulate API transit
      setTimeout(function() {
        statusMsg.text("TRANSMISSION SECURE: MESSAGE ENCRYPTED AND TRANSMITTED SUCCESSFULLY.");
        
        // Reset form inputs
        nameInput.val("").removeClass("is-valid is-invalid");
        emailInput.val("").removeClass("is-valid is-invalid");
        messageInput.val("").removeClass("is-valid is-invalid");
      }, 1500);
      
    } else {
      statusMsg.addClass("error").text("TRANSMISSION ERROR: PACKET CONTAINS INVALID FIELDS. PLEASE AMEND.").fadeIn();
    }
  });

  function toggleInputValidation(element, isValid) {
    if (isValid) {
      element.removeClass("is-invalid").addClass("is-valid");
      element.css("border-color", "var(--neon-green)");
    } else {
      element.removeClass("is-valid").addClass("is-invalid");
      element.css("border-color", "#ff5f56");
    }
  }

  // Remove status outline on focus
  $(".cyber-input").focus(function() {
    $(this).css("border-color", "var(--neon-blue)");
  });

  // Resume Download Button Alert Action
  $("#download-resume-btn").click(function(e) {
    // Notify terminal or alert user briefly
    const date = new Date().toLocaleString();
    console.log(`[Resume Download Tracked]: ${date}`);
  });
});
