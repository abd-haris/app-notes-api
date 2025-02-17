import './components/index.js';
import './data/data.js';
import './data/input-data.js';

import './styles/reset.css';
import './styles/style.css';
import './styles/responsive.css';

import { gsap } from 'gsap/gsap-core';
import CSSPlugin from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

const noteList = document.querySelectorAll('note-list');
gsap.from(noteList, {
  duration: 1,
  opacity: 0,
  y: 50,
  ease: 'power2.out',
  stagger: 0.2,
});
