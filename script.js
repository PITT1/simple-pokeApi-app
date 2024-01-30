const input = document.querySelector('.input');
const buscar = document.querySelector('.buscar');
const contenedor = document.querySelector('.container');
const autoSearchDom = document.querySelector('.autoSearch');

var pokemonNames = [];

async function fetchData(){
    try {
        for (let i = 1; i < 152; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();

            var numberContent = document.createElement('p');
            numberContent.className = 'number';
            numberContent.innerText = `#${i}`;

            var type0Content = document.createElement('div');
            type0Content.id = 'type0';
            type0Content.classList.add(data.types[0].type.name);

            var type1Content = document.createElement('div');
            type1Content.id = 'type1';
            type1Content.classList.add(data.types[1] ? data.types[1].type.name : "none");

            var typesContent = document.createElement('span');
            typesContent.className = 'types';

            var spriteContent = document.createElement('div');
            spriteContent.className = 'sprite';
            spriteContent.style.backgroundImage = `url("${data.sprites.front_default}")`;

            var nameContent = document.createElement('p');
            nameContent.className = 'name';
            nameContent.innerText = data.name;


            var tarjetaContent = document.createElement('div');
            tarjetaContent.className = 'card';

            contenedor.appendChild(tarjetaContent);
            tarjetaContent.appendChild(numberContent);
            tarjetaContent.appendChild(spriteContent);
            tarjetaContent.appendChild(typesContent);
            typesContent.appendChild(type0Content);
            typesContent.appendChild(type1Content)
            tarjetaContent.appendChild(nameContent);

            pokemonNames.push(tarjetaContent.textContent);
        }
    } catch (error) {
        console.alert("error");
    }
}

fetchData();

buscar.addEventListener('click', () => {
    console.log(input.value);
    autoSearchDom.innerHTML = '';
})

const searchPokemon = (query) => {
    let results = [];
    pokemonNames.forEach( name => {
        if(name.toLowerCase().includes(query.toLowerCase())){
            results.push(name);
        }
    });
    return results;
};

input.addEventListener('input', () => {
    const query = input.value;
    if (query.length > 0) {
        const results = searchPokemon(query);
        autoSearchDom.innerHTML = "";
        results.map(name => {
            autoSearchDom.innerHTML += `<div class="searchItem">${name}</div>`;
        })
        const searchItem = document.querySelectorAll('.searchItem');
        searchItem.forEach(item => {
            item.addEventListener('click', () => {
                input.value = item.innerText;
            })
        })
    }
    if (query == 0) {
        autoSearchDom.innerText = "";
    }
})