"use strict";

//Anim des titres
let glowInTexts = document.querySelectorAll(".titleAnim");

// split all text content into letters
// for each letter, wrap it with a span
// then let each span executes animation in sequence.
glowInTexts.forEach(glowInText => {
  let letters = glowInText.textContent.split("");
  glowInText.textContent = "";
  letters.forEach((letter, i) => {
    let span = document.createElement("span");
    span.textContent = letter;
    span.style.animationDelay = `${i * 0.02}s`;
    glowInText.append(span);
  });
});





// le Text Animation
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';


gsap.registerPlugin(ScrollTrigger);


const textElement = document.querySelector('#text');
const words = textElement.innerText.split(' ');
textElement.innerHTML = words.map(word => `<span>${word} </span>`).join('');


const tl = gsap.timeline({
    scrollTrigger: {
        trigger: textElement,
        start: "top 10%",  // Le scroll commence quand 40% du texte est visible
        end: "+=150",     // Longueur de l'animation (peut ajuster selon la longueur du texte)
        scrub: 1,          // Rendre l'animation synchronisée avec le scroll
        pin: true,         // Bloque le scroll tant que l'animation n'est pas finie
    }
});


gsap.utils.toArray("#text span").forEach((word, i) => {
    tl.to(word, { opacity: 1, duration: 0.2 }, i * 0.1); // Animation pour chaque mot
});




//Rewrite 
// ——————————————————————————————————————————————————

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_\\/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise((resolve) => this.resolve = resolve);
    this.queue = [];

    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    };

      cancelAnimationFrame(this.frameRequest)
      this.frame = 0;
      this.update();
      return promise;

  };


  update() {
    let output = '';
    let complete = 0;

    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];

      if (this.frame >= end) {
      complete++
      output += to
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
            char = this.randomChar()
            this.queue[i].char = char
        }
      output += `<span class="dud">${char}</span>`
      } else {
        output += from
      }
    };
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
        this.resolve()
    } else {
        this.frameRequest = requestAnimationFrame(this.update)
        this.frame++
    };
  };
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)]
  }
};


const phrases = [
  "Mais d'abord...,",
  "C'est quoi le TDAH ?"
  
];

const el = document.querySelector('.whatis__text');
const fx = new TextScramble(el);

let counter = 0
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 800);
  })
  counter = (counter + 1) % phrases.length;
};

next();


// face à face

function adjustStickyPosition() {
  var contentLeft = document.querySelector('#left-content');
  var height = contentLeft.clientHeight;
  var topOffset = 'calc(50% - ' + (height / 2) + 'px)';
  contentLeft.style.top = topOffset;
}


function initialize () {
  adjustStickyPosition ();
}

window.onload = initialize;
window.onresize = initialize;




var arrowFronts = document.querySelectorAll('.arrowFront');
var arrowBacks = document.querySelectorAll('.arrowBack');

arrowFronts.forEach(function(arrow) {
  arrow.addEventListener('click', function() {
    var lesmembres = this.closest('.members__content--iner');
    
    lesmembres.classList.remove('flipBack');
    lesmembres.classList.add('flipFront');
  });
});

arrowBacks.forEach(function(arrow) {
  arrow.addEventListener('click', function() {

    var lesmembresback = this.closest('.members__content--iner');

    lesmembresback.classList.remove('flipFront');
    lesmembresback.classList.add('flipBack');
  });
});
