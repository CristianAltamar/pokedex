const listaPokemon = document.querySelector("#listaPokemon");
const navList = document.querySelector(".nav-list");
const inputSearch = document.querySelector("#search")
let URL = "https://pokeapi.co/api/v2/pokemon/";

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
        div.innerHTML = `
            <button><img src="../img/estrella.svg" alt="${poke.name}"><button/>
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
        const dataFilter = data.filter(d => d.name.includes(e.target.value))
        listaPokemon.innerHTML = "";
        mostrarPokemon(dataFilter)
        return
    }

    listaPokemon.innerHTML = "";
    mostrarPokemon(data)
})

listaPokemon.addEventListener("click", e => {
    console.log()
})