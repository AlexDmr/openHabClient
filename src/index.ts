import {openHabClient}  from './openHabClient';

const url:string = 'https://domus-anubis.u-ga.fr:8443/rest'
// const OHC = new 
const es = new openHabClient(url,'');

console.log(es.obsEvents);