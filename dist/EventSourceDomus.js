let ENV;
if ((typeof process !== 'undefined') && (process.release.name === 'node')) {
    console.log("On est dans NodeJS... ");
    ENV = 'NODE';
    const { default: eventSource } = await import('eventsource');
    const es = new eventSource('http://localhost:8080');
    console.log(es);
}
else {
    console.log("On es dans le navigateur");
    ENV = 'BROWSER';
}
export class EventSourceDomus {
    constructor(url) {
        this.url = url;
        console.log(ENV);
    }
}
//# sourceMappingURL=EventSourceDomus.js.map