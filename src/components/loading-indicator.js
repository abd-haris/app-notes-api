// class LoadingIndicator extends HTMLElement {
//   _shadowRoot = null;
//   _style = null;

//   constructor() {
//     super();
//     this._shadowRoot = this.attachShadow({ mode: "open" });
//     this._style = document.createElement("style");
//     this.render();
//   }

//   connectedCallback() {
//     this.render();
//   }

//   _updateStyle() {
//     this._style.textContent = `
//         .loading-overlay {
//           position: fixed; /* Menutupi seluruh layar */
//           top: 0;
//           left: 0;
//           width: 100%;
//           height: 100%;
//           background-color: rgba(0, 0, 0, 0.5); /* Latar belakang semi-transparan */
//           display: flex;
//           justify-content: center;
//           align-items: center;
//           z-index: 9999; /* Pastikan di atas elemen lain */
//         }
//         .loading-spinner {
//           border: 4px solid #f3f3f3; /* Warna spinner */
//           border-top: 4px solid #3498db; /* Warna spinner yang berputar */
//           border-radius: 50%;
//           width: 50px;
//           height: 50px;
//           animation: spin 2s linear infinite; /* Animasi spinner */
//         }
//         @keyframes spin {
//           0% { transform: rotate(0deg); }
//           100% { transform: rotate(360deg); }
//         }
//     `;
//   }

//   _emptyContent() {
//     this.shadowRoot.innerHTML = "";
//   }

//   render() {
//     this._updateStyle();
//     this._emptyContent();
//     this._shadowRoot.appendChild(this._style);

//     this._shadowRoot.innerHTML += `
//     <div class="loading-overlay">
//         <div class="loading-spinner"></div>
//     </div>
//     `;
//   }

//   show() {
//     return (this._shadowRoot.querySelector(".loading-overlay").style.display = "flex");
//   }

//   hide() {
//     return (this._shadowRoot.querySelector(".loading-overlay").style.display = "none");
//   }
// }

// customElements.define("loading-indicator", LoadingIndicator);

class LoadingIndicator extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });

    this.shadowRoot.innerHTML = `
        <style>
          .loading-overlay {
            position: fixed; /* Menutupi seluruh layar */
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background-color: rgba(0, 0, 0, 0.5); /* Latar belakang semi-transparan */
            display: flex;
            justify-content: center;
            align-items: center;
            z-index: 9999; /* Pastikan di atas elemen lain */
          }

          .loading-spinner {
            border: 4px solid #f3f3f3; /* Warna spinner */
            border-top: 4px solid #3498db; /* Warna spinner yang berputar */
            border-radius: 50%;
            width: 50px;
            height: 50px;
            animation: spin 2s linear infinite; /* Animasi spinner */
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }
        </style>
        <div class="loading-overlay" style="display: none;">
          <div class="loading-spinner"></div>
        </div>
      `;
  }

  show() {
    this.shadowRoot.querySelector('.loading-overlay').style.display = 'flex';
  }

  hide() {
    this.shadowRoot.querySelector('.loading-overlay').style.display = 'none';
  }
}

customElements.define('loading-indicator', LoadingIndicator);
