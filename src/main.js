import './css/ress.css';
import './css/styles.css';

import ScrollTrigger from './js/scrollTrigger.js';

window.onload = () => {
  var trigger = new ScrollTrigger();
}

window.onscroll = () => {
  scrollClassToggler(150, '.header', 'header__scrolled');
}

function scrollClassToggler(offset, target, toggleClass) {
  if(window.pageYOffset > offset) {
    let el = document.querySelectorAll(target)[0];
    el.classList.add(toggleClass);
  } else {
    let el = document.querySelectorAll(target)[0];
    el.classList.remove(toggleClass);
  }  
}