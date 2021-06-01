import { BehaviorSubject, fromEvent, Observable, Subject } from "rxjs";
import { openHabClientInterface } from "./openHabClientInterface";
import { Item } from "./Item";
import { Rule } from "./Rule";
import { openHabEvent } from "./openHabEvent";

export class openHabClient implements openHabClientInterface {
    private items = new BehaviorSubject<Item[]>([]);
    private rules = new BehaviorSubject<Rule[]>([]);
    private es: EventSource;

    public readonly obsItems = this.items.asObservable();
    public readonly obsRules = this.rules.asObservable();
    public readonly obsEvents: Observable<MessageEvent>;

    constructor(private url: string, private token: string) {
        const subjEvents = new Subject<MessageEvent>();
        this.es = new EventSource(url);
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

    private async init() {
        const R = await fetch(`${this.url}/items`, {
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
