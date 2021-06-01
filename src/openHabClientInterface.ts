import { Observable } from "rxjs";
import { Item } from "./Item";
import { openHabEvent } from "./openHabEvent";
import { Rule } from "./Rule";

export interface openHabClientInterface {
    getItems(): Item[];
    getRules(): Rule[];

    setItem(id: string, state: string): Promise<void>;
    setRule(id: string, activation: boolean): Promise<void>;

    getEvents(): Observable<MessageEvent<openHabEvent<object>>>
}
