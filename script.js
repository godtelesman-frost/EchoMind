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
// DEMO AI CHAT
// =========================
let conversationHistory = [

  {
    role: "system",
    content: `
You are EchoMind AI.
You are an advanced AI assistant.
Give detailed answers and help students with studying, coding, exams and productivity.
`
  }

];


// =========================
// REAL AI CHAT
// =========================

const sendBtn =
document.getElementById("sendBtn");

const userInput =
document.getElementById("userInput");

const chatMessages =
document.getElementById("chatMessages");

async function sendMessage(){

  const message =
  userInput.value.trim();

  if(message === ""){
    return;
  }

  const userDiv =
  document.createElement("div");

  userDiv.classList.add("user-message");

  userDiv.textContent =
  message;

  chatMessages.appendChild(userDiv);

  userInput.value = "";

  const aiDiv =
  document.createElement("div");

  aiDiv.classList.add("ai-message");

  aiDiv.textContent =
  "Thinking...";

  chatMessages.appendChild(aiDiv);

  try{

    const response =
    await fetch(
      "https://echomind-api.godtelesman.workers.dev",
      {
        method: "POST",

        headers: {
          "Content-Type":
          "application/json"
        },

        body: JSON.stringify({

          messages: [

            {
              role: "system",
              content:
              "You are EchoMind AI. You help students with studying, coding, productivity, exams, schedules and learning. Give detailed helpful answers."
            },

            {
              role: "user",
              content: message
            }

          ]

        })

      }
    );

const data =
await response.json();

console.log(data);

if(data.error){

  aiDiv.textContent =
  "API Error: " +
  data.error.message;

  return;
}

aiDiv.textContent =
data.choices[0].message.content;

  }catch(error){

    console.log(error);

    aiDiv.textContent =
    "Error connecting to AI.";

  }

  chatMessages.scrollTop =
  chatMessages.scrollHeight;

}

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
login.html:
<!-- login.html -->

<!DOCTYPE html>
<html lang="en">

<head>

  <meta charset="UTF-8">

  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>EchoMind Login</title>

  <style>

    *{
      margin:0;
      padding:0;
      box-sizing:border-box;
    }

    body{
      font-family:Arial,sans-serif;
      background:#070b17;
      color:white;
      display:flex;
      justify-content:center;
      align-items:center;
      min-height:100vh;
    }

    .login-box{
      width:400px;
      background:#111827;
      padding:40px;
      border-radius:20px;
      text-align:center;
      box-shadow:0 0 30px rgba(124,58,237,0.4);
    }

    h1{
      margin-bottom:20px;
      color:#8b5cf6;
    }

    p{
      margin-top:15px;
    }

    button{
      width:100%;
      padding:15px;
      border:none;
      border-radius:12px;
      background:#7c3aed;
      color:white;
      font-weight:bold;
      cursor:pointer;
      margin-top:20px;
      transition:0.3s;
    }

    button:hover{
      transform:translateY(-3px);
    }

    #user{
      color:#cbd5e1;
      margin-top:25px;
    }

  </style>

</head>

<body>

  <div class="login-box">

    <h1>EchoMind</h1>

    <p>
      Continue with Google
    </p>

    <button id="loginBtn">
      Sign In With Google
    </button>

    <button id="logoutBtn">
      Logout
    </button>

    <p id="user">
      Not Logged In
    </p>

  </div>

  <script type="module">

    import { initializeApp }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";

    import {
      getAuth,
      GoogleAuthProvider,
      signInWithPopup,
      signOut,
      onAuthStateChanged
    }
    from "https://www.gstatic.com/firebasejs/10.12.2/firebase-auth.js";

    // REPLACE THESE WITH YOUR FIREBASE VALUES

    const firebaseConfig = {
  apiKey: "AIzaSyAt-wTjR617jZOOi5pHHNp22VGc5-j9HrM",
  authDomain: "echomind-e4e8f.firebaseapp.com",
  projectId: "echomind-e4e8f",
  storageBucket: "echomind-e4e8f.firebasestorage.app",
  messagingSenderId: "257680949964",
  appId: "1:257680949964:web:b6d5ce92c99b4f65867869",
  measurementId: "G-5WHN59PNPV"
    };

    // INITIALIZE FIREBASE

    const app = initializeApp(firebaseConfig);

    const auth = getAuth(app);

    const provider = new GoogleAuthProvider();

    // ELEMENTS

    const loginBtn = document.getElementById("loginBtn");

    const logoutBtn = document.getElementById("logoutBtn");

    const userText = document.getElementById("user");

    // GOOGLE LOGIN

    loginBtn.addEventListener("click", () => {

      signInWithPopup(auth, provider)

      .then((result) => {

        const user = result.user;

        userText.innerHTML =
userText.innerHTML =
  "Logged in as: " + user.email;

// REDIRECT TO HOME PAGE

setTimeout(() => {

  window.location.href =
    "index.html";

},1000);    

      })

      .catch((error) => {

        alert(error.message);

      });

    });

    // LOGOUT

    logoutBtn.addEventListener("click", () => {

      signOut(auth)

      .then(() => {

        userText.innerHTML = "Not Logged In";

      });

    });

    // AUTO LOGIN CHECK

    onAuthStateChanged(auth, (user) => {

      if(user){

  userText.innerHTML =
    "Logged in as: " + user.email;

  setTimeout(() => {

    window.location.href =
      "index.html";

  },1000);

}else{
      

        userText.innerHTML =
          "Not Logged In";

      }

    });

  </script>

</body>

</html>
