const marvel = {
    render: () => {

        const urlAPI = 'https://gateway.marvel.com:443/v1/public/comics?ts=1&apikey=80f1cb6951bebf766987c60e778610ca&hash=75c47e64e26d6b36f547e4c8304a29ad';
        const container = document.querySelector('#marvel-row');
        let contentHTML = '';

        fetch(urlAPI)
            .then(respuesta => respuesta.json())
            .then((json) => {
                for (const comics of json.data.results) {
                    let urlComics = comics.urls[0].url;
                    contentHTML += `
                        <div class="col-md-4">
                        <a href="${urlComics}" target="_blank">
                            <img src="${comics.thumbnail.path}.${comics.thumbnail.extension}" alt="${comics.title}" class="img-thumbnail">
                        </a>
                        <h3 class="title">${comics.title}</h3>
                    </div>`;

                }
                container.innerHTML = contentHTML;
            })
    }

};

marvel.render();