import {
  unarchivedNotesApi,
  getArchivedNotesFromApi,
  getNotesFromApi,
  showResponseMessage,
  showSuccessMessage,
} from '../data/remote/notes-api';

class UnarchivedButton extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._style = document.createElement('style');
    this._isArchived = this.getAttribute('archived') === 'true';
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
    <button>${this._isArchived ? 'Archive' : 'Unarchive'}</button>
    `;

    this.addEventListener('click', async () => {
      const noteItem = await getArchivedNotesFromApi();
      const noteId = noteItem[0].id;

      if (noteItem) {
        const noteArchived = noteItem[0].archived === false;
        console.log(noteArchived);
        if (noteArchived) {
          try {
            const response = await unarchivedNotesApi(noteId);
            if (response.success) {
              showSuccessMessage('Catatan tidak jadi diarsipkan');
              const noteApi = await getNotesFromApi();
              const noteList = document.querySelector('note-list');
              noteList.setNoteList(noteApi);
            }
          } catch (error) {
            showResponseMessage(error);
          }
        }
      }
    });
  }
}

customElements.define('unarchive-button', UnarchivedButton);

