"use strict";

var siIndex = document.querySelector(".index");

if (siIndex) {
  // ------ ANIMATION DES TITRES ------ //
  const glowInTexts = document.querySelectorAll(".titleAnim");

  glowInTexts.forEach((glowInText) => {
    const letters = [...glowInText.textContent].map((letter, i) => {
      const span = document.createElement("span");
      span.textContent = letter;
      span.style.animationDelay = `${i * 0.02}s`;
      return span;
    });
    glowInText.innerHTML = ""; // clear text
    glowInText.append(...letters); // ajout spans
  });

  // Scramble
  class TextScramble {
    constructor(el) {
      this.el = el;
      this.chars = "!<>-_\\/[]{}—=+*^?#________";
    }

    setText(newText) {
      const oldText = this.el.innerText;
      const length = Math.max(oldText.length, newText.length);
      const promise = new Promise((resolve) => (this.resolve = resolve));
      this.queue = [];

      for (let i = 0; i < length; i++) {
        const from = oldText[i] || "";
        const to = newText[i] || "";
        const start = Math.floor(Math.random() * 40);
        const end = start + Math.floor(Math.random() * 40);
        this.queue.push({ from, to, start, end });
      }

      cancelAnimationFrame(this.frameRequest);
      this.frame = 0;
      this.update();
      return promise;
    }

    update = () => {
      let output = "";
      let complete = 0;

      this.queue.forEach(({ from, to, start, end, char }, i) => {
        if (this.frame >= end) {
          complete++;
          output += to;
        } else if (this.frame >= start) {
          if (!char || Math.random() < 0.28) {
            char = this.randomChar();
            this.queue[i].char = char;
          }
          output += `<span class="dud">${char}</span>`;
        } else {
          output += from;
        }
      });

      this.el.innerHTML = output;
      if (complete === this.queue.length) {
        this.resolve();
      } else {
        this.frameRequest = requestAnimationFrame(this.update);
        this.frame++;
      }
    };

    randomChar() {
      return this.chars[Math.floor(Math.random() * this.chars.length)];
    }
  }

  // Listes de phrases
  const phrasesList = [
    ["Introduction", "Le TDAH"],
    ["Mais d'abord...", "C'est quoi le TDAH ?"],
    ["Origine du projet", "Nos recherches"],
  ];

  // Animation
  document.querySelectorAll(".titleAnim").forEach((el, index) => {
    const fx = new TextScramble(el);
    const phrases = phrasesList[index];

    let counter = 0;
    const next = () => {
      fx.setText(phrases[counter]).then(() => {
        setTimeout(next, 800);
      });
      counter = (counter + 1) % phrases.length;
    };

    next();
  });

  // ------ ANIMATION DES CARTES ------ //
  document.querySelectorAll(".arrowFront").forEach((arrow) => {
    arrow.addEventListener("click", function () {
      const member = this.closest(".members__content--iner");
      member.classList.remove("flipBack");
      member.classList.add("flipFront");
    });
  });

  document.querySelectorAll(".arrowBack").forEach((arrow) => {
    arrow.addEventListener("click", function () {
      const memberBack = this.closest(".members__content--iner");
      memberBack.classList.remove("flipFront");
      memberBack.classList.add("flipBack");
    });
  });
}
