import {openHabClient}  from './openHabClient';
const url:string = 'https://localhost:8433/rest/events'

// const OHC = new 
const es = new openHabClient(url,'');

console.log(es.obsEvents);