import { BehaviorSubject, Subject } from "rxjs";
let ENV;
let EventSourceDomus;
let fetchDomus;
if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    console.log("On est dans NodeJS... ");
    ENV = 'NODE';
    const { default: eventSource } = await import('eventsource');
    EventSourceDomus = url => new eventSource(url, { withCredentials: true });
    const { default: fetchDomusFCT } = await import('node-fetch');
    fetchDomus = fetchDomusFCT;
}
else {
    console.log("On es dans le navigateur");
    ENV = 'BROWSER';
    EventSourceDomus = url => new EventSource(url, { withCredentials: true });
}
console.log("Environment", ENV);
export class openHabClient {
    constructor(url, token) {
        this.url = url;
        this.token = token;
        this.items = new BehaviorSubject([]);
        this.rules = new BehaviorSubject([]);
        this.obsItems = this.items.asObservable();
        this.obsRules = this.rules.asObservable();
        const subjEvents = new Subject();
        this.es = EventSourceDomus(url);
        this.es.onmessage = (evt) => {
            subjEvents.next(evt);
            switch (evt.data.type) {
                case 'ItemStateEvent':
                    console.log('on reçoit un stateEvent', evt);
                    break;
            }
        };
        this.obsEvents = subjEvents.asObservable();
        this.init();
    }
    getEvents() {
        throw new Error("Method not implemented.");
    }
    async init() {
        const R = await fetchDomus(`${this.url}/items`, {
            headers: {
                Authorisation: this.token
            }
        });
        const items = await R.json();
        this.items.next(items);
    }
    getItems() {
        return this.items.value;
    }
    getRules() {
        return this.rules.value;
    }
    async setItem(id, state) {
    }
    async setRule(id, activation) {
    }
}
//# sourceMappingURL=openHabClient.js.map