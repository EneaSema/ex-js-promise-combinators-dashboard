console.log(`ciao`);
// In questo esercizio, utilizzerai Promise.all() per creare la funzione getDashboardData(query), che accetta una città come input e recupera simultaneamente:
// Nome completo della città e paese da  /destinations?search=[query]
// (result.name, result.country, nelle nuove proprietà city e country).
// Il meteo attuale da /weathers?search={query}
// (result.temperature e result.weather_description nella nuove proprietà temperature e weather).
// Il nome dell’aeroporto principale da /airports?search={query}
// (result.name nella nuova proprietà airport).
// Utilizzerai Promise.all() per eseguire queste richieste in parallelo e poi restituirai un oggetto con i dati aggregati.
// Attenzione: le chiamate sono delle ricerche e ritornano un’array ciascuna, di cui devi prendere il primo risultato (il primo elemento).
// Note del docente
// Scrivi la funzione getDashboardData(query), che deve:
// Essere asincrona (async).
// Utilizzare Promise.all() per eseguire più richieste in parallelo.
// Restituire una Promise che risolve un oggetto contenente i dati aggregati.
// Stampare i dati in console in un messaggio ben formattato.
// Testa la funzione con la query "london"
// Esempio di utilizzo
// getDashboardData('london')
//     .then(data => {
//         console.log('Dasboard data:', data);
//         console.log(
//             `${data.city} is in ${data.country}.\n` +
//             `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`+
//             `The main airport is ${data.airport}.\n`
//         );
//     })
//     .catch(error => console.error(error));
// Esempio di output atteso
// // Risposta API
// {
//   city: "London",
//   country: "United Kingdom",
//   temperature: 18,
//     weather: "Partly cloudy",
//   airport: "London Heathrow Airport"
// }
// ​
// // Output in console
// London is in United Kingdom.
// Today there are 18 degrees and the weather is Partly cloudy.
// The main airport is London Heathrow Airport.

//SOLUZIONE:

// async function getDashboardData(query) {
//try{
//   const destinationsFetch = await fetch(
//     `http://localhost:3333/destinations?search=${[query]}`
//   );
//   const destinationsResponse = destinationsFetch.json();
//   console.log(`Il risultato per la città è:`, destinationsResponse);

//   const weathersFetch = await fetch(
//     `http://localhost:3333/weathers?search=${query}`
//   );
//   const weathersResponse = weathersFetch.json();
//   console.log(`Il risultato per il meteo è:`, weathersResponse);

//   const airportsFetch = await fetch(
//     `http://localhost:3333/airports?search=${query}`
//   );
//   const airportsResponse = airportsFetch.json();

//   console.log(`Il risultato per aereoporto è:`, airportsResponse);

//   const promises = [destinationsResponse, weathersResponse, airportsResponse];

//   const results = await Promise.all(promises);

//   // ALTRE SOLUZIONI POSSIBILI:
//   // posso fare ho il destructturing di result:
//   // const [destinations, weathers,airports] = results
//   // OPPURE
//   // crearmi le singole variabili:
//   // const destinations = results[0]
//   // const weathers = results[1]
//   // const airports = results[2]
//   // DEVO RICORDARMI IN QUESTI CASI DI PRENDERE IL PRIMO ELEMENTO DELL'ARRAY, QUINDI ELEMEMNTO CON INDICE ZERO [0]

//   console.log(results);

//   const data = {
//     city: results[0][0].name,
//     country: results[0][0].country,
//     temperature: results[1][0].temperature,
//     weather: results[1][0].weather_description,
//     airport: results[2][0].name,
//   };
//   console.log(data);
//   return data;
// } catch (error) {
//   console.log("Errore nel recuepro dei dati;", error.messagge)
// }

// }

// (async () => {
//   getDashboardData(`london`)
//     .then((data) => {
//       console.log("Dasboard data:", data);
//       console.log(
//         `${data.city} is in ${data.country}.\n` +
//           `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n` +
//           `The main airport is ${data.airport}.\n`
//       );
//     })
//     .catch((error) => console.error(error));
// })();

//🎯 Bonus 1 - Risultato vuoto
// Se l’array di ricerca è vuoto, invece di far fallire l'intera funzione,
// semplicemente i dati relativi a quella chiamata verranno settati a null e  la frase relativa non viene stampata.
// Testa la funzione con la query “vienna” (non trova il meteo).

// async function getDashboardData(query) {
//   const destinationsFetch = await fetch(
//     `http://localhost:3333/destinations?search=${[query]}`
//   );
//   const destinationsResponse = destinationsFetch.json();
//   console.log(destinationsResponse);

