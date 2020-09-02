import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { BehaviorSubject } from 'rxjs';
import { Participants } from '../interfaces/participants';
import { PartyService } from '../party.service';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import { TimeT } from '../interfaces/time-t';
import { Store, select } from '@ngrx/store';
import { TimeHelpAdd } from '../store/actions/time-help.actions';


@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  dateLeft: any;
  person$ = new BehaviorSubject<Participants>(undefined);
  timeLeft$ = new BehaviorSubject<any>('');
  actualMonth: Observable<TimeT>;
  partyDate = moment('2020-09-07 18:30');
  partyHours = moment();
  today = moment();
  leftTime = moment(this.partyDate).diff(this.today, 'days');
  newToday = this.today.add(this.leftTime, 'days');
  timeLeft = moment(this.partyDate).diff(this.newToday, 'minutes');
  constructor(
    private partyService: PartyService,
    private store: Store<{ TimeHelp: TimeT }>,
  ) {
   }

  ngOnInit(): void {
    this.partyService.participant$.subscribe(d => {
      if (d) {
        this.person$.next(d);
        this.store.dispatch(new TimeHelpAdd(moment(d.eventDate)));
        this.actualMonth = this.store.pipe(select('TimeHelp'));
        this.partyDate = moment(d.eventDate);
        this.partyHours = moment();
        this.today = moment();
        this.leftTime = moment(this.partyDate).diff(this.today, 'days');
        this.newToday = this.today.add(this.leftTime, 'days');
        this.timeLeft = moment(this.partyDate).diff(this.newToday, 'minutes');
        this.timeLeft$.next(this.timeLeft);
      }
    });
  }

}
