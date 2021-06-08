import { BehaviorSubject, /*fromEvent,*/ Observable, Subject } from "rxjs";
import { openHabClientInterface } from "./openHabClientInterface";
import { Item } from "./Item";
import { Rule } from "./Rule";
import { openHabEvent } from "./openHabEvent";


// import * as EventSource from "eventsource";
let ENV: 'NODE' | 'BROWSER';
let EventSourceDomus: (url: string) => EventSource;
let fetchDomus: (input: RequestInfo, init?: RequestInit) => Promise<Response>;

if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    console.log("On est dans NodeJS... ");
    ENV = 'NODE';
    // const eventSource = require('eventsource').default;
    const { default: eventSource } = await import('eventsource') as any; //  as {default: EventSource};
    EventSourceDomus = url => new eventSource(url, { withCredentials: true } );

    const { default: fetchDomusFCT } = await import('node-fetch') as any;
    fetchDomus = fetchDomusFCT;

} else {
    console.log("On es dans le navigateur");
    ENV = 'BROWSER';
    EventSourceDomus = url => new EventSource(url, { withCredentials: true } );
}

console.log("Environment", ENV);


export class openHabClient implements openHabClientInterface {
    private items = new BehaviorSubject<Item[]>([]);
    private rules = new BehaviorSubject<Rule[]>([]);
    private es: EventSource;

    public readonly obsItems = this.items.asObservable();
    public readonly obsRules = this.rules.asObservable();
    public readonly obsEvents: Observable<MessageEvent>;

    constructor(private url: string, private token: string) {
        const subjEvents = new Subject<MessageEvent>();
        this.es = EventSourceDomus(url); // new EventSource(url, { withCredentials: true });
        this.es.onmessage = (evt: MessageEvent<openHabEvent<object>>) => {
            // Republication de l'événement dans l'observable
            subjEvents.next(evt);

            // Traitement de l'événement
            switch (evt.data.type) {
                case 'ItemStateEvent':
                    console.log('on reçoit un stateEvent', evt);
                    break;
            }
        }

        this.obsEvents = subjEvents.asObservable();

        // Initialisation des listes d'items et de rules.
        this.init();
    }
    getEvents(): Observable<MessageEvent<openHabEvent<object>>> {
        throw new Error("Method not implemented.");
    }

    private async init() {
        const R = await fetchDomus(`${this.url}/items`, {
            headers: {
                Authorisation: this.token
            }
        });
        const items: Item[] = await R.json();
        this.items.next(items);
    }

    getItems(): Item[] {
        return this.items.value;
    }
    getRules(): Rule[] {
        return this.rules.value;
    }

    async setItem(id: string, state: string): Promise<void> {

    }
    
    async setRule(id: string, activation: boolean): Promise<void> {
        
    }

}
