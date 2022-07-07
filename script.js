const getPokemon = () => {
    const getPokemonUrl = id => `https://pokeapi.co/api/v2/pokemon/${id}`
    const pokePromises = []

    for (let i = 1; i <= 150; i++) {
        pokePromises.push(fetch(getPokemonUrl(i)).then(response => response.json()))  
       
    }

    Promise.all(pokePromises)
        .then(pokemons => {
            
            const lisPokemon = pokemons.reduce((accumulator, pokemon) => {
                const types = pokemon.types.map(typeInfo => typeInfo.type.name)

                accumulator += `
                <li class="card ${types[0]}">
                <img class="card-image" alt="${pokemon.name}" />
                    <h2 class="card-title">${pokemon.id}. ${pokemon.name}</h2>
                    <p class ="card-subtitle">${types.join(" | ")}</p>
                </li>
                `
                return accumulator
            }, "" )

            const ul = document.querySelector('[data-js="pokedex"]')

            ul.innerHTML = lisPokemon

        })
            

         
} 

getPokemon() 







    
         


