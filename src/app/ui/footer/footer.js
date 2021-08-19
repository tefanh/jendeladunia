import { base_color } from '../../app.config';

export default class Footer extends HTMLElement {
  description = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.description = this.getAttribute('description') || null;
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
            ${this.description}
        </footer>
    `;
  }
}
