import { BehaviorSubject, Subject } from "rxjs";
import * as EventSource from "eventsource";
export class openHabClient {
    constructor(url, token) {
        this.url = url;
        this.token = token;
        this.items = new BehaviorSubject([]);
        this.rules = new BehaviorSubject([]);
        this.obsItems = this.items.asObservable();
        this.obsRules = this.rules.asObservable();
        const subjEvents = new Subject();
        this.es = new EventSource(url, { withCredentials: true });
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
        const R = await fetch(`${this.url}/items`, {
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