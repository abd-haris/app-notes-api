import { getNotesFromApi } from '../data/remote/notes-api';
import './loading-indicator.js';
import { showResponseMessage } from '../data/remote/notes-api';

class NoteList extends HTMLElement {
  constructor() {
    super();

    this._noteList = [];
    this._style = document.createElement('style');
    this._loadingIndicator = document.querySelector('loading-indicator');
  }

  async setNoteList(value) {
    this._loadingIndicator.show();
    try {
      const notes = await getNotesFromApi(value);
      this._noteList = notes;
      this.render();
    } catch (error) {
      showResponseMessage('Tidak ada internet!');
    } finally {
      this._loadingIndicator.hide();
    }
  }

  connectedCallback() {
    this.render();
  }

  updateStyle() {
    this._style.textContent = `
    note-list {
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: 1rem;
        width: 90vw;
        margin-top: 1rem;
    }
    `;
  }

  render() {
    this.updateStyle();

    const noteItemElements = [];

    this._noteList.map((item) => {
      const note = document.createElement('note-item');
      if (item.archived == false) {
        note.setNote(item);
        noteItemElements.push(note);
      }
    });

    this.innerHTML = '';
    this.append(this._style, ...noteItemElements);
  }
}

customElements.define('note-list', NoteList);
