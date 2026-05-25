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
// ADD THIS TO BOTTOM OF script.js

// =========================
// REAL POMODORO TIMER
// =========================

const pomodoroTime =
document.getElementById("pomodoroTime");

const startTimer =
document.getElementById("startTimer");

const pauseTimer =
document.getElementById("pauseTimer");

const resetTimer =
document.getElementById("resetTimer");

let timer;
let totalSeconds = 1500;

function updatePomodoro(){

  const minutes =
  Math.floor(totalSeconds / 60);

  const seconds =
  totalSeconds % 60;

  pomodoroTime.textContent =
    String(minutes).padStart(2,"0")
    +
    ":"
    +
    String(seconds).padStart(2,"0");

}

if(startTimer){

  startTimer.addEventListener("click", () => {

    clearInterval(timer);

    timer = setInterval(() => {

      if(totalSeconds > 0){

        totalSeconds--;

        updatePomodoro();

      }

    },1000);

  });

}

if(pauseTimer){

  pauseTimer.addEventListener("click", () => {

    clearInterval(timer);

  });

}

if(resetTimer){

  resetTimer.addEventListener("click", () => {

    clearInterval(timer);

    totalSeconds = 1500;

    updatePomodoro();

  });

}

updatePomodoro();

// =========================
// DAILY SCHEDULE
// =========================

const scheduleTime =
document.getElementById("scheduleTime");

const scheduleTask =
document.getElementById("scheduleTask");

const addScheduleBtn =
document.getElementById("addScheduleBtn");

const scheduleList =
document.getElementById("scheduleList");

let schedules =
JSON.parse(
  localStorage.getItem("echomindSchedules")
) || [];

function saveSchedules(){

  localStorage.setItem(
    "echomindSchedules",
    JSON.stringify(schedules)
  );

}

function renderSchedules(){

  if(!scheduleList) return;

  scheduleList.innerHTML = "";

  schedules.forEach((schedule,index) => {

    const li =
    document.createElement("li");

    li.classList.add("schedule-item");

    li.innerHTML = `
      <span>
        ${schedule.time} - ${schedule.task}
      </span>

      <button onclick="deleteSchedule(${index})">
        Delete
      </button>
    `;

    scheduleList.appendChild(li);

  });

}

window.deleteSchedule = function(index){

  schedules.splice(index,1);

  saveSchedules();

  renderSchedules();

}

if(addScheduleBtn){

  addScheduleBtn.addEventListener("click", () => {

    if(
      scheduleTime.value === "" ||
      scheduleTask.value === ""
    ) return;

    schedules.push({

      time:scheduleTime.value,

      task:scheduleTask.value

    });

    saveSchedules();

    renderSchedules();

    scheduleTime.value = "";

    scheduleTask.value = "";

  });

}

renderSchedules();

// =========================
// STREAK SYSTEM
// =========================

const streakCount =
document.getElementById("streakCount");

const increaseStreak =
document.getElementById("increaseStreak");

let streak =
localStorage.getItem("echomindStreak")
|| 0;

streakCount.textContent =
streak + " 🔥";

if(increaseStreak){

  increaseStreak.addEventListener("click", () => {

    streak++;

    localStorage.setItem(
      "echomindStreak",
      streak
    );

    streakCount.textContent =
    streak + " 🔥";

  });

}

// =========================
// AI STUDY GENERATOR
// =========================

const generatePlanBtn =
document.getElementById("generatePlanBtn");

const examInput =
document.getElementById("examInput");

const studyPlanOutput =
document.getElementById("studyPlanOutput");

if(generatePlanBtn){

  generatePlanBtn.addEventListener("click", () => {

    const value =
    examInput.value;

    studyPlanOutput.innerHTML = `

      <h3>Generated Study Plan</h3>

      <p>
        Morning:
        Revision and active recall.
      </p>

      <p>
        Afternoon:
        Practice problems and mock tests.
      </p>

      <p>
        Evening:
        Weak topic revision and summaries.
      </p>

      <p>
        Night:
        Quick recap and planning for tomorrow.
      </p>

    `;

  });

}



// =========================
// GEMINI AI
// =========================

const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

const chatMessages =
document.getElementById("chatMessages");

// PASTE YOUR REAL KEY HERE

const API_KEY =
"AIzaSyC5_gEauON-7vaTcxf-e6oDYn5jsjm3oEw";

async function sendMessage(){

  const message =
  userInput.value.trim();

  if(message === "") return;

  // USER MESSAGE

  const userDiv =
  document.createElement("div");

  userDiv.classList.add("user-message");

  userDiv.textContent =
  message;

  chatMessages.appendChild(userDiv);

  // CLEAR INPUT

  userInput.value = "";

  // AI LOADING

  const aiDiv =
  document.createElement("div");

  aiDiv.classList.add("ai-message");

  aiDiv.textContent =
  "Thinking...";

  chatMessages.appendChild(aiDiv);

  try{

    const response =
    await fetch(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key="
+ API_KEY,
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

         contents: [
  {
    role: "user",
    parts: [
      {
        text:
        "You are EchoMind AI, a smart student productivity assistant. Help students with studying, schedules, exams, focus, routines, productivity and motivation. User message: "
        + message
      }
    ]
  }
]

    const data =
    await response.json();

    console.log(data);

    if(data.candidates){

      aiDiv.textContent =
      data.candidates[0]
      .content.parts[0].text;

    }else{

      aiDiv.textContent =
      "Gemini API error.";

    }

  }catch(error){

    console.log(error);

    aiDiv.textContent =
    "Error connecting to EchoMind AI.";

  }

}
// =========================
// AI BUTTON EVENTS
// =========================

if(sendBtn){

  sendBtn.addEventListener(
    "click",
    sendMessage
  );

}

if(userInput){

  userInput.addEventListener(
    "keypress",
    function(e){

      if(e.key === "Enter"){

        sendMessage();

      }

    }
  );

}
