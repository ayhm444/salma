// ======================================
// Salma Calculus 2 Game
// ======================================

let score = 0;
let focus = 50;
let currentLevel = 1;
let successRate = 50;

// ============================
// Elements
// ============================

const popup = document.getElementById("popup");
const startBtn = document.getElementById("startBtn");
const closeBtn = document.getElementById("closeBtn");
const rescueBtn = document.getElementById("rescueBtn");

const scoreElement = document.getElementById("score");
const focusElement = document.getElementById("focus");
const levelElement = document.getElementById("level");

const progress = document.getElementById("progress");
const predictionText = document.getElementById("predictionText");
const aiMessage = document.getElementById("aiMessage");

const level1 = document.getElementById("level1");
const level2 = document.getElementById("level2");
const level3 = document.getElementById("level3");

// ============================
// Popup
// ============================

startBtn.addEventListener("click", () => {
    popup.style.display = "flex";
});

closeBtn.addEventListener("click", () => {
    popup.style.display = "none";
});

rescueBtn.addEventListener("click", () => {
    popup.style.display = "none";

    level1.scrollIntoView({
        behavior: "smooth"
    });

    showMessage(
        " يوجد أمل يسلمى!"
    );
});

// ============================
// Countdown
// ============================

// الامتحان 14 يوليو

const examDate = new Date(
    "July 14, 2026 09:00:00"
);

function updateCountdown() {

    const now = new Date();

    const distance =
        examDate.getTime() - now.getTime();

    if (distance < 0) {

        document.getElementById("days").innerHTML = "0";
        document.getElementById("hours").innerHTML = "0";
        document.getElementById("minutes").innerHTML = "0";
        document.getElementById("seconds").innerHTML = "0";

        return;
    }

    const days =
        Math.floor(distance / (1000 * 60 * 60 * 24));

    const hours =
        Math.floor(
            (distance % (1000 * 60 * 60 * 24))
            /
            (1000 * 60 * 60)
        );

    const minutes =
        Math.floor(
            (distance % (1000 * 60 * 60))
            /
            (1000 * 60)
        );

    const seconds =
        Math.floor(
            (distance % (1000 * 60))
            /
            1000
        );

    document.getElementById("days").innerHTML = days;
    document.getElementById("hours").innerHTML = hours;
    document.getElementById("minutes").innerHTML = minutes;
    document.getElementById("seconds").innerHTML = seconds;
}

setInterval(updateCountdown, 1000);
updateCountdown();

// ============================
// Update Stats
// ============================

function updateStats() {

    scoreElement.textContent = score;

    focusElement.textContent =
        focus + "%";

    levelElement.textContent =
        currentLevel;

    successRate =
        Math.min(
            100,
            Math.max(
                0,
                score + focus
            )
        );

    progress.style.width =
        successRate + "%";

    if (successRate >= 80) {

        predictionText.innerHTML =
            "  شوفيلك عريس أحسن 😭💔";

    } else if (successRate >= 50) {

        predictionText.innerHTML =
            " شوفيلك عريس أحسن 😭💔";

    } else {

        predictionText.innerHTML =
            " شوفيلك عريس أحسن 😭💔";
    }
}

// ============================
// Funny Messages
// ============================

const messages = [

    "📚 الدراسة بدأت تؤتي ثمارها",

    "😴 النظام رصد محاولة نوم",

    "🚨 الامتحان يقترب بسرعة",

    "💖 سلمى قادرة على النجاح",

    "😭 لا تنامي الآن"
];

function randomMessage() {

    const random =
        Math.floor(
            Math.random() * messages.length
        );

    aiMessage.innerHTML =
        messages[random];
}

setInterval(
    randomMessage,
    4000
);

// ============================
// Notification
// ============================

function showMessage(text) {

    aiMessage.innerHTML = text;

    aiMessage.animate(
        [
            { transform: "scale(0.9)" },
            { transform: "scale(1.05)" },
            { transform: "scale(1)" }
        ],
        {
            duration: 500
        }
    );
}

// ============================
// Questions
// ============================

const answers =
    document.querySelectorAll(".answer");

answers.forEach(btn => {

    btn.addEventListener(
        "click",
        function () {

            if (
                this.dataset.correct === "true"
            ) {

                this.style.background =
                    "#bff5cb";

                score += 15;

                focus += 5;

                showMessage(
                    " هكي صحح سيمووو 😎😎😎"
                );

                unlockNextLevel();

            } else {

                this.style.background =
                    "#ffd2d2";

                focus -= 5;

                showMessage(
                    "جربي مره تانية تجيبها 💔"
                );
            }

            updateStats();
        }
    );
});

// ============================
// Unlock Levels
// ============================

function unlockNextLevel() {

    if (
        currentLevel === 1
    ) {

        currentLevel = 2;

        level2.classList.remove(
            "locked"
        );

        showMessage(
            "🔓 قريب تنجحي كملي"
        );

    } else if (
        currentLevel === 2
    ) {

        currentLevel = 3;

        level3.classList.remove(
            "locked"
        );

        showMessage(
            "👑 قريب تنجحي كملي"
        );

    } else {

        score += 30;

        focus += 10;

        showMessage(
            "🏆 سلمى سوس 😂🤝"
        );
    }

    updateStats();
}

// ============================
// Coffee Button
// ============================

document
.getElementById("coffeeBtn")
.addEventListener(
    "click",
    () => {

        focus += 10;

        if (focus > 100)
            focus = 100;

        updateStats();

        showMessage(
            "دعوات الوالدة زادت تركيز 🫡"
        );
    }
);

// ============================
// Study Button
// ============================

document
.getElementById("studyBtn")
.addEventListener(
    "click",
    () => {

        score += 5;

        updateStats();

        showMessage(
            "📚 تلميح: التكامل عكس الاشتقاق"
        );
    }
);

// ============================
// Alarm Button
// ============================

document
.getElementById("alarmBtn")
.addEventListener(
    "click",
    () => {

        showMessage(
            "🚨 الامتحان يقرب يسلمى!"
        );
    }
);

// ============================
// Sleep Sound
// ============================

function playSnore() {

    const audio =
        new Audio(
            "https://www.soundjay.com/human/snoring-01.mp3"
        );

    audio.volume = 0.3;

    audio.play();
}

// ============================
// Sleep Button
// ============================

document
.getElementById("sleepBtn")
.addEventListener(
    "click",
    () => {

        focus -= 15;

        score -= 5;

        if (focus < 0)
            focus = 0;

        playSnore();

        updateStats();

        showMessage(
            "😴 تم اكتشاف نوم مفاجئ"
        );
    }
);

// ============================
// Snooze Mode
// ============================

document
.getElementById("snoozeBtn")
.addEventListener(
    "click",
    () => {

        focus -= 25;

        if (focus < 0)
            focus = 0;

        playSnore();

        updateStats();

        showMessage(
            "😂 تم تفعيل Snooze Mode"
        );
    }
);

// ============================
// Startup
// ============================

updateStats();

randomMessage();