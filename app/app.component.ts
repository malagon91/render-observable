import { Component } from '@angular/core';
import {Observable} from "rxjs/Observable";
import 'rxjs/add/observable/interval';
import 'rxjs/add/operator/map';
import { Store } from '@ngrx/store';
import 'rxjs/add/operator/mapTo'
import { Subject } from 'rxjs/Subject';
import 'rxjs/add/observable/merge';

@Component({
  selector: 'my-app',
  template: `<h1>{{clock | async | date:'medium'}}</h1>`,
})
export class AppComponent  {
 // clock  = Observable.interval(1000).map(()=> new Date()); Modificacion para agregarlas desde store
  click$ = new Subject();
  clock:any;
  constructor(store: Store<any>){
    this.clock = store.select('clock')

    Observable.merge(
      this.click$.mapTo('hour'),
      Observable.interval(1000).mapTo('second')
    )
      .subscribe((type)=>{
        store.dispatch({type})
      })

  }
}
/*//De esta forma el reloj se actualiza cada segundo o cada que uno da click
<button (click)="click$.next()">Update</button>
* this.clock = Observable.merge(
 this.click$,
 Observable.interval(5000)
 ).map(()=> new Date());
* */


/*// De esta forma avanza el segundero cada segundo pero conel boton avanza la hora
 constructor() {
 this.clock = Observable.merge(
 this.click$.mapTo('hour'),
 Observable.interval(1000).mapTo('second')
 )
 .startWith(new Date())
 .scan((acc:Date, curr)=> {
 const date = new Date(acc.getTime());
 if(curr === 'second'){
 date.setSeconds(date.getSeconds() + 1);
 }
 if(curr === 'hour'){
 date.setHours(date.getHours() + 1);
 }
 return date;
 });
 }
* */
