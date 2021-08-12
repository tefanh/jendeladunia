import { base_color } from '../../app.config';

export default class Navbar extends HTMLElement {
  title = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.title = this.getAttribute('title') || null;
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
                color: #ffffff;
                box-sizing: border-box;
            }
            nav {
                background-color: ${base_color.primary};
                padding: 20px 20px;
                z-index: 99999;
            }
            #brand {
                text-decoration: none;
                font-size: 21px;
                letter-spacing: 1px;
            }
        </style>
        <nav>
            <a href="#" id="brand">${this.title}</a>
        </nav>
    `;
  }
}
