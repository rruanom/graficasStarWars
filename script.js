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

const paintYearOfFilm = async () => {
    let titleFilm=[];
    let yearFilm=[];
    const data = await getFilmsData();
    data.forEach(element=>{
        titleFilm.push(element.title);
        yearFilm.push(parseInt(element.release_date.substr(0,4)));
    })
    paintGraph('myChart', titleFilm, yearFilm);
}
paintYearOfFilm()

const paintGraph = (canvasName, AxisX, AxisY) =>{
const ctx = document.getElementById(canvasName);

  new Chart(ctx, {
    type: 'bar',
    data: {
      labels: AxisX,
      datasets: [{
        label: 'Year of films',
        data: AxisY,
        borderWidth: 1
      }]
    },
    options: {
      scales: {
        y: {
          beginAtZero: false
        }
      }
    }
  });
}

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
    paintGraph('myChart2', namesCharacter, numberEpisodesPerCharacter);
}
paintGraphCharacterEpisodes();