class NotesBar extends HTMLElement {
  _shadowRoot = null;
  _style = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._imageUrl = this.getAttribute('img');
    this._altImage = this.getAttribute('altImage');
    this._style = document.createElement('style');
  }

  connectedCallback() {
    this.render();
  }

  _updateStyle() {
    this._style.textContent = `
          host: {
              display: block;
              width: 100%;
              box-shadow: 0 4px 4px 0 rgb(205, 193, 255);
          }
          
          div {
              display: flex;
              align-items: center;
              justify-content: center;
              gap: 1rem;
              padding: 1rem;
          }
  
          img {
          height: 3rem;
          }
  
          .title-bar {
              margin: 0;
              font-size: 1.7rem;
              color: #F5EFFF;
          }
      `;
  }

  _emptyContent() {
    this._shadowRoot.innerHTML = '';
  }

  render() {
    this._emptyContent();
    this._updateStyle();

    this._shadowRoot.appendChild(this._style);
    this._shadowRoot.innerHTML += `
          <div>
              <img src="${this._imageUrl}" alt="${this._altImage}"/>
              <h1 class="title-bar">Notes App</h1>
          </div>
      `;
  }
}

customElements.define('notes-bar', NotesBar);
