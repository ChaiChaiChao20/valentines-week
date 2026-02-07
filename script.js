/************* CONFIG *************/
const PASSWORD = "250725";

const daysConfig = [
  { id: "rose", unlock: "2026-02-07" },
  { id: "propose", unlock: "2026-02-08" },
  { id: "chocolate", unlock: "2026-02-09" },
  { id: "teddy", unlock: "2026-02-10" },
  { id: "promise", unlock: "2026-02-11" },
  { id: "hug", unlock: "2026-02-12" },
  { id: "kiss", unlock: "2026-02-13" }
];

/************* LOCK / UNLOCK DAYS *************/
function initDays() {
  const now = new Date();

  daysConfig.forEach(day => {
    const box = document.getElementById(day.id);
    if (!box) return;

    const unlockDate = new Date(day.unlock + "T00:00:00");

    if (now >= unlockDate) {
      box.classList.remove("locked");
      box.querySelector(".status").innerText = "Open 💖";
    } else {
      const diff = unlockDate - now;
      const hrs = Math.floor(diff / (1000 * 60 * 60));
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      box.classList.add("locked");
      box.querySelector(".status").innerText =
        `Unlocks in ${hrs}h ${mins}m ⏳`;
    }
  });
}

setInterval(initDays, 60000);
window.onload = initDays;

/************* PASSWORD UNLOCK *************/
function unlockWithPassword(dayId) {
  const input = prompt("Enter password 💌");

  if (input === PASSWORD) {
    window.location.href = `${dayId}.html`;
  } else {
    alert("Wrong password 😤");
  }
}

/************* PROPOSE DAY LOGIC *************/
let stage = 0;
let yesClicks = 0;

function yesRun() {
  if (stage !== 0) return;

  const yesBtn = document.getElementById("yesBtn");
  const maxX = window.innerWidth - yesBtn.offsetWidth - 20;
  const maxY = window.innerHeight - yesBtn.offsetHeight - 20;

  yesBtn.style.position = "absolute";
  yesBtn.style.left = Math.random() * maxX + "px";
  yesBtn.style.top = Math.random() * maxY + "px";
}

function firstNo() {
  stage = 1;
  document.getElementById("question").innerText =
    "Hawwwwww 😭 You said no";

  document.getElementById("buttons").innerHTML =
    `<button onclick="secondStep()">Try again 😠😂</button>`;
}

function secondStep() {
  stage = 2;
  document.getElementById("question").innerText = "Try again 😤";

  document.getElementById("buttons").innerHTML = `
    <button onclick="thirdNo()">No 😐</button>
    <button onclick="thirdNo()">No 🙄</button>
  `;
}

function thirdNo() {
  document.getElementById("question").innerText = "Really??? 🥺";

  document.getElementById("buttons").innerHTML = `
    <button onclick="thirdNo()">No 😞</button>
    <button onclick="thirdNo()">No 😭</button>
  `;

  setTimeout(finalChance, 1200);
}

function finalChance() {
  stage = 3;
  yesClicks = 0;

  document.getElementById("question").innerText =
    "Okay… one last chance 🥹";

  document.getElementById("buttons").innerHTML =
    `<button id="finalYes" onclick="finalYes()">YES 💖</button>`;
}

function finalYes() {
  yesClicks++;

  const btn = document.getElementById("finalYes");
  btn.style.transform = `scale(${1 + yesClicks * 0.25})`;

  if (yesClicks >= 7) {
    document.getElementById("question").innerText =
      "YAYYYYY 💍💘 She said YES!!!";

    document.getElementById("buttons").innerHTML =
      `<p style="font-size:18px;">Forever starts now 💞</p>`;
  }
}

