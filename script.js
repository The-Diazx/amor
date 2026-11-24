let activeTypingTimer = null;

function typeWriter(element, text, speed = 55, onComplete = null) {
    if (activeTypingTimer) {
        clearTimeout(activeTypingTimer);
        activeTypingTimer = null;
    }

    element.innerHTML = "";
    const textSpan = document.createElement("span");
    const cursorSpan = document.createElement("span");
    cursorSpan.className = "typing-cursor";

    element.appendChild(textSpan);
    element.appendChild(cursorSpan);

    let index = 0;

    function step() {
        if (index < text.length) {
            textSpan.textContent += text.charAt(index);
            index++;
            activeTypingTimer = setTimeout(step, speed);
        } else {
            setTimeout(() => {
                cursorSpan.remove();
                if (typeof onComplete === "function") {
                    onComplete();
                }
            }, 250);
        }
    }

    step();
}

function goToScreen(screenNumber) {
    document.querySelectorAll(".screen").forEach((screen) => {
        screen.classList.remove("active");
    });

    const target = document.getElementById(`screen-${screenNumber}`);
    if (!target) return;
    target.classList.add("active");

    if (screenNumber === 1) {
        typeWriter(
            document.getElementById("text-1"),
            "Você sabe o que você é capaz de fazer com meus dias?!",
            52,
            () => document.getElementById("actions-1").classList.remove("hidden")
        );
    } else if (screenNumber === 2) {
        typeWriter(
            document.getElementById("text-2"),
            "Meu dia sem você:",
            60,
            () => document.getElementById("next-2").classList.remove("hidden")
        );
    } else if (screenNumber === 4) {
        typeWriter(
            document.getElementById("text-4"),
            "Meu dia com você:",
            60,
            () => document.getElementById("next-4").classList.remove("hidden")
        );
    } else if (screenNumber === 6) {
        typeWriter(
            document.getElementById("text-6"),
            "TE AMOOO, GOSTOU?!",
            60
        );
    }
}

// Tela 1: Botões
document.getElementById("btn-yes").addEventListener("click", () => {
    const hint = document.getElementById("hint-1");
    hint.textContent = "Será mesmo? Olha só... 😏";
    setTimeout(() => {
        hint.textContent = "";
        goToScreen(2);
    }, 1100);
});

document.getElementById("btn-no").addEventListener("click", () => {
    goToScreen(2);
});

// Navegação entre telas
document.getElementById("next-2").addEventListener("click", () => goToScreen(3));
document.getElementById("next-3").addEventListener("click", () => goToScreen(4));
document.getElementById("next-4").addEventListener("click", () => goToScreen(5));
document.getElementById("next-5").addEventListener("click", () => goToScreen(6));

// Tela 6: Medidor de 0% a 100%
let lovePercentage = 0;
const percentageText = document.getElementById("percentage-text");
const loveBanner = document.getElementById("love-banner");
const btnLike = document.getElementById("btn-like");
const btnDislike = document.getElementById("btn-dislike");

function spawnHearts(count = 10) {
    const layer = document.getElementById("hearts-layer");
    const emojis = ["❤️", "💖", "💜", "🥰"];

    for (let i = 0; i < count; i++) {
        setTimeout(() => {
            const heart = document.createElement("span");
            heart.className = "floating-heart";
            heart.textContent = emojis[Math.floor(Math.random() * emojis.length)];
            heart.style.left = `${15 + Math.random() * 70}%`;
            layer.appendChild(heart);

            setTimeout(() => heart.remove(), 2200);
        }, i * 110);
    }
}

function updateMeter() {
    percentageText.textContent = `${lovePercentage}%`;

    if (lovePercentage >= 100) {
        loveBanner.classList.add("show");
        spawnHearts(12);
    } else {
        loveBanner.classList.remove("show");
    }
}

btnLike.addEventListener("click", () => {
    if (lovePercentage < 100) {
        lovePercentage += 20;
        updateMeter();
    } else {
        spawnHearts(6);
    }
});

btnDislike.addEventListener("click", () => {
    if (lovePercentage > 0) {
        lovePercentage -= 20;
        updateMeter();
    } else {
        btnDislike.classList.remove("shake");
        void btnDislike.offsetWidth;
        btnDislike.classList.add("shake");
    }
});

// Inicia na Tela 1 ao carregar
window.addEventListener("DOMContentLoaded", () => {
    goToScreen(1);
});