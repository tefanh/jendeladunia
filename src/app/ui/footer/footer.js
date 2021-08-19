export default class Footer extends HTMLElement {
  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this._description = this.getAttribute('description') || null;
    this.render();
  }

  adoptedCallback() {}

  attributeChangedCallback(name, oldVal, newVal) {
    this[name] = newVal;
    this.render();
  }

  disconnectedCallback() {}

  static get observedAttributes() {
    return ['title'];
  }

  render() {
    this._shadowRoot.innerHTML = `
        <style>
            * {
                box-sizing: border-box;
                color: #222222;
            }
            footer {
                padding: 50px 20px;
                background-color: #ffffff;
                font-size: 16px;
                text-align: center;
                font-weight: bolder;
            }
        </style>
        <footer>
            ${this._description}
        </footer>
    `;
  }
}
