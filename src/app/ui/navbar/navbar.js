import { base_color } from '../../app.config';
import logo from '../../../assets/imgs/logo.png';

export default class Navbar extends HTMLElement {
  title = null;

  constructor() {
    super();
    this._shadowRoot = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.title = this.getAttribute('title') || null;
    this.render();
    document.onscroll = (e) => {
      if (document.body.scrollTop >= 10) {
        this._shadowRoot.querySelector('nav').style.boxShadow =
          '0px 1px 30px -20px #222222';
      } else {
        this._shadowRoot.querySelector('nav').style.boxShadow = 'none';
      }
    };
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
                background-color: #ffffff;
                padding: 12px;
                z-index: 99999;
            }
            #brand {
              width: 125px;
            }
        </style>
        <nav>
          <img src="${logo}" alt="${this.title}" id="brand" />
        </nav>
    `;
  }
}
