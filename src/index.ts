//import { EventSourceDomus } from './EventSourceDomus';
import {openHabClient}  from './openHabClient';
const url:string = 'https://localhost:8433/rest/events'

// const OHC = new 
// const eventSrc = new EventSourceDomus(url);
// console.log( eventSrc);

const es = new openHabClient(url,'');
console.log(es.obsEvents);