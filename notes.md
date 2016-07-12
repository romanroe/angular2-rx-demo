
Observable.fromArray
.filter
.map

.zip

(fromPromise)
interval
throttleTime

fromEvent, map
debounceTime

combineLatest
+project

Subject
Multiplexer

ReplaySubject

flatMap

























































const numbers = new Observable((subscriber: Subscriber<number>) => {
    let i = 1000;
    const interval = setInterval(() => {
        subscriber.next(i++);
        // if (i > 10010) {
        //     window.clearInterval(interval);
        //     subscriber.complete();
        // }
    }, 1000);
});

let mouseMove = Observable.fromEvent(document, "mousemove")
        .throttleTime(20)
        .map((event: MouseEvent) => [event.clientX, event.clientY]);

let both = numbers.combineLatest(mouseMove, (a, b) => {
    return [a, b[0], b[1]];
});

both.subscribe(x => console.log(x));


let s = new Subject<number>();
s.flatMap(i => {
    let j1 = Observable.fromPromise($.get("http://localhost:8080/double?number=" + (i)));
    let j2 = Observable.fromPromise($.get("http://localhost:8080/double?number=" + (i + 100)));
    let j3 = Observable.fromPromise($.get("http://localhost:8080/double?number=" + (i + 100000)));
    return Observable.merge(j1, j2, j3);
}).subscribe(x => console.log(x));

s.next(4);
