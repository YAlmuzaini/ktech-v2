(function () {
  "use strict";

  new fullpage("#fullpage", {
    //options here
    autoScrolling: true,
    scrollHorizontally: true,
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