//   const weathersFetch = await fetch(
//     `http://localhost:3333/weathers?search=${query}`
//   );
//   const weathersResponse = weathersFetch.json();
//   console.log(weathersResponse);

//   const airportsFetch = await fetch(
//     `http://localhost:3333/airports?search=${query}`
//   );
//   const airportsResponse = airportsFetch.json();
//   console.log(airportsResponse);

//   const promises = [destinationsResponse, weathersResponse, airportsResponse];

//   const results = await Promise.all(promises);
//   console.log(results);

//   const [destinations, weathers, airports] = results;
//   console.log(`Risultati di promise.all:`, results);

//   const data = {
//     city: null,
//     country: null,
//     temperature: null,
//     weather: null,
//     airport: null,
//   };

//   if (destinations.length > 0) {
//     data.city = destinations[0].name;
//     data.country = destinations[0].country;
//   }

//   if (weathers.length > 0) {
//     data.temperature = weathers[0].temperature;
//     data.weather = weathers[0].weathers_description;
//   }

//   if (airports.length > 0) {
//     data.airport = airports[0].name;
//   }

//   console.log(data);
//   return data;
// }

// (async () => {
//   getDashboardData("vienna")
//     .then((data) => {
//       console.log("Dasboard data:", data);
//       let outString = `${data.city} is in ${data.country}.\n`;

//       if (data.temperature !== null) {
//         outString += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
//       }
//       if (data.airport !== null)
//         [(outString += `The main airport is ${data.airport}.\n`)];

//       console.log(outString);
//     })
//     .catch((error) => console.error(error));
// })();

//🎯 Bonus 2 - Chiamate fallite
//Attualmente, se una delle chiamate fallisce, **Promise.all()** rigetta l'intera operazione.

//Modifica `getDashboardData()` per usare **Promise.allSettled()**, in modo che:
//Se una chiamata fallisce, i dati relativi a quella chiamata verranno settati a null.
//Stampa in console un messaggio di errore per ogni richiesta fallita.
//Testa la funzione con un link fittizio per il meteo (es. https://www.meteofittizio.it).

async function getDashboardData(query) {
  const destinationsFetch = await fetch(
    `http://localhost:3333/destinations?search=${[query]}`
  );
  const destinationsResponse = destinationsFetch.json();
  console.log(destinationsResponse);

  const weathersFetch = await fetch(`https://www.meteofittizio.it`);
  const weathersResponse = weathersFetch.json();
  console.log(weathersResponse);

  const airportsFetch = await fetch(
    `http://localhost:3333/airports?search=${query}`
  );
  const airportsResponse = airportsFetch.json();
  console.log(airportsResponse);

  const promises = [destinationsResponse, weathersResponse, airportsResponse];

  const results = await Promise.allSettled(promises);
  console.log(`Risultati di promise.allSettled:`, results);

  const data = {
    city: null,
    country: null,
    temperature: null,
    weather: null,
    airport: null,
  };

  const [destinations, weathers, airports] = results;

  if (results[0].status === `fulfilled` && results[0].value.length > 0) {
    data.city = results[0].value[0].name;
    data.country = results[0].value[0].country;
  } else if (results[0].status === `rejected`) {
    console.error(
      "Errore nella richiesta per le destinazioni:",
      results[0].reason
    );
  }

  if (results.status === `fulfilled` && results[1].value[0].length > 0) {
    data.temperature = results[1].value[0].temperature;
    data.weather = results[1].value[0].weathers_description;
  } else if (results[1].status === `rejected`) {
    console.error("Errore nella richiesta per il meteo:", results[1].reason);
  }

  if (results.status === `fulfilled` && results[2].value[0].length > 0) {
    data.airport = results[2][1].name;
  } else if (results[2].status === `rejected`) {
    console.error(
      "Errore nella richiesta per li aereporti:",
      results[2].reason
    );
  }

  console.log(data);
  return data;
}

(async () => {
  try {
    const data = await getDashboardData("vienna");

    console.log("Dasboard data:", data);

    let outputString = "";

    if (data.city !== null && data.country !== null) {
      outputString += `${data.city} is in ${data.country}.\n`;
    }

    if (data.temperature !== null && data.weather !== null) {
      outString += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
    }
    if (data.airport !== null)
      [(outString += `The main airport is ${data.airport}.\n`)];

    console.log(outString);
  } catch (error) {
    console.error("Si è verificato un errore:", error);
  }
})();
