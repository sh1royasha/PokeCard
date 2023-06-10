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

        active(card);
        spiner(body);
        myFecth(url);
    }

    function myFecth(url){

    const spin = document.querySelector('.spinner');
    spin.style.display="block";

        fetch(url)
        .then((response)=>{
            if(!response.ok){
                throw new Error(`Error HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then((data)=> {
            mostrarPokemon(data)
            spin.style.display="none";
        })
        .catch((error)=> {
            erro404()
        })
    }

    function mostrarPokemon(element){
        
        limpiarHtml(body)

        const {name, sprites, types, height, weight} = element;
        const image = sprites.other.home['front_default'];

        // imagen 
        const imagenPokemon = document.createElement('IMG');
        imagenPokemon.alt = `Imagen de ${name}`;
        imagenPokemon.src = image;
        
        // Nombre
        const nombrePokemon = document.createElement('H3')
        nombrePokemon.textContent = name;
        

        // Tipos
        const tiposPokemon = document.createElement('DIV')
        const tipos = tipoPokemon(types);

        tipos.forEach(tipo=>{
            const nombreTipo = tipo.nombre;
            const button = document.createElement('BUTTON');
            button.textContent = nombreTipo;
            button.style.background = `${tipo.color}`
            tiposPokemon.appendChild(button)
        })

        // Activar estilos
        active(imagenPokemon);
        active(card);
        active(body);

        // Incrustar componentes
        body.appendChild(imagenPokemon)
        body.appendChild(nombrePokemon)
        body.appendChild(tiposPokemon)

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

    function erro404(){
        body.classList.add("active")
        card.classList.add("active")
        body.innerHTML = `
            <img src="./img/error.png" alt="404-error">
            <h3>Upps!, No se encontro el pokemon deseado</h3>
        `
        spin.style.display="none";
    }

    function active(element){
        element.classList.add("active");
    }

    function spiner(element){
        element.innerHTML = `
        <div class="spinner">
            <div class="bounce1"></div>
            <div class="bounce2"></div>
            <div class="bounce3"></div>
        </div>
    `
    }
    
}

document.addEventListener('DOMContentLoaded',iniciarApp);