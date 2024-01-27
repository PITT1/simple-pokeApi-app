const spriteBox = document.querySelector('.sprite');
const nameBox = document.querySelector('.name');
const input = document.querySelector('.input');
const buscar = document.querySelector('.buscar');
const type0 = document.getElementById('type0');
const type1 = document.getElementById('type1');

var tipo1 = "";

const card = (name, sprite, objectType0, objectType1) => ({
    name: name,
    sprite: sprite,
    objectType0: objectType0,
    objectType1: objectType1,
    draw () {
        nameBox.innerText = this.name;
        spriteBox.style.backgroundImage = this.sprite;
        type0.className = "";
        type1.className = "";
        type0.classList.add(this.objectType0);
        type1.classList.add(this.objectType1);
    }
})

async function fetchData(){
    try {
        for (let i = 1; i < 15; i++) {
            const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${i}`);
            const data = await response.json();
            const tarjeta = card(data.name, `url("${data.sprites.front_default}")`, data.types[0].type.name, data.types[1] ? data.types[1].type.name : "none");
            tarjeta.draw();
        }
    } catch (error) {
        console.alert("error");
    }
}

fetchData();