declare var $: any;

import "rxjs/Rx";

import {bootstrap}  from "angular2/platform/browser";
import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";

// ------------------------------------------------------------------

const inputLinks: Subject<string> = Subject.create();
const inputRechts: Subject<string> = Subject.create();

const inputLinksUpper = inputLinks.map(s => s.toUpperCase());
const countX: Subject<number> = Subject.create();

const beide = inputLinks.combineLatest(countX.distinctUntilChanged());

// ------------------------------------------------------------------

@Component({selector: "main-app", templateUrl: "app/main.html"})
export class Main {

    outputLinks = "Hallo Welt!";
    outputRechts = 0;

    constructor() {
        inputLinksUpper.subscribe((value: string) => {
            this.outputLinks = value;
        });

        inputRechts.debounceTime(1000).subscribe((value: string) => {
            $.get("http://localhost:8080/countX?text=" + value, (result: string) => {
                countX.next(parseInt(result));
            });
        });

        countX.subscribe((count: number) => {
            this.outputRechts = count;
        });

        beide.subscribe(value => {
            $("#kombiniert").append("<div>" + value + "</div>");
        });
    }

    inputLinksChanged(value: string) {
        inputLinks.next(value);
    }

    inputRechtsChanged(value: string) {
        inputRechts.next(value);
    }

}


bootstrap(Main);
