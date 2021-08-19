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
  document.getElementById('containerLoadingIndicator').style.display = 'block';
  countryCardContainer.innerHTML = '';
  appendCountry(filteredCountries).then((nodeList) => {
    nodeList.map((li) => {
      li.onclick = (e) => {
        e.preventDefault();
        const modalBody = document.getElementById('modalBody');
        const countryName = String(li.getAttribute('id')).replaceAll('-', ' ');
        const country = countries.find((ctr) => ctr.name === countryName);
        console.log(country);
        document.getElementById('modalHeaderTitle').innerText = countryName;
        const {
          area,
          callingCodes,
          capital,
          currencies,
          demonym,
          flag,
          languages,
          name,
          population,
          region,
          subregion,
          timezones,
        } = country;

        // bendera
        const figureBendera = document.createElement('figure');
        figureBendera.style.textAlign = 'center';
        const imgBendera = document.createElement('img');
        imgBendera.src = flag;
        imgBendera.style.width = '200px';
        imgBendera.style.border = '1px solid #222222';
        figureBendera.appendChild(imgBendera);

        // list container
        const divC = document.createElement('div');
        divC.setAttribute('class', 'detail-country-flex');
        const ul = document.createElement('ul');
        ul.setAttribute('class', 'detail-country-ul');

        // nama
        const liNama = document.createElement('li');
        liNama.innerText = `Negara: ${name}`;

        // ibukota
        const liIbukota = document.createElement('li');
        liIbukota.innerText = `Ibukota: ${capital}`;

        // benua
        const liBenua = document.createElement('li');
        liBenua.innerText = `Benua: ${region}`;

        // sub wilayah
        const liSubWilayah = document.createElement('li');
        liSubWilayah.innerText = `Sub Wilayah: ${subregion}`;

        // zona waktu
        const liZonaWaktu = document.createElement('li');
        liZonaWaktu.innerText = `Zona Waktu: ${timezones.join(', ')}`;

        // populasi
        const liPopulasi = document.createElement('li');
        liPopulasi.innerText = `Populasi: ${population}`;

        // mata uang
        const liMataUang = document.createElement('li');
        liMataUang.innerText = `Mata Uang: ${currencies
          .map((curr) => curr.name)
          .join(', ')}`;

        // sebutan penduduk setempat
        const liDemonym = document.createElement('li');
        liDemonym.innerText = `Sebutan Orang: ${demonym}`;

        // bahasa
        const liBahasa = document.createElement('li');
        liBahasa.innerText = `Bahasa: ${languages
          .map((lng) => lng.name)
          .join(', ')}`;

        // luas area
        const liLuasArea = document.createElement('li');
        liLuasArea.innerText = `Luas Area: ${area}`;

        // kode telpon
        const liKodeTelpon = document.createElement('li');
        liKodeTelpon.innerText = `Kode Telpon: ${callingCodes.join(', ')}`;

        ul.appendChild(liNama);
        ul.appendChild(liIbukota);
        ul.appendChild(liBenua);
        ul.appendChild(liSubWilayah);
        ul.appendChild(liZonaWaktu);
        ul.appendChild(liPopulasi);
        ul.appendChild(liMataUang);
        ul.appendChild(liDemonym);
        ul.appendChild(liBahasa);
        ul.appendChild(liLuasArea);
        ul.appendChild(liKodeTelpon);

        divC.appendChild(ul);

        modalBody.appendChild(figureBendera);
        modalBody.appendChild(divC);

        modal.style.display = 'block';
      };
      countryCardContainer.appendChild(li);
    });
    document.getElementById('containerLoadingIndicator').style.display = 'none';
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
    const modalBody = document.getElementById('modalBody');
    modal.style.display = 'none';
    modalBody.innerHTML = '';
  };
}

onload = async () => {
  const containerLoadingIndicator = document.createElement('div');
  containerLoadingIndicator.style.textAlign = 'center';
  containerLoadingIndicator.setAttribute('id', 'containerLoadingIndicator');
  const loadingIndicator = document.createElement('div');
  loadingIndicator.setAttribute('class', 'lds-ring');
  loadingIndicator.setAttribute('id', 'loadingIndicator');
  loadingIndicator.innerHTML = '<div></div><div></div><div></div><div></div>';
  containerLoadingIndicator.appendChild(loadingIndicator);
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
  main.querySelector('div.main-content').appendChild(containerLoadingIndicator);

  setTimeout(() => {
    // init search form
    initSearchForm();
    // init filter by region form
    initFilterByRegionForm();
    // init modal
    initModal();
    // init ul list country
    main.querySelector('div.main-content').appendChild(countryCardContainer);
    resetCountryCardContainer();
  }, 2000);
};
