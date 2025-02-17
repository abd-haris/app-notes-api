import '../components/note-item.js';
import '../components/note-list.js';
import '../components/note-archive.js';
import '../components/loading-indicator.js';
import { addNoteToApi } from './remote/notes-api.js';
import { gsap } from 'gsap/gsap-core';
import CSSPlugin from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('form');
  const noteListEl = document.querySelector('note-list');
  const loadingIndicator = document.querySelector('loading-indicator');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); // Mencegah form di-submit
    const title = document.getElementById('title').value;
    const shortDescription = document.getElementById('shortDescription').value;
    const notesInput = {
      title: title,
      body: shortDescription,
    };

    async function updateNote() {
      loadingIndicator.show();
      try {
        const notesData = await addNoteToApi(notesInput);
        gsap.from(noteListEl, {
          duration: 1,
          opacity: 0,
          ease: 'power2.in',
        });
        noteListEl.setNoteList(notesData); // Tambahkan catatan ke web component
      } catch (error) {
        console.error('tidak dapat menambahkan note');
      } finally {
        loadingIndicator.hide();
      }
    }
    updateNote();

    form.reset(); // Reset form
  });
});
