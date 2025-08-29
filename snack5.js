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
//   throw new Error ("Errore nel recuepro dei dati;", error.messagge)
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
//   console.log(`Risultati di promise.all:`, results);

//   const [destinations, weathers, airports] = results;

// SOLUZIONE DI HYUR: CREARE 3 VARIABILI A CUI ASSEGNO IL PRIMO VALORE, QUINDI [0], DEI 3 ARRAY PER FARE IL TERNARIO
//
// const destination = destinations[0];
// const weather = weathers[0];
// const airport = aiports[0];
// return {
//    city: destination ? destination.name : null}
//    country: destination ? destination.country : null}
//    temperature: weather ? weather.temperature : null}
//    weather: weather ? weather.weather_description : null}
//    airport: airport ? airport.name : null
//}
// FINE SOLUZIONE HYUR
//
//

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

// SOLUZIONE TROVATAE CAPITA CHIEDENDO SUPPORTO A GEMINI E VEDENDO CORREZIONE E RICHIEDENDO SUPPORTO A GEMINI

async function fetchJson(url) {
  const response = await fetch(url);
  const obj = await response.json();
  return obj;
}

async function getDashboardData(query) {
  try {
    const destinantionsPromise = fetchJson(
      `http://localhost:3333/destinations?search=${[query]}`
    );
    const weathersPromise = fetchJson(
      `http://localhost:3333/weathers?search=${query}`
    );
    const airportsPromise = fetchJson(
      `http://localhost:3333/airports?search=${query}`
    );

    const promises = [destinantionsPromise, weathersPromise, airportsPromise];
    const [destinationResult, weatherResult, airportResult] =
      await Promise.allSettled(promises);

    const data = {};

    if (destinationResult.status === `fulfilled`) {
      const destination = destinationResult.value[0];
      data.city = destination ? destination.name : null;
      data.country = destination ? destination.country : null;
    } else {
      console.error(`Errore presente in destinazione: `, error.reason);
      data.city = null;
      data.country = null;
    }

    if (weatherResult.status === `fulfilled`) {
      const weather = weatherResult.value[0];
      data.temperature = weather ? weather.temperature : null;
      data.weather = weather ? weather.weather_description : null;
    } else {
      console.error(`Errore presente nel meteo: `, error.reason);
      data.temperature = null;
      data.weather = null;
    }

    if (airportResult.status === `fulfilled`) {
      const airport = airportResult.value[0];
      data.airport = airport ? airport.name : null;
    } else {
      console.error(`Errore presente nel meteo: `, error.reason);
      data.airport = null;
    }
    console.log(" Il dato finale è composto così:", data);
    return data;
  } catch (error) {
    throw new Error("Errore nel recupero dei dati:", error.reason);
  }
}

(async () => {
  getDashboardData(`london`)
    .then((data) => {
      console.log("Dasboard data:", data);
      let messagge = ``;
      if (data.city !== null && data.country !== null) {
        messagge += `${data.city} is in ${data.country}.\n`;
      }
      if (data.temperature !== null && data.weather !== null) {
        messagge += `Today there are ${data.temperature} degrees and the weather is ${data.weather}.\n`;
      }
      if (data.airport !== null) {
        messagge += `The main airport is ${data.airport}.\n`;
      }
      console.log(messagge);
    })
    .catch((error) => console.error(error));
})();
