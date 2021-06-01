export type openHabEventType = 'ItemAddedEvent' |
'ItemRemovedEvent' |
'ItemUpdatedEvent' |
'ItemCommandEvent' |
'ItemStateEvent' |
'ItemStatePredictedEvent' |
'ItemStateChangedEvent' |
'GroupItemStateChangedEvent';


export interface openHabEvent<T extends object> {
    data: T;
    origin: string;
    type: openHabEventType
}

