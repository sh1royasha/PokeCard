function iniciarApp(){

    const search = document.querySelector(".search");
    const card = document.querySelector(".card")
    const body = document.querySelector(".body")

    search.addEventListener('click',buscarPokemon);

    function buscarPokemon(){

        const pokemon = document.querySelector('#pokemon').value;
        const url = `https://pokeapi.co/api/v2/pokemon/${pokemon}`;

        if(pokemon === '')
        return;

        fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data)=> mostrarPokemon(data))
        .catch((error)=> console.error(error));

    }

    function mostrarPokemon(e){
        
        limpiarHtml(body)

        const {name, sprites, types} = e;
        const image = sprites.other.home['front_default'];

        const imagenPokemon = document.createElement('IMG');
        imagenPokemon.alt = `Imagen de ${name}`;
        imagenPokemon.src = image;
        
        // console.log(types)

        const nombrePokemon = document.createElement('H3')
        nombrePokemon.textContent = name;

        const tiposPokemon = document.createElement('DIV')
        
        const tipos = tipoPokemon(types);

        tipos.forEach(tipo=>{
            const nombreTipo = tipo.nombre;
            const label = document.createElement('BUTTON');
            label.textContent = nombreTipo;
            label.style.background = `${tipo.color}`
            tiposPokemon.appendChild(label)
        })



        // console.log(tiposPokemon)

        body.appendChild(imagenPokemon)
        body.appendChild(nombrePokemon)
        body.appendChild(tiposPokemon)

        imagenPokemon.classList.add("active")
        card.classList.add("active")
        body.classList.add("active")
    }

    const tipoPokemon = function(elements){
        const tipos = [];

         const colores = [
             {nombre: "normal", color:"#A8A77A"},
             {nombre: "fire", color:"#EE8130"},
             {nombre: "water", color:"#6390F0"},
             {nombre: "electric", color:"#F7D02C"},
             {nombre: "grass", color:"#7AC74C"},
             {nombre: "ice", color:"#96D9D6"},
             {nombre: "fighting", color:"#C22E28"},
             {nombre: "poison", color:"#A33EA1"},
             {nombre: "ground", color:"#E2BF65"},
             {nombre: "flying", color:"#A98FF3"},
             {nombre: "psychic", color:"#F95587"},
             {nombre: "bug", color:"#A6B91A"},
             {nombre: "rock", color:"#B6A136"},
             {nombre: "ghost", color:"#735797"},
             {nombre: "dragon", color:"#6F35FC"},
             {nombre: "dark", color:"#705746"},
                {nombre: "steel", color:"#B7B7CE"},
             {nombre: "fairy", color:"#D685AD"},
         ];
    
            
         elements.forEach(element=>{
             const nombreTipo = element.type.name;
             const tipo = colores.find(color=>{
                 if(color.nombre === nombreTipo){
                     tipos.push(color);
                 }
             })
         })
    
         return tipos;
    }

    function limpiarHtml(selector){
        while(selector.firstChild){
            selector.removeChild(selector.firstChild);
        }
    }
}

document.addEventListener('DOMContentLoaded',iniciarApp);