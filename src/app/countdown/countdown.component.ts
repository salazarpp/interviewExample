import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-countdown',
  templateUrl: './countdown.component.html',
  styleUrls: ['./countdown.component.scss']
})
export class CountdownComponent implements OnInit {
  dateLeft: any;
  partyDate = moment('2020-09-07 18:30');
  partyHours = moment();
  today = moment();
  leftTime = moment(this.partyDate).diff(this.today, 'days');
  newToday = this.today.add(this.leftTime, 'days');
  timeLeft = moment(this.partyDate).diff(this.newToday, 'minutes');

  constructor() { }

  ngOnInit(): void {
  }

}
