import { openHabClient } from './openHabClient';
const url = 'https://domus-anubis.u-ga.fr:8443/rest';
const es = new openHabClient(url, '');
console.log(es.obsEvents);
//# sourceMappingURL=index.js.map