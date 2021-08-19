import './style.css';
import { getAllCountries } from './app/api/restcountries';
import Navbar from './app/ui/navbar/navbar';
import Footer from './app/ui/footer/footer';
import {
  makeHeader,
  makeMain,
  makeFooter,
  makeToolbar,
  appendCountry,
  makeSidebar,
  makeSearchForm,
  makeRegionForm,
  makeModal,
} from './app/ui/ui-maker';

customElements.define('app-navbar', Navbar);
customElements.define('app-footer', Footer);

const root = document.querySelector('div#root');
const [header, main, footer, toolbar, searchForm, regionForm, modal] = [
  makeHeader(),
  makeMain(),
  makeFooter(),
  makeToolbar(),
  makeSearchForm(),
  makeRegionForm(),
  makeModal(),
];
let countries = [];
let filteredCountries = [];
let regions = [];
let searchValue = '';
let regionValue = '';

const countryCardContainer = document.createElement('div');
countryCardContainer.setAttribute('class', 'card-container');

function resetCountryCardContainer() {
  countryCardContainer.innerHTML = '';
  appendCountry(filteredCountries).then((nodeList) => {
    nodeList.map((li) => {
      li.onclick = (e) => {
        e.preventDefault();
        document.getElementById('modalHeaderTitle').innerText =
          li.getAttribute('id');
        modal.style.display = 'block';
      };
      countryCardContainer.appendChild(li);
    });
  });
}

function initSearchForm() {
  searchForm.onkeyup = (e) => {
    e.preventDefault();
    searchValue = e.target.value;
    filteredCountries = countries.filter(
      (country) =>
        String(country.name.toLowerCase()).includes(
          searchValue.toLowerCase(),
        ) &&
        String(country.region.toLowerCase()).includes(
          regionValue.toLowerCase(),
        ),
    );
    resetCountryCardContainer();
  };
  toolbar.appendChild(searchForm);
}

function initFilterByRegionForm() {
  for (const region of regions) {
    const option = document.createElement('option');
    option.value = region === 'All' ? '' : region;
    option.text = region;
    regionForm.appendChild(option);
  }
  regionForm.onchange = (e) => {
    e.preventDefault();
    regionValue = e.target.value;
    filteredCountries = countries.filter(
      (country) =>
        String(country.name.toLowerCase()).includes(
          searchValue.toLowerCase(),
        ) &&
        String(country.region.toLowerCase()).includes(
          regionValue.toLowerCase(),
        ),
    );
    resetCountryCardContainer();
  };
  toolbar.appendChild(regionForm);
}

function initModal() {
  document.body.appendChild(modal);
  document.getElementById('closeModalButton').onclick = (e) => {
    e.preventDefault();
    modal.style.display = 'none';
  };
}

onload = async () => {
  root.appendChild(header);
  root.appendChild(main);
  root.appendChild(footer);
  //   get all country
  countries = await getAllCountries();
  regions = countries
    .map((country) => country.region)
    .filter(
      (thing, index, self) =>
        thing.length > 0 &&
        index ===
          self.findIndex((t) => t.toLowerCase() === thing.toLowerCase()),
    );
  regions.splice(0, 0, 'All');
  regionValue = '';
  filteredCountries = [...countries];
  // init toolbar
  main.querySelector('div.main-content').appendChild(toolbar);
  // init search form
  initSearchForm();
  // init filter by region form
  initFilterByRegionForm();
  // init modal
  initModal();
  // init ul list country
  main.querySelector('div.main-content').appendChild(countryCardContainer);
  resetCountryCardContainer();
};
