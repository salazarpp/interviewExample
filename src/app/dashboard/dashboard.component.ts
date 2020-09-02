import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth.service';
import { PartyService } from '../party.service';
import {MatTableDataSource} from '@angular/material/table';
import { Participants } from '../interfaces/participants';
import { Router } from '@angular/router';
@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  ELEMENT_DATA: Participants[] = [];
  userData: any;
  displayedColumns: string[] = ['Name', 'Confirmation', 'icons', 'invitation'];
  dataSource = new MatTableDataSource(this.ELEMENT_DATA);

  constructor(
    private authService: AuthService,
    private partyService: PartyService,
    private router: Router
    ) { }

  ngOnInit(): void {
    this.userData = this.authService.getData();
    if (this.authService.getData()) {
      console.log(this.authService.getData());
      this.partyService.getParticipants().subscribe((d: Participants[]) => {
        this.dataSource = new MatTableDataSource(d);
      });
    }

  }

  applyFilter(event: Event): void {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  getConfrimation(confirmation: number): string {
    switch (confirmation) {
      case 1: {
        return 'Invitación Confirmada';
        break;
      }
      case 2: {
        return 'Invitación Rechazada';
        break;
      }
      case 3: {
        return 'Invitación Dudosa';
        break;
      }
      default: {
        return 'Invitación Pendiente de contestar';
        break;
      }
    }
  }

  getIconConfrimation(confirmation: number): string {
    switch (confirmation) {
      case 1: {
        return 'done';
        break;
      }
      case 2: {
        return 'close';
        break;
      }
      case 3: {
        return 'feedback';
        break;
      }
      default: {
        return 'cloud_done';
        break;
      }
    }
  }

  openInvitation(idValue: string): void {
    this.router.navigate(['invitation', { id: idValue }]);
  }

}
