import notesData from '../data/data.js';
import {
  archivedNotesApi,
  unarchivedNotesApi,
  getArchivedNotesFromApi,
  showResponseMessage,
  showSuccessMessage,
} from '../data/remote/notes-api.js';

class ArchivedButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._isArchived = this.getAttribute('archived') === 'false';
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
    button {
        background-color: green;
        color: white;
        border: none;
        padding: 5px 10px;
        cursor: pointer;
        }
    `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._updateStyle();
    this._emptyContent();
    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
    <button>Archived</button>
    `;
    this.addEventListener('click', async () => {
      const noteItem = this.parentNode.parentNode;
      if (noteItem) {
        const noteId = noteItem._note.id;
        try {
          const response = await archivedNotesApi(noteId);
          if (response.success) {
            showSuccessMessage('Catatan berhasil diarsipkan');
            // noteItem.remove();
            const archiveNote = await getArchivedNotesFromApi();
            // location.reload();
            const noteArchive = document.querySelector('note-archive');
            noteArchive.setNoteArchive(archiveNote);
          }
        } catch (error) {
          showResponseMessage(error);
        }
      }
    });
  }
}

customElements.define('archive-button', ArchivedButton);
