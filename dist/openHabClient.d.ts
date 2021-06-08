import { Observable } from "rxjs";
import { openHabClientInterface } from "./openHabClientInterface";
import { Item } from "./Item";
import { Rule } from "./Rule";
import { openHabEvent } from "./openHabEvent";
export declare class openHabClient implements openHabClientInterface {
    private url;
    private token;
    private items;
    private rules;
    private es;
    readonly obsItems: Observable<Item[]>;
    readonly obsRules: Observable<Rule[]>;
    readonly obsEvents: Observable<MessageEvent>;
    constructor(url: string, token: string);
    getEvents(): Observable<MessageEvent<openHabEvent<object>>>;
    private init;
    getItems(): Item[];
    getRules(): Rule[];
    setItem(id: string, state: string): Promise<void>;
    setRule(id: string, activation: boolean): Promise<void>;
}
