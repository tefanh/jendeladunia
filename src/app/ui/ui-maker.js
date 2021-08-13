export function makeHeader() {
  const header = document.createElement('header');
  header.style.position = 'sticky';
  header.style.top = '0';
  header.style.left = '0';

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
