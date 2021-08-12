import './style.css';
import { getAllCountries } from './app/api/restcountries';
import Navbar from './app/ui/navbar/navbar';
import Footer from './app/ui/footer/footer';
import { makeHeader, makeMain, makeFooter } from './app/ui/ui-maker';

customElements.define('app-navbar', Navbar);
customElements.define('app-footer', Footer);

const root = document.querySelector('div#root');
const [header, main, footer] = [
    makeHeader(),
    makeMain(),
    makeFooter(),
];
let countries = [];
let filteredCountries = [];
const countryCardContainer = document.createElement('div');
countryCardContainer.setAttribute('class', 'card-container');

function appendCountry() {
    countryCardContainer.innerHTML = ``;
    for (const country of filteredCountries) {
        const ctrEl = document.createElement('div');
        ctrEl.setAttribute('class', 'card');
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        img.src = country.flag;
        img.alt = country.nativeName;
        img.style.width = '100%';
        img.style.height = '92px';
        const figcaption = document.createElement('figcaption');
        figcaption.innerHTML = country.name;
        figure.appendChild(img);
        figure.appendChild(figcaption);
        ctrEl.appendChild(figure);


        ctrEl.onmouseenter = (e) => {
            e.preventDefault();
            figcaption.style.transform = 'translateY(0)';
        };

        ctrEl.onmouseleave = (e) => {
            e.preventDefault();
            figcaption.style.transform = 'translateY(100%)';
        }

        countryCardContainer.appendChild(ctrEl);
    }
}

function initSearchForm() {
    const searchForm = document.createElement('input');
    searchForm.setAttribute('type', 'text');
    searchForm.setAttribute('placeholder', 'search country');
    searchForm.onkeyup = (e) => {
        e.preventDefault();
        filteredCountries = e.target.value === '' ? countries : countries.filter(country => String(country.name.toLowerCase()).includes(e.target.value.toLowerCase()));
        appendCountry();
    };
    main.querySelector('div.main-content').appendChild(searchForm);
}

onload = async () => {    
    root.appendChild(header);
    root.appendChild(main);
    root.appendChild(footer);
    //   get all country
    countries = await getAllCountries();
    console.log(countries);
    filteredCountries = [...countries];
    // init search form
    initSearchForm();
    // init ul list country
    main.querySelector('div.main-content').appendChild(countryCardContainer);
    appendCountry();
};
