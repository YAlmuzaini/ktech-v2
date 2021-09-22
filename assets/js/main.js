(function () {
  "use strict";
  /**
   * Easy selector helper function
   */
  const select = (el, all = false) => {
    el = el.trim();
    if (all) {
      return [...document.querySelectorAll(el)];
    } else {
      return document.querySelector(el);
    }
  };

  /**
   * Easy event listener function
   */
  const on = (type, el, listener, all = false) => {
    let selectEl = select(el, all);
    if (selectEl) {
      if (all) {
        selectEl.forEach((e) => e.addEventListener(type, listener));
      } else {
        selectEl.addEventListener(type, listener);
      }
    }
  };

  /**
   * Easy on scroll event listener
   */
  const onscroll = (el, listener) => {
    el.addEventListener("scroll", listener);
  };

  /**
   * Navbar links active state on scroll
   */
  let navbarlinks = select("#navbar .scrollto", true);
  const navbarlinksActive = () => {
    let position = window.scrollY + 200;
    navbarlinks.forEach((navbarlink) => {
      if (!navbarlink.hash) return;
      let section = select(navbarlink.hash);
      if (!section) return;
      if (
        position >= section.offsetTop &&
        position <= section.offsetTop + section.offsetHeight
      ) {
        navbarlink.classList.add("active");
      } else {
        navbarlink.classList.remove("active");
      }
    });
  };
  window.addEventListener("load", navbarlinksActive);
  onscroll(document, navbarlinksActive);

  /**
   * Scrolls to an element with header offset
   */
  const scrollto = (el) => {
    let header = select("#navigation-bar");
    let offset = header.offsetHeight;

    if (!header.classList.contains("header-scrolled")) {
      offset -= 20;
    }

    let elementPos = select(el).offsetTop;
    window.scrollTo({
      top: elementPos - offset,
      behavior: "smooth",
    });
  };

  /**
   * Toggle .header-scrolled class to #header when page is scrolled
   */
  let selectHeader = select("#navigation-bar");
  if (selectHeader) {
    const headerScrolled = () => {
      if (window.scrollY > 100) {
        selectHeader.classList.add("header-scrolled");
      } else {
        selectHeader.classList.remove("header-scrolled");
      }
    };
    window.addEventListener("load", headerScrolled);
    onscroll(document, headerScrolled);
  }
  
  /**
   * Back to top button
   */
  let backtotop = select(".back-to-top");
  if (backtotop) {
    const toggleBacktotop = () => {
      if (window.scrollY > 100) {
        backtotop.classList.add("active");
      } else {
        backtotop.classList.remove("active");
      }
    };
    window.addEventListener("load", toggleBacktotop);
    onscroll(document, toggleBacktotop);
  }

  /**
   * Mobile nav toggle
   */
  on("click", ".mobile-nav-toggle", function (e) {
    select("#navbar").classList.toggle("navbar-mobile");
    this.classList.toggle("bi-list");
    this.classList.toggle("bi-x");
  });

  /**
   * Mobile nav dropdowns activate
   */
  on(
    "click",
    ".navbar .dropdown > a",
    function (e) {
      if (select("#navbar").classList.contains("navbar-mobile")) {
        e.preventDefault();
        this.nextElementSibling.classList.toggle("dropdown-active");
      }
    },
    true
  );

  /**
   * Scrool with ofset on links with a class name .scrollto
   */
  on(
    "click",
    ".scrollto",
    function (e) {
      if (select(this.hash)) {
        e.preventDefault();

        let navbar = select("#navbar");
        if (navbar.classList.contains("navbar-mobile")) {
          navbar.classList.remove("navbar-mobile");
          let navbarToggle = select(".mobile-nav-toggle");
          navbarToggle.classList.toggle("bi-list");
          navbarToggle.classList.toggle("bi-x");
        }
        scrollto(this.hash);
      }
    },
    true
  );

  /**
   * Scroll with ofset on page load with hash links in the url
   */
  // window.addEventListener("load", () => {
  //   if (window.location.hash) {
  //     if (select(window.location.hash)) {
  //       scrollto(window.location.hash);
  //     }
  //   }
  // });

  /**
   * Preloader
   */
  let preloader = select("#preloader");
  if (preloader) {
    window.addEventListener("load", () => {
      preloader.remove();
    });
  }

  /**
   * Animation on scroll
   */
  window.addEventListener("load", () => {
    AOS.init({
      duration: 1000,
      easing: "ease-in-out",
      once: true,
      mirror: false,
    });
  });

  var g_interval;
  new fullpage("#fullpage", {
    //options here
    autoScrolling: true,
    scrollHorizontally: true,
    slideSelector: ".mySlide",
    anchors: ["firstPage", "secondPage", "thirdPage", "fourthPage"],
    afterLoad: function (origin, destination, direction) {
      var leavingSection = this;
      var mysection = fullpage_api.getActiveSection();
      if (selectHeader) {
        if (mysection.index > 0) {
          selectHeader.classList.add("header-scrolled");
        } else {
          selectHeader.classList.remove("header-scrolled");
        }
      }

      select("#nav-menuBtn").addEventListener("click", () => {
        if (select("#nav-menuBtn").checked) {
          fullpage_api.setAllowScrolling(false);
        } else {
          fullpage_api.setAllowScrolling(true);
        }
      });

      clearInterval(g_interval);
      const lapse = 7000;

      if (destination.item.querySelectorAll(".fp-slides").length) {
        g_interval = setInterval(function () {
          fullpage_api.moveSlideRight();
        }, lapse);
      }
    },
  });

  let side1 = document.querySelector(".nav-side-right");
  let side2 = document.querySelector(".nav-side-left");
  let overlay = document.querySelector(".nav-menu_overlay");
  let open = document.querySelector(".fa-bars");
  let close = document.querySelector(".fa-times");
  let list = document.querySelectorAll(".nav-li");
  let textSide2 = document.querySelector(".nav-textSide2");
  let icon = document.querySelector(".nav-icon");

  open.addEventListener("click", () => {
    overlay.style.transform = "translateY(0%)";
    side2.style.transform = "translateX(0%)";
    side1.style.transform = "translateY(0%)";
  });

  close.addEventListener("click", () => {
    overlay.style.transform = "translateY(-110%)";
    side1.style.transform = "translateY(100%)";
    side2.style.transform = "translateX(-100%)";
  });

  list.forEach((elem) => {
    elem.addEventListener("mouseover", (e) => {
      let val = e.target.textContent;
      textSide2.textContent = val;
      if (val == "Home") {
        icon.innerHTML = `<i class="fas fa-home"></i>`;
      }
      if (val == "About") {
        icon.innerHTML = `<i class="fas fa-user-ninja"></i>`;
      }
      if (val == "Projects") {
        icon.innerHTML = `<i class="fas fa-code-branch"></i>`;
      }
      if (val == "Contact") {
        icon.innerHTML = `<i class="fas fa-address-book"></i>`;
      }
    });

    elem.addEventListener("mouseleave", (e) => {
      textSide2.textContent = "";
      icon.innerHTML = "";
    });
  });
})();
