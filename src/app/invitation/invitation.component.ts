import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { PartyService } from '../party.service';
import { Participants } from '../interfaces/participants';
import * as _ from 'lodash';
import { Observable } from 'rxjs';
import * as moment from 'moment';
import { TimeT } from '../interfaces/time-t';
import { Store, select } from '@ngrx/store';
import { TimeHelpAdd } from '../store/actions/time-help.actions';

@Component({
  selector: 'app-invitation',
  templateUrl: './invitation.component.html',
  styleUrls: ['./invitation.component.scss']
})
export class InvitationComponent implements OnInit {
  actualMonth: Observable<TimeT>;

  constructor(
    private route: ActivatedRoute,
    private partyService: PartyService,
    private store: Store<{ TimeHelp: TimeT }>,
  ) {
  }

  ngOnInit(): void {
    this.route.params.subscribe(params => {
      this.partyService.getParticipant(params.id).subscribe((d: Participants) => {
        if (_.head(d)) {
          this.partyService.participant$.next(_.head(d));
          this.store.dispatch(new TimeHelpAdd(moment(_.head(d).eventDate)));
          this.actualMonth = this.store.pipe(select('TimeHelp'));
        }
      });
    });
  }

}
