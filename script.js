const getFilmsData = async ()=>{
    try{
        const response = await fetch('https://swapi.dev/api/films/');
        if (response.ok) {
            const data = await response.json();
            return data.results
        } else {
            throw 'no se encuentran los datos'
        }
        } catch (error) {
            console.log(error)
        }
}

const paintGraph = (canvasName, AxisX, AxisY, tituloGrafica, empiezaEnCero) =>{
  const ctx = document.getElementById(canvasName);
  
    new Chart(ctx, {
      type: 'bar',
      data: {
        labels: AxisX,
        datasets: [{
          label: tituloGrafica,
          data: AxisY,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          y: {
            beginAtZero: empiezaEnCero
          }
        }
      }
    });
  }

const paintYearOfFilm = async () => {
    let titleFilm=[];
    let yearFilm=[];
    const data = await getFilmsData();
    data.forEach(element=>{
        titleFilm.push(element.title);
        yearFilm.push(parseInt(element.release_date.substr(0,4)));
    })
    paintGraph('myChart', titleFilm, yearFilm, 'TITULO DE LA PELICULA VS AÑO DE LANZAMIENTO', false);
}
paintYearOfFilm()

const getCharactersData = async() => {
    try{
        const response = await fetch('https://swapi.dev/api/people/');
        if (response.ok) {
            const data = await response.json();
            return data.results
        } else {
            throw 'no se encuentran los datos'
        }
        } catch (error) {
            console.log(error)
        }
}

const paintGraphCharacterEpisodes= async() => {
    const namesCharacter = [];
    const numberEpisodesPerCharacter =[]
    const data = await getCharactersData();
    console.log(data);
    data.forEach(element=>{
        console.log(element)
        namesCharacter.push(element.name);
        console.log(element.films)
        numberEpisodesPerCharacter.push(element.films.length);
    })
    paintGraph('myChart2', namesCharacter, numberEpisodesPerCharacter, 'PERSONAJE VS NUMERO DE PELICULAS EN LAS QUE APARECE', true);
}
paintGraphCharacterEpisodes();