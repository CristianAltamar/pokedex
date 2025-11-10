const listaPokemon = document.querySelector("#listaPokemon");
const navList = document.querySelector(".nav-list");
const inputSearch = document.querySelector("#search")
let URL = "https://pokeapi.co/api/v2/pokemon/";

const estrella = id => {
    return (
    `<svg class="estrella-icon" id=${id} width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
        
        <title>start-favorite</title>
        <desc>Created with Sketch Beta.</desc>
        <defs>

    </defs>
        <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
            <g id="Icon-Set" sketch:type="MSLayerGroup" transform="translate(-152.000000, -879.000000)" fill="#000000ff">
                <path d="M168,903.21 L160.571,907.375 L161.989,898.971 L155.594,892.442 L164.245,891.317 L168,883.313 L171.722,891.317 L180.344,892.54 L174.011,899.002 L175.335,907.406 L168,903.21 L168,903.21 Z M184,891.244 L172.962,889.56 L168,879 L163.038,889.56 L152,891.244 L159.985,899.42 L158.095,911 L168,905.53 L177.905,911 L176.015,899.42 L184,891.244 L184,891.244 Z" id=${id} sketch:type="MSShapeGroup">

    </path>
            </g>
        </g>
    </svg>`
)}

const ativeStart = id => (`<svg id=${id} width="15px" height="15px" viewBox="0 0 32 32" version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" xmlns:sketch="http://www.bohemiancoding.com/sketch/ns">
    
    <title>start-favorite</title>
    <desc>Created with Sketch Beta.</desc>
    <defs>

</defs>
    <g id="Page-1" stroke="none" stroke-width="1" fill="none" fill-rule="evenodd" sketch:type="MSPage">
        <g id="Icon-Set-Filled" sketch:type="MSLayerGroup" transform="translate(-154.000000, -881.000000)" fill="#ffee00ff">
            <path d="M186,893.244 L174.962,891.56 L170,881 L165.038,891.56 L154,893.244 L161.985,901.42 L160.095,913 L170,907.53 L179.905,913 L178.015,901.42 L186,893.244" id=${id} sketch:type="MSShapeGroup">

</path>
        </g>
    </g>
</svg>`)

let data = []
const fetchData = async url => {
    for (let i = 1; i <= 151; i++) {
        const d = await fetch(url + i)
            .then((response) => response.json())
            .then(res => res)
        data = [...data, d]
    }
    mostrarPokemon(data)
}
fetchData(URL)


function mostrarPokemon(pokes) {
    const favorites = JSON.parse(localStorage.getItem("Favorite") || "[]");
    names = favorites.map(p => p.name)
    pokes.forEach(poke => {
        let tipos = poke.types.map((type) => `<p class="${type.type.name} tipo">${type.type.name}</p>`);
        tipos = tipos.join('');

        let pokeId = poke.id.toString();
        if (pokeId.length === 1) {
            pokeId = "00" + pokeId;
        } else if (pokeId.length === 2) {
            pokeId = "0" + pokeId;
        }


        const div = document.createElement("div");
        div.classList.add("pokemon");
        div.id = poke.name;
        iconFavorite = !names.includes(poke.name) ? estrella(poke.name) : ativeStart(poke.name)
        div.innerHTML = `
            <button class="button-icon" id="${poke.name}">${iconFavorite}</button>
            <p class="pokemon-id-back">#${pokeId}</p>
            <div class="pokemon-imagen">
                <img src="${poke.sprites.other["official-artwork"].front_default}" alt="${poke.name}">
            </div>
            <div class="pokemon-info">
                <div class="nombre-contenedor">
                    <p class="pokemon-id">#${pokeId}</p>
                    <h2 class="pokemon-nombre">${poke.name}</h2>
                </div>
                <div class="pokemon-tipos">
                    ${tipos}
                </div>
                <div class="pokemon-stats">
                    <p class="stat">${poke.height}m</p>
                    <p class="stat">${poke.weight}kg</p>
                </div>
            </div>
        `;
        listaPokemon.append(div);
    })
}

navList.addEventListener("click", e => {
    if (e.target.classList[0] === "btn") {
        inputSearch.value = "";
        const botonId = e.target.id;

        if (botonId === "favorite") {
            const favorites = JSON.parse(localStorage.getItem("Favorite") || "[]");
            listaPokemon.innerHTML = "";
            mostrarPokemon(favorites);
            return
        }

        if(botonId === "ver-todos") {
            listaPokemon.innerHTML = "";
            mostrarPokemon(data);
            return
        } 
        
        const dataFilter = data.filter(d => d.types.map(t => t.type.name).includes(botonId) )

        listaPokemon.innerHTML = "";
        mostrarPokemon(dataFilter)
    }
})

inputSearch.addEventListener("input", e => {
    if (e.target.value.length > 0) {
        const dataFilter = data.filter(d => d.name.toLowerCase().includes(e.target.value.toLowerCase()))
        listaPokemon.innerHTML = "";
        mostrarPokemon(dataFilter)
        return
    }

    listaPokemon.innerHTML = "";
    mostrarPokemon(data)
})

listaPokemon.addEventListener("click", e => {
    poke = data.find(d => d.name === e.target.id)

    if (poke) {
        prevFavorite = JSON.parse(localStorage.getItem("Favorite") || "[]");
        names = prevFavorite.map(p => p.name)
        if (names.includes(poke.name)) {
            newFavorite = prevFavorite.filter(p => p.name !== poke.name)
        } else {
            newFavorite = [...prevFavorite, poke]
        }
        localStorage.setItem('Favorite', JSON.stringify(newFavorite));
        listaPokemon.innerHTML = "";
        mostrarPokemon(data)
    }
})