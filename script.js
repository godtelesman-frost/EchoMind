// script.js

// =========================
// ECHOMIND FULL SYSTEM
// =========================

// TASK ELEMENTS

const taskInput =
document.getElementById("taskInput");

const addTaskBtn =
document.getElementById("addTaskBtn");

const taskList =
document.getElementById("taskList");

const completedCount =
document.getElementById("completedCount");

const remainingCount =
document.getElementById("remainingCount");

// =========================
// LOAD TASKS
// =========================

let tasks =
JSON.parse(
  localStorage.getItem("echomindTasks")
) || [];

// =========================
// SAVE TASKS
// =========================

function saveTasks(){

  localStorage.setItem(
    "echomindTasks",
    JSON.stringify(tasks)
  );

}

// =========================
// UPDATE STATS
// =========================

function updateStats(){

  const completed =
  tasks.filter(task => task.completed).length;

  completedCount.textContent =
  completed;

  remainingCount.textContent =
  tasks.length - completed;

}

// =========================
// RENDER TASKS
// =========================

function renderTasks(){

  taskList.innerHTML = "";

  tasks.forEach((task,index) => {

    const li =
    document.createElement("li");

    li.classList.add("task");

    if(task.completed){

      li.classList.add("completed");

    }

    li.innerHTML = `

      <div class="task-left">

        <input
          type="checkbox"
          ${task.completed ? "checked" : ""}
        >

        <span>${task.text}</span>

      </div>

      <button class="delete-btn">
        Delete
      </button>

    `;

    // COMPLETE TASK

    const checkbox =
    li.querySelector("input");

    checkbox.addEventListener("change", () => {

      tasks[index].completed =
      checkbox.checked;

      saveTasks();

      renderTasks();

    });

    // DELETE TASK

    const deleteBtn =
    li.querySelector(".delete-btn");

    deleteBtn.addEventListener("click", () => {

      tasks.splice(index,1);

      saveTasks();

      renderTasks();

    });

    taskList.appendChild(li);

  });

  updateStats();

}

// =========================
// ADD TASK
// =========================

if(addTaskBtn){

  addTaskBtn.addEventListener("click", () => {

    const taskText =
    taskInput.value.trim();

    if(taskText === "") return;

    tasks.push({

      text: taskText,

      completed:false

    });

    taskInput.value = "";

    saveTasks();

    renderTasks();

  });

}

// =========================
// ENTER KEY
// =========================

if(taskInput){

  taskInput.addEventListener(
    "keypress",
    (e) => {

      if(e.key === "Enter"){

        addTaskBtn.click();

      }

    }
  );

}

// =========================
// INITIAL RENDER
// =========================

if(taskList){

  renderTasks();

}

// =========================
// BUTTON EFFECTS
// =========================

const buttons =
document.querySelectorAll(
  ".primary-btn, .secondary-btn, .nav-btn"
);

buttons.forEach((button) => {

  button.addEventListener(
    "mouseenter",
    () => {

      button.style.opacity = "0.9";

    }
  );

  button.addEventListener(
    "mouseleave",
    () => {

      button.style.opacity = "1";

    }
  );

});

// =========================
// PRODUCTIVITY BAR
// =========================

const progress =
document.querySelector(".progress");

let width = 0;

function animateProgress(){

  if(!progress){
    return;
  }

  if(width >= 82){

    clearInterval(loader);

  }else{

    width++;

    progress.style.width =
    width + "%";

  }

}

let loader =
setInterval(animateProgress,20);

// =========================
// POMODORO TIMER
// =========================

const timerElement =
document.querySelectorAll("h2");

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

    String(minutes).padStart(2,"0")
    +
    ":"
    +
    String(seconds).padStart(2,"0");

  timerElement.forEach((item) => {

    if(item.textContent.includes(":")){

      item.textContent =
      formattedTime;

    }

  });

}

setInterval(updateTimer,1000);

// =========================
// SCROLL ANIMATION
// =========================

const cards =
document.querySelectorAll(

  ".feature-card, \
  .dashboard-card, \
  .price-card, \
  .testimonial-card"

);

window.addEventListener("scroll", () => {

  cards.forEach((card) => {

    const cardTop =
    card.getBoundingClientRect().top;

    if(cardTop < window.innerHeight - 100){

      card.style.opacity = "1";

      card.style.transform =
      "translateY(0)";

    }

  });

});

// INITIAL CARD STATE

cards.forEach((card) => {

  card.style.opacity = "0";

  card.style.transform =
  "translateY(40px)";

  card.style.transition =
  "0.6s ease";

});

// =========================
// AI MESSAGE
// =========================

const aiMessage =
document.querySelector(".ai");

setTimeout(() => {

  if(aiMessage){

    aiMessage.innerHTML =
    "I created a smart study recovery plan based on your exams.";

  }

},3000);

// =========================
// READY
// =========================

window.onload = () => {

  console.log(
    "EchoMind Fully Ready"
  );

};
