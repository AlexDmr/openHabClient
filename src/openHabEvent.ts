export type openHabEventType = 'ItemAddedEvent' |
'ItemRemovedEvent' |
'ItemUpdatedEvent' |
'ItemCommandEvent' |
'ItemStateEvent' |
'ItemStatePredictedEvent' |
'ItemStateChangedEvent' |
'GroupItemStateChangedEvent';

export interface eventPayload{
    type : string;
    value : string;
    oldType : string;
    oldValue : string;
}

export interface openHabEvent {
    topic : string;
    payload : string;
    type : string;
}

/*export interface openHabEvent{
    eventData: eventData;
    origin: string;
    type: openHabEventType
}*/


