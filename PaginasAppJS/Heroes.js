const marvel = {
    render: () => {

        const urlAPI = 'https://gateway.marvel.com:443/v1/public/characters?ts=1&apikey=80f1cb6951bebf766987c60e778610ca&hash=75c47e64e26d6b36f547e4c8304a29ad';
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(urlAPI)
            .then(respuesta => respuesta.json())
            .then((json) => {
                for (const heroe of json.data.results) {
                    let urlHeroes = heroe.urls[0].url;
                    contentHTML += `
                        <div class="col-md-4">
                        <a href="${urlHeroes}" target="_blank">
                            <img src="${heroe.thumbnail.path}.${heroe.thumbnail.extension}" alt="${heroe.name}" class="img-thumbnail">
                        </a>
                        <h3 class="title">${heroe.name}</h3>
                    </div>`;

                }
                container.innerHTML = contentHTML;
            })
    }

};

marvel.render();