declare var $: any;

import "rxjs/Rx";
import {Observable, Subscriber, Subject} from "rxjs/Rx";
import {bootstrap} from "angular2/platform/browser";
import {Component} from "angular2/core";

@Component({selector: "main-app", template: ``})
export class Intro {

    constructor() {

        const numbers = new Observable((subscriber: Subscriber<number>) => {
            let i = 1000;
            subscriber.next(-9999);
            const interval = setInterval(() => {
                subscriber.next(i++);
                // if (i > 10010) {
                //     window.clearInterval(interval);
                //     subscriber.complete();
                // }
            }, 1000);
        });

        let mouseMove = Observable.fromEvent(document, "mousemove")
                .debounceTime(1000)
                .map((event: any) => [event.clientX, event.clientY]);

        // let both = numbers.combineLatest(mouseMove, (a, b) => {
        //     return [a, b[0], b[1]];
        // });
        // both.subscribe(x => console.log(x));

        // let s = new Subject();
        // numbers.subscribe(n => s.next(n));
        // mouseMove.subscribe(m => s.next(m));
        // s.subscribe(x => console.log(x));

        // let r = new ReplaySubject(1);
        // r.next(1);
        // r.next(2);
        // r.next(3);
        // r.subscribe(i => console.log(i));


        let s = new Subject<number>();
        s.flatMap(i => {
            let j1 = Observable.fromPromise($.get("http://localhost:8080/double?number=" + (i)));
            let j2 = Observable.fromPromise($.get("http://localhost:8080/double?number=" + (i + 100)));
            let j3 = Observable.fromPromise($.get("http://localhost:8080/double?number=" + (i + 100000)));
            return Observable.merge(j1, j2, j3);
        }).subscribe(x => console.log(x));

        s.next(4);

    }

}

bootstrap(Intro);
