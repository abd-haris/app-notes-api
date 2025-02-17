import './delete-button.js';
import './archive-button.js';

class NoteItem extends HTMLElement {
  constructor() {
    super();
    // this._note = []; // Array untuk menyimpan catatan

    this._note = {
      title: 'NEED TITLE',
      body: 'NEED DESCRIPTION',
      id: null,
      // archived: null,
    };
    this._style = document.createElement('style');
  }

  setNote(value) {
    this._note['title'] = value.title;
    this._note['body'] = value.body;
    this._note['id'] = value.id;
    this.render(); // Perbarui tampilan daftar
  }

  connectedCallback() {
    this.render(); // Render daftar catatan saat komponen terhubung
  }

  updatedStyle() {
    this._style.textContent = `
            note-item {
            padding: 1rem 0.8rem;
            display: block;
            background-color: #E5D9F2;
            border-radius: 4px;
            box-shadow: 0 0 2px 2px #A294F9;
        }

        .note__title {
            margin-block-start: 0;
            margin-block-end: 1rem;
            font-size: 1.3rem;
            font-weight: bold;
            font-family: "Poppins", serif;
        }

        p {
            margin-block-start: 0;
        }

        .item__button {
          margin-top: 1rem;
          display: flex;
          align-items: center;
          gap: 2rem;
        }

        .item__button button {
          padding: 0.5rem 1rem;
          border-radius: 4px;
          border: 1px solid black;
          font-weight: bold;
          cursor: pointer;
        }
      `;
  }

  render() {
    this.updatedStyle();
    const isArchived = this._note.archived;
    this.setAttribute('id', this._note.id);

    this.innerHTML = `

    ${this._style.outerHTML}
    <h5 class="note__title">${this._note.title}</h5>
    <div class="note__body">
      <p>${this._note.body}</p>
    </div>
    <div class="item__button">
      <archive-button archived="${isArchived}"></archive-button>
      <delete-button></delete-button>
    </div>
    `;
  }
}

customElements.define('note-item', NoteItem); // Daftarkan komponen
