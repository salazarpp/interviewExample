import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { PartyService } from '../party.service';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-add-participant',
  templateUrl: './add-participant.component.html',
  styleUrls: ['./add-participant.component.scss']
})
export class AddParticipantComponent implements OnInit {
  name = new FormControl('');
  lastName = new FormControl('');
  confirm = 0;
  constructor(
    private router: Router,
    private partyService: PartyService
  ) { }

  ngOnInit(): void {
  }

  addParticipant(): void {
    const participant = {
      name: this.name.value + this.lastName.value,
      confirmation: this.confirm,
      manager: 'Diego Guerra',
      eventDate: '2020-09-07T18:30:00.00Z'
    };
    this.partyService.addParticipants([participant]).subscribe(d => {
      console.log(d);
      this.router.navigate(['']);
    });
  }

}
