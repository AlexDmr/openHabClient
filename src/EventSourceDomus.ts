let ENV: 'NODE' | 'BROWSER';

if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    console.log("On est dans NodeJS... ");
    ENV = 'NODE';
    // const eventSource = require('eventsource').default;
    const { default: eventSource } = await import('eventsource') as any; //  as {default: EventSource};
    const es = new eventSource('http://localhost:8080') as EventSource;
    console.log(es);
} else {
    console.log("On es dans le navigateur");
    ENV = 'BROWSER';
}


export class EventSourceDomus {
    constructor(readonly url: string) {
        console.log(ENV);
    }



}