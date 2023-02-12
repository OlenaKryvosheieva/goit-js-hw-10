import { refs } from './refs';

export function clearCountryList() {
  refs.countryList.innerHTML = '';
}

export function clearCountryInfo() {
  refs.countryInfo.innerHTML = '';
}

export function createCountryInfo({
  name,
  capital,
  population,
  flags,
  languages,
}) {
  const langEl = Object.values(languages).join(', ');

  return `
  <div class="country-card">
  <img src="${flags.svg}" width="100px">
  <h2> ${name.official} </h2>  
  </div>
  <p><span class="country-text"> Capital:</span> ${capital} </p>
  <p><span class="country-text">Population:</span> ${population} </p>
  <p><span class="country-text">Languages:</span> ${langEl}</p>
   `;
}

export function createCountryList({ flags, name }) {
  return `
      <li class="country-item"><img src="${flags.svg}" width="40px" >${name.official}
      </li>`;
}
