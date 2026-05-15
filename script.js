// script.js

// =========================
// ECHOMIND SCRIPT
// =========================

// Smooth Welcome Message

console.log("EchoMind Loaded Successfully");

// =========================
// BUTTON INTERACTIONS
// =========================

const buttons = document.querySelectorAll(
  ".primary-btn, .secondary-btn, .nav-btn"
);

buttons.forEach((button) => {

  button.addEventListener("mouseenter", () => {

    button.style.opacity = "0.9";

  });

  button.addEventListener("mouseleave", () => {

    button.style.opacity = "1";

  });

});

// =========================
// FAKE LIVE PRODUCTIVITY
// =========================

progress.style.width = width + "%";

let width = 0;

function animateProgress(){

  if(width >= 82){

    clearInterval(loader);

  }else{

    width++;

    progress.style.width = width + "%";

  }

}

let loader = setInterval(animateProgress, 20);

// =========================
// FAKE TIMER
// =========================

const timerElement = document.querySelectorAll("h2");

let minutes = 25;
let seconds = 0;

function updateTimer(){

  if(seconds === 0){

    if(minutes === 0){

      minutes = 25;
      seconds = 0;

    }else{

      minutes--;
      seconds = 59;

    }

  }else{

    seconds--;

  }

  const formattedTime =
    String(minutes).padStart(2,"0") +
    ":" +
    String(seconds).padStart(2,"0");

  timerElement.forEach((item) => {

    if(item.textContent.includes(":")){

      item.textContent = formattedTime;

    }

  });

}

setInterval(updateTimer,1000);

// =========================
// SCROLL ANIMATION
// =========================

const cards = document.querySelectorAll(
  ".feature-card, .dashboard-card, .price-card, .testimonial-card"
);

window.addEventListener("scroll", () => {

  cards.forEach((card) => {

    const cardTop = card.getBoundingClientRect().top;

    if(cardTop < window.innerHeight - 100){

      card.style.opacity = "1";
      card.style.transform = "translateY(0)";

    }

  });

});

// Initial Hidden State

cards.forEach((card) => {

  card.style.opacity = "0";
  card.style.transform = "translateY(40px)";
  card.style.transition = "0.6s ease";

});

// =========================
// AI CHAT EFFECT
// =========================

const aiMessage = document.querySelector(".ai");

setTimeout(() => {

  if(aiMessage){

    aiMessage.innerHTML =
      "I created a smart study recovery plan based on your exams.";

  }

},3000);

// =========================
// PAGE READY
// =========================

window.onload = () => {

  console.log("EchoMind Fully Ready");

};
