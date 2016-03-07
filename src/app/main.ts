declare var $: any;

import "rxjs/Rx";

import {bootstrap}  from "angular2/platform/browser";
import {Component} from "angular2/core";
import {Observable} from "rxjs/Observable";
import {Subject} from "rxjs/Subject";


@Component({selector: "main-app", templateUrl: "app/main.html"})
export class Main {

    inputLinks: Subject<string> = Subject.create();
    inputRechts: Subject<string> = Subject.create();

    inputLinksUpper = this.inputLinks
        .map(s => s.toUpperCase());

    inputRechtsCountX: Observable<string> = this.inputRechts
        .debounceTime(1000)
        .flatMap(value => {
            var ajax = $.get("http://localhost:8080/countX?text=" + value).promise();
            return Observable.fromPromise(ajax);
        });

    kombiniert = this.inputLinksUpper
        .combineLatest(this.inputRechtsCountX.distinctUntilChanged());

    outputLinks = "";
    outputRechts = "";

    constructor() {
        this.inputLinksUpper.subscribe(value => {
            this.outputLinks = value;
        });

        this.inputRechtsCountX.subscribe(value => {
            this.outputRechts = value;
        });

        this.kombiniert.subscribe(value => {
            $("#kombiniert").append("<div>" + value + "</div>");
        });
    }

}


bootstrap(Main);
