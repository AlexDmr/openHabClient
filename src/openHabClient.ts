import { BehaviorSubject, fromEvent, Observable, Subject } from "rxjs";
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

import { openHabClientInterface } from "./openHabClientInterface";
import { Item } from "./Item";
import { Rule } from "./Rule";
import { openHabEvent } from "./openHabEvent";



export class openHabClient implements openHabClientInterface
{
    private items = new BehaviorSubject<Item[]>([]);
    private rules = new BehaviorSubject<Rule[]>([]);
    
    public readonly obsItems = this.items.asObservable();
    public readonly obsRules = this.rules.asObservable();

    private es: EventSource | null = null;
    public obsEvents: Observable<MessageEvent> | null = null;


    constructor(private http: HttpClient, private url: string, private token: string)
    {
        // Initialisation de l'EventSource
        this.initEvents();
        
        // Initialisation des listes d'items et de rules.
        this.initItemsAndRules();
    }

    private async initEvents()
    {
        const subjEvents = new Subject<MessageEvent>();
        this.es = new EventSource(this.url + "/events/");

        //this.es.onmessage = (evt: MessageEvent<openHabEvent<object>>) => 
        this.es.onmessage = (evt: MessageEvent<openHabEvent>) => 
        {
            // Republication de l'événement dans l'observable
            subjEvents.next(evt);

            // Traitement de l'événement
            switch (evt.data.type)
            {
                case 'ItemStateChangedEvent':
                    console.log("L'etat de l'item change : ", evt);
                    break;

                case 'ItemStateEvent':
                    console.log("L'etat de l'item est modifie (pas forcement de changement) : ", evt);
                    break;

                case 'ItemCommandEvent':
                    console.log("Une commande est envoyée a un item : ", evt);
                    break;

                default:
                    console.log("default : ", evt.data);
                    const myData : openHabEvent = JSON.parse(String(evt.data));
                    console.log("   after parsing : ", myData);
                    break;
            }
        }
        this.obsEvents = subjEvents.asObservable();
    }


    private async initItemsAndRules()
    {
        // Recuperation des items openHAB (pas besoin d'authentification)
        const ResponseItems = await fetch(`${this.url}/items`);
        const MyItems: Item[] = await ResponseItems.json();
        this.items.next(MyItems);

        // Recuperation des rules d'openHAB (avec le token d'authentification)
        const ResponseRules = await fetch(`${this.url}/rules`, { method: 'GET', headers: { 'Content-Type': 'application/json', Authorization: this.token } });
        //const ResponseRules = await fetch(`${this.url}/rules`, { method: 'GET', credentials:'same-origin', headers: { 'Content-Type': 'application/json' } });
        const MyRules: Rule[] = await ResponseRules.json();
        this.rules.next(MyRules);
    }


    // Renvoie d'un Observable sur la liste d'items
    getItems(): Observable<Item[]> { 
        return this.obsItems; 
    }

    // Renvoie d'un Observable sur la liste de rules
    getRules(): Observable<Rule[]> { 
        return this.obsRules; 
    }

    // Renvoie d'un Observable sur les events
    /*getEvents(): Observable<MessageEvent<openHabEvent<object>>> {
        return this.obsEvents;
    }*/

    // Affectation a l'item {id} de la valeur {state}
    async setItem(id: string, state: string): Promise<void> 
    {
        const ResponseItemStatePost = await fetch(`${this.url}/items/${id}`,
        {
            method: 'POST',
            headers : {
                'Content-Type': 'text/plain',
                Authorization: this.token
            },
            body: state
        } 
        
        );
    }

    // Activation/desactivation de la rule {id}
    async setRule(id: string, activation: string): Promise<void> 
    { 
        const ResponseItemStatePost = await fetch(`${this.url}/rules/${id}`,
        {
            method: 'POST',
            headers : {
                'Content-Type': 'text/plain',
                Authorization: this.token
            },
            body: activation
        } 
        
        );
    }

}
