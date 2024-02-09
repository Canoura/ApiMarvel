const marvel = {
    limit: 15,  // Indica la cantidad de elementos que van a salir por página 
    offset: 0, // Indica el punto de inicio de la paginación, es decir, desde que heoroe va a empezarse a mostrar

    render: function () {
        const effectiveLimit = this.limit; // Usa el límite que se ha seleccionado para hacer la llamada a la api poniendose asi el valor de limit
        const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?limit=${effectiveLimit}&offset=${this.offset}&ts=1&apikey=80f1cb6951bebf766987c60e778610ca&hash=75c47e64e26d6b36f547e4c8304a29ad`;
        const container = document.querySelector('#marvel-row');
        let contentHTML = ''; 

        fetch(urlAPI)
            .then(respuesta => respuesta.json())
            .then((json) => {
                for (const heroe of json.data.results) {
                    // Para nos mostrar los que no tienen imagenes disponibles
                    if (heroe.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                        let urlHeroes = heroe.urls[0].url;
                        contentHTML += `
                            <div class="col-lg-4 col-sm-6 col-xs-12 hero-container">
                                <a href="${urlHeroes}" target="_blank" class="hero-link">
                                    <img src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="${heroe.name}" class="hero-image">
                                </a>
                                <h3 class="title">${heroe.name}</h3>
                            </div>`;
                    }
                }

                container.innerHTML = contentHTML;
            });
    },

    PaginaAnterior: function () {
        if (this.offset > 0) {
            this.offset -= this.limit;
            this.render();
        }
        window.scrollTo(0, 0);
    },

    PaginaSiguiente: function () {
        this.offset += this.limit;
        this.render();
        window.scrollTo(0, 0);
    },

    changePageSize: function (newSize) {
        this.limit = parseInt(newSize, 10);
        this.offset = 0;
        this.render();
    }
}; marvel.render();

document.getElementById('searchInput').addEventListener('input', function() {
    const searchValue = this.value;
    buscador.name = searchValue; // Actualiza la propiedad name con el valor de búsqueda
    buscador.offset = 0; // Restablece el offset a 0 para comenzar desde el primer resultado
    
    if (!searchValue.trim()) {
        document.querySelector('#marvel-row').style.display = ''; // Vuelve a mostrar los resultados generales si no hay búsqueda
        document.querySelector('#resultsContainer').innerHTML = ''; // Limpia los resultados de búsqueda
        marvel.render(); // Opcionalmente, puedes querer volver a cargar/renderizar los resultados generales
    } else {
        document.querySelector('#marvel-row').style.display = 'none'; // Oculta los resultados generales durante la búsqueda
        buscador.render(); // Llama a render para buscar y mostrar héroes basado en el nombre
    }
});

const buscador = {
    limit: 15,
    offset: 0,
    name: '',
    render: function () {
        if (!this.name.trim()) {
            document.getElementById('resultsContainer').innerHTML = '';
            // Si no hay nombre, no hace falta ocultar #marvel-row aquí porque ya se maneja en el event listener de 'input'
            return; // Si no hay nombre, limpia los resultados y no hace una llamada API.
        }

        const effectiveLimit = this.limit;
        const urlAPI = `https://gateway.marvel.com:443/v1/public/characters?nameStartsWith=${encodeURIComponent(this.name)}&limit=${effectiveLimit}&offset=${this.offset}&ts=1&apikey=80f1cb6951bebf766987c60e778610ca&hash=75c47e64e26d6b36f547e4c8304a29ad`;
        const container = document.querySelector('#resultsContainer');
        container.innerHTML = ''; // Limpia los resultados anteriores antes de mostrar nuevos

        fetch(urlAPI)
            .then(respuesta => respuesta.json())
            .then((json) => {
                let contentHTML = '';
                for (const heroe of json.data.results) {
                    if (heroe.thumbnail.path !== 'http://i.annihil.us/u/prod/marvel/i/mg/b/40/image_not_available') {
                        let urlHeroes = heroe.urls[0].url;
                        contentHTML += `
                            <div class="col-lg-4 col-sm-6 col-xs-12 hero-container">
                                <a href="${urlHeroes}" target="_blank" class="hero-link">
                                    <img src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="${heroe.name}" class="hero-image">
                                </a>
                                <h3 class="title">${heroe.name}</h3>
                            </div>`;
                    }
                }
                container.innerHTML = contentHTML;
            });
    },
};