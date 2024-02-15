import { AfterViewInit, Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule, TranslateService } from '@ngx-translate/core';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { NgxBootstrapIconsModule } from 'ngx-bootstrap-icons';
import { LottieModule } from 'ngx-lottie';
import { RouterModule } from '@angular/router';
import { Store } from '@ngrx/store';
import { State } from '../../../store';
import {
  Observable,
  Observer,
  Subject,
  Subscription,
  bufferCount,
  bufferTime,
  bufferToggle,
  concatMap,
  exhaustMap,
  filter,
  fromEvent,
  interval,
  map,
  mergeMap,
  of,
  switchMap,
  take,
  takeUntil,
  takeWhile,
  tap,
} from 'rxjs';
import { ajax } from 'rxjs/ajax';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  standalone: true,
  imports: [
    CommonModule,
    TranslateModule,
    MatSnackBarModule,
    NgxBootstrapIconsModule,
    LottieModule,
    RouterModule,
  ],
  providers: [],
})

export class CalendarComponent implements OnInit, AfterViewInit {
  timerSubscription: Subscription;
  subscripton: Subscription;

  constructor(
    private store: Store<State>,
    private translateService: TranslateService
  ) {
    translateService.setDefaultLang('fr');
    translateService.use('fr');
  }
  ngAfterViewInit(): void {
    this.stopEvent();
  }

  ngOnInit(): void {

    /*   const newObs=new Observable<number>((observer)=>{
      for(let i=0;i<10;i++){
if(i===5)observer.error("undifind error")

        observer.next(i)
      }
      observer.complete()
    }) */
    /* newObs.subscribe((data:number)=>{
  console.log(data);
  
},(error)=>{
console.log(error);

},()=>{
  console.log("complete");
  
}) */

    /* this.timerSubscription = newObs.subscribe(new Observable4()); */
    /* {
  next:(data:number)=>{console.log(data)},
  error:(error:string)=>{console.log(error)},
  complete:()=>{console.log('complete')}
} */
    const newObs = interval(1000);

    // buffer count
    //this.subscripton=newObs.pipe(bufferCount(3,2),tap((value)=>console.log(value))).subscribe()

    // buffer time
    newObs.pipe(
      bufferTime(2000),
      tap((value) => console.log(value))
    );

    // buffer toggle
    /* const firstObs=interval(6000).pipe(tap(value=>console.log('open')))
const secondObs=()=>interval(3000).pipe(tap(value=>console.log('close')))
interval(1000).pipe(tap(value=>console.log(value)),bufferToggle(firstObs,secondObs),take(3)) */

    //take
    interval(500).pipe(take(6));

    // take until
    interval(500).pipe(
      takeUntil(interval(5000)),
      tap((data) => console.log(data))
    );

    // take while
    interval(500).pipe(
      takeWhile((x) => x < 5),
      tap((x) => console.log(x))
    );

    // mergeMap and concatMap
    of(1, 2, 3, 4, 5, 6, 7, 8, 9, 10).pipe(
      mergeMap((value) =>
        ajax(`https://jsonplaceholder.typicode.com/posts/${value}`).pipe(
          map((data: any) => data.response)
        )
      )
    );

    // exhautstMap
    interval(500).pipe(
      filter((value) => value > 0),
      exhaustMap((value: number) => {
        console.log(value); // For debugging
        return ajax(`https://jsonplaceholder.typicode.com/posts/${value}`);
      })
    );

    // switchMap
    of(1, 2, 3, 4, 5, 6).pipe(
      switchMap((value) =>
        ajax(`https://jsonplaceholder.typicode.com/posts/${value}`)
      ),map(value=>value.response)
    )

    const obsTimer = interval(1000);
    obsTimer.pipe(
      filter((element) => {
        return element % 2 === 0;
      }),
      map((element) => {
        return 'even number ' + element;
      })
    );

// obsarvables vs subject 

const observable$=new Observable<number>((observe)=>{
  observe.next(1)
  observe.next(2)
  observe.next(3)
  observe.next(4)
  observe.next(5)
  observe.next(6)
  observe.next(7)
})

let observer_01={
  next:(data:number)=>{console.log("observer_01",data)},
  error:(err:any)=>{console.log("error observer_01",err)},
  complete:()=>{console.log("complete observer_01")}
}


let observer_02={
  next:(data:number)=>{console.log("observer_02",data)},
  error:(err:any)=>{console.log("error observer_02",err)},
  complete:()=>{console.log("complete observer_02")}
}

/* observable$.subscribe(observer_01)
observable$.subscribe(observer_02) */

const subjet=new Subject<number>()


/* subjet.subscribe(observer_01)
subjet.subscribe(observer_02) */
observable$.subscribe(subjet)





  }

  unsubsribe() {
    // this.timerSubscription.unsubscribe();
    this.subscripton.unsubscribe();
  }

  /* buttonEvent: Observable<Event>;
  startEvent() {
    console.log('start event called');
    interval(1000)
      .pipe(takeUntil(this.buttonEvent))
      .subscribe((data) => {
        console.log(data);
      });
  } */

  stopEvent() {
    console.log('stop event button called');

    /* this.buttonEvent = fromEvent(document.getElementById('obsEvent')!, 'click'); */
  }


  sayHello(){
   
    
  }
}

export class Observable4<T, K> implements Observer<T> {
  next(data: T) {
    console.log(data);
  }

  error(error: K) {
    console.log(error);
  }

  complete() {
    console.log('complete');
  }
}


