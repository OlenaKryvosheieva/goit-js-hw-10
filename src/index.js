import './css/styles.css';
import { Notify } from 'notiflix';
import { fetchCountries } from './js/fetchCountries';
import { refs } from './js/refs';
import debounce from 'lodash.debounce';
import {
  clearCountryList,
  clearCountryInfo,
  createCountryList,
  createCountryInfo,
} from './js/render-functions';

const DEBOUNCE_DELAY = 300;

refs.input.addEventListener('input', debounce(onInput, DEBOUNCE_DELAY));

function onInput(e) {
  const inputValue = e.target.value.trim();
  if (!inputValue) {
    clearCountryList();
    clearCountryInfo();
    return;
  }

  fetchCountries(inputValue)
    .then(countries => {
      if (countries.length > 10) {
        clearCountryList();
        clearCountryInfo();

        Notify.info(
          'Too many matches found. Please enter a more specific name.'
        );
      }

      if (countries.length >= 2 && countries.length <= 10) {
        clearCountryInfo();
        const html = countries.reduce(
          (markup, country) => createCountryList(country) + markup,
          ''
        );
        refs.countryList.innerHTML = html;
      }

      if (countries.length === 1) {
        clearCountryList();

        const html = countries.reduce(
          (markup, country) => createCountryInfo(country) + markup,
          ''
        );

        refs.countryInfo.innerHTML = html;
        Notify.success('This is your country');
      }
    })

    .catch(err => {
      clearCountryList();
      clearCountryInfo();
      Notify.failure('Oops, there is no country with that name');
    });
}
