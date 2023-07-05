
window.addEventListener("load", function () {
    buscarInformacion();
    buscarImagenes();
});


function buscarImagenes(){
    const apiKey='ad05f78e18b94343a15dd5231ca7eceb';

    fetch('https://api.unsplash.com/search/photos?query=futbol+argentina&w=740&h=500',
    {
        headers : {
        'Authorization':'Client-ID ' + apiKey,
        'Accept-Version' : 'v1'
        }
    }
    )
    .then((res) => {
        if(res.ok){
        return res.json();
    }
    })
    .then((data) => {
        const imagenes = data.results;
        for (let i=0; i < 3; i++){

            const img = document.getElementById('img'+i);
            img.setAttribute('src', imagenes[i].urls.regular);
            
        }
    }).catch((error) => {
    console.log('error', error)
    });
}

async function buscarInformacion() {
    const temaBuscar = 'Futbol Argentina';
    const apiKey = 'ad05f78e18b94343a15dd5231ca7eceb';
  
    await fetch(`https://newsapi.org/v2/everything?q=${temaBuscar}&sortBy=publishedAt&apiKey=${apiKey}`)
        .then((res) => {
        if (res.ok) {
          return res.json();
        }
        })
        .then((data) => {
        const cardRow = document.getElementById('cardRow');
        const fondo = document.createElement('div');
        fondo.classList.add('fondo');
        const colContainer = document.createElement('div');
        colContainer.classList.add('container');
        colContainer.classList.add('row');
  
        const limiteMostrar = 2;
        let elementosMostrados = 0;
  
        for (let i = 0; i < data.articles.length; i++) {
            if (elementosMostrados >= limiteMostrar) {
                break;
            }
  
            const cardColumn = document.createElement('div');
            cardColumn.classList.add('col-md-6');
    
            const card = document.createElement('div');
            card.classList.add('card');
            card.classList.add('m-2');
    
            const img = document.createElement('img');
            img.setAttribute('src', data.articles[i].urlToImage);
            img.classList.add('card-img-top');
    
            const cardBody = document.createElement('div');
            cardBody.classList.add('card-body');
    
            const cardTitle = document.createElement('h5');
            cardTitle.classList.add('card-title');
            cardTitle.appendChild(document.createTextNode(data.articles[i].title));
    
            const cardText = document.createElement('p');
            cardText.classList.add('card-text');
    
            
            let content = data.articles[i].content;
            if (content && content.length > 200) {
                content = content.slice(0, 200) + '.';
            }
            cardText.appendChild(document.createTextNode(content));
    
            const a = document.createElement('a');
            a.classList.add('btn');
            a.classList.add('btn-primary');
            a.setAttribute('href', data.articles[i].url);
            a.setAttribute('target', '_blank');
            a.appendChild(document.createTextNode('Ver Noticia'));
    
            cardBody.appendChild(img);
            cardBody.appendChild(cardTitle);
            cardBody.appendChild(cardText);
            cardBody.appendChild(a);
            card.appendChild(cardBody);
            cardColumn.appendChild(card);
            colContainer.appendChild(cardColumn);
    
            elementosMostrados++;
        }
  
        const verMasBtn = document.createElement('button');
        verMasBtn.classList.add('btn');
        verMasBtn.classList.add('btn-primary');
        verMasBtn.classList.add('ver-mas-btn');
        verMasBtn.appendChild(document.createTextNode('Ver más noticias'));
  
        verMasBtn.addEventListener('click', function () {
            for (let i = elementosMostrados; i < data.articles.length; i++) {
                const cardColumn = document.createElement('div');
                cardColumn.classList.add('col-md-6');
    
                const card = document.createElement('div');
                card.classList.add('card');
                card.classList.add('m-2');
    
                const img = document.createElement('img');
                img.setAttribute('src', data.articles[i].urlToImage);
                img.classList.add('card-img-top');
    
                const cardBody = document.createElement('div');
                cardBody.classList.add('card-body');
    
                const cardTitle = document.createElement('h5');
                cardTitle.classList.add('card-title');
                cardTitle.appendChild(document.createTextNode(data.articles[i].title));
    
                const cardText = document.createElement('p');
                cardText.classList.add('card-text');
    
                
                let content = data.articles[i].content;
                if (content && content.length > 200) {
                    content = content.slice(0, 200) + '.';
                }
                cardText.appendChild(document.createTextNode(content));
    
                const a = document.createElement('a');
                a.classList.add('btn');
                a.classList.add('btn-primary');
                a.setAttribute('href', data.articles[i].url);
                a.setAttribute('target', '_blank');
                a.appendChild(document.createTextNode('Ver Noticia'));
    
                cardBody.appendChild(img);
                cardBody.appendChild(cardTitle);
                cardBody.appendChild(cardText);
                cardBody.appendChild(a);
                card.appendChild(cardBody);
                cardColumn.appendChild(card);
                colContainer.appendChild(cardColumn);
            }
  
            verMasBtn.style.display = 'none';
        });
  
        colContainer.appendChild(verMasBtn);
  
        fondo.appendChild(colContainer);
        cardRow.appendChild(fondo);
        })
        .catch((error) => {
        console.log('Error', error);
        });
}