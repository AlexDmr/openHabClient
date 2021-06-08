import { Observable } from "rxjs";
import { Item } from "./Item";
import { openHabEvent } from "./openHabEvent";
import { Rule } from "./Rule";

export interface openHabClientInterface {
    getItems(): Observable<Item[]>;
    getRules(): Observable<Rule[]>;

    setItem(id: string, state: string): Promise<void>;
    setRule(id: string, activation: string): Promise<void>;

    //getEvents(): Observable<MessageEvent<openHabEvent<object>>>
}
