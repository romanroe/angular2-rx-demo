// declare var $: any;

import "rxjs/Rx";
import {Observable} from "rxjs/Rx";


const numbers = Observable.interval(1000);

numbers
        .flatMap(i => {
            let j1 = Observable.create(s => {
                $.get("http://localhost:8080/double?number=" + (i), d => s.next(d));
            });
            let j2 = Observable.create(s => {
                $.get("http://localhost:8080/double?number=" + (i + 100), d => s.next(d));
            });
            let j3 = Observable.create(s => {
                $.get("http://localhost:8080/double?number=" + (i + 1000000), d => s.next(d));
            });
            return Observable.merge(j1, j2, j3);
        })
        .subscribe((number: any) => {
            console.log("Ergebis:" + number);
        });

