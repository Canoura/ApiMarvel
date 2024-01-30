const marvel = {
    render: () => {

        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=80f1cb6951bebf766987c60e778610ca&hash=75c47e64e26d6b36f547e4c8304a29ad';
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
            })
    }

};

marvel.render();