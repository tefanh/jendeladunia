export function makeHeader() {
  const header = document.createElement('header');
  header.style.position = 'sticky';
  header.style.top = '0';
  header.style.left = '0';
  header.style.zIndex = '9';

  const navbar = document.createElement('app-navbar');
  navbar.setAttribute('title', 'Jendela Dunia');
  header.appendChild(navbar);
  return header;
}

export function makeMain() {
  const main = document.createElement('main');
  const content = document.createElement('div');
  content.setAttribute('class', 'main-content');
  main.appendChild(content);
  return main;
}

export function makeFooter() {
  const footer = document.createElement('app-footer');
  footer.setAttribute('description', 'copyright 2021 Tefan Haetami');
  return footer;
}

export function makeToolbar() {
  const toolbar = document.createElement('div');
  toolbar.setAttribute('class', 'toolbar');
  return toolbar;
}

export function makeSearchForm() {
  const searchForm = document.createElement('input');
  searchForm.setAttribute('type', 'text');
  searchForm.setAttribute('placeholder', 'search country');
  searchForm.setAttribute('class', 'search-form');
  return searchForm;
}

export function makeRegionForm() {
  const regionForm = document.createElement('select');
  regionForm.setAttribute('class', 'region-form');
  return regionForm;
}

export function appendCountry(countries) {
  return new Promise((resolve) => {
    let i = 0;
    const nodeList = [];
    while (i < countries.length) {
      const country = countries[i];
      const ctrEl = document.createElement('div');
      ctrEl.setAttribute('class', 'card');
      ctrEl.setAttribute('id', country.name.replace(' ', '-').trim());
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
      };
      nodeList.push(ctrEl);
      i++;
    }
    resolve(nodeList);
  });
}

export function makeModal() {
  const modal = document.createElement('div');
  modal.setAttribute('class', 'modal');
  const modalContent = document.createElement('div');
  modalContent.setAttribute('class', 'modal-content');
  const modalHeader = document.createElement('div');
  modalHeader.setAttribute('class', 'modal-header');
  const modalBody = document.createElement('div');
  modalBody.setAttribute('class', 'modal-body');
  const modalFooter = document.createElement('div');
  modalFooter.setAttribute('class', 'modal-footer');

  const spanClose = document.createElement('span');
  spanClose.setAttribute('class', 'close');
  spanClose.setAttribute('id', 'closeModalButton');
  spanClose.innerHTML = '&times;';

  const modalHeaderTitle = document.createElement('h2');
  modalHeaderTitle.setAttribute('id', 'modalHeaderTitle');

  modalHeader.appendChild(spanClose);
  modalHeader.appendChild(modalHeaderTitle);

  const modalBodyText = document.createElement('p');
  modalBodyText.innerText = 'Lorem ipsum dolor sit amet';

  modalBody.appendChild(modalBodyText);

  const modalFooterText = document.createElement('h3');
  modalFooterText.innerText = 'Modal Footer';

  modalFooter.appendChild(modalFooterText);

  modalContent.appendChild(modalHeader);
  modalContent.appendChild(modalBody);
  modalContent.appendChild(modalFooter);

  modal.appendChild(modalContent);
  return modal;
}
