import { openHabClient } from './openHabClient';
const url = 'https://localhost:8433/rest/events';
const es = new openHabClient(url, '');
console.log(es.obsEvents);
//# sourceMappingURL=index.js.map