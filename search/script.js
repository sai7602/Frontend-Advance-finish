const input = document.querySelector('.search');
const list = document.querySelector('[class=suggestions]');
const clear = document.querySelector('.clear');

const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
let cities = [];

fetch(endpoint)
    .then(response => response.json())
    .then(response => cities.push(...response));

function findMatches(wordToMatch, cities) {
    return cities.filter(value => {
        let regex = new RegExp(wordToMatch, 'gi');
        return value.city.match(regex) || value.state.match(regex);
    })
}
function highlightQuery(string, query) {
    const regex = new RegExp(query, "gi");
    return string.replace(regex, (match) => `<mark>${match}</mark>`);
}

function sorting(item) {
    return item.sort((a, b) => a.city === b.city ? 0 : a.city < b.city ? -1 : 1 )
}

function displayMatches() {
    const matches = findMatches(this.value, cities);
    sorting(matches);
    if (input.value === ""){
        clearInput();
    } else if (matches.length > 0){
        clear.style.display = 'block';
        list.innerHTML = matches.map(place => {
        return `
            <li>${highlightQuery(place.city, input.value)} - ${highlightQuery(place.state, input.value)}</li>
        `
    }).join('');
    } else {
        list.innerHTML = `
        <li>Not found any matches! Please, try again!</li>
        `
    }
}
function clearInput() {
    input.value = "";
    clear.style.display = 'none';
    list.innerHTML = `
        <li>Filter for a city or state</li>
        
        `
}

input.addEventListener('keyup', displayMatches);
clear.addEventListener('click', clearInput);