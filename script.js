const boxes = document.querySelectorAll(".day-box.locked");

function updateCountdowns() {
  const now = new Date();

  boxes.forEach(box => {
    const unlockTime = new Date(box.dataset.unlock);
    const timer = box.querySelector(".timer");

    const diff = unlockTime - now;

    if (diff <= 0) {
      // UNLOCK
      box.classList.remove("locked");
      box.classList.add("open");
      timer.textContent = "Unlocked 💖";
      box.onclick = () => {
        window.location.href = box.dataset.day + ".html";
      };
    } else {
      // COUNTDOWN
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);

      timer.textContent = `${days}d ${hours}h ${mins}m`;
    }
  });
}

setInterval(updateCountdowns, 1000);
updateCountdowns();
