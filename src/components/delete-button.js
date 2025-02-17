import { deleteNoteFromApi } from '../data/remote/notes-api';
import './loading-indicator.js';
import { gsap } from 'gsap/gsap-core';
import CSSPlugin from 'gsap/CSSPlugin';
gsap.registerPlugin(CSSPlugin);

class DeleteButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    button {
        background-color: red;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._updateStyle();
    this._emptyContent();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.set;

    this._shadowRoot.innerHTML += `
    <button>Delete Book</button>
    `;

    this.addEventListener('click', () => {
      const noteItem = this.parentNode.parentNode;
      if (noteItem) {
        const noteId = noteItem._note.id;
        const loadingIndicator = document.querySelector('loading-indicator');
        async function deleteNote() {
          loadingIndicator.show();
          try {
            const notes = await deleteNoteFromApi(noteId);
            gsap.to(noteItem, {
              duration: 1,
              opacity: 0,
              ease: 'power2.out',
              onComplete: () => {
                noteItem.remove();
              },
            });
          } catch {
            console.error('Error fetching notes');
          } finally {
            loadingIndicator.hide();
          }
        }

        deleteNote();
      }
    });
  }
}

customElements.define('delete-button', DeleteButton);
