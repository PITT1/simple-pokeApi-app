const spriteBox = document.querySelector('.sprite');
const nameBox = document.querySelector('.name');
const input = document.querySelector('.input');
const buscar = document.querySelector('.buscar');
const type0 = document.getElementById('type0');
const type1 = document.getElementById('type1');

let pokemon = "";

const printTypes = (type_0, type_1) => {
    type0.className = "";
    type1.className = "";
    type0.classList.add(type_0);
    type1.classList.add(type_1);
}

async function fetchData(){
    try {
        const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`);
        const data = await response.json();
        nameBox.innerText = data.name;
        spriteBox.style.backgroundImage = `url("${data.sprites.front_default}")`;
        try {
            var tipo1 = data.types[1].type.name;
        } catch (err) {
            var tipo1 = "none";
        }
        printTypes(data.types[0].type.name, tipo1);
    } catch (error) {
        console.alert("error");
    }
}

buscar.addEventListener('click', () => {
    pokemon = input.value;
    fetchData();
});

document.addEventListener('keydown', e => {
    if (e.key == 'Enter') {
        pokemon = input.value;
        fetchData();
    }
})