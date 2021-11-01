import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { StatusService } from 'src/app/services/status.service';

@Component({
  selector: 'app-status',
  templateUrl: './status.component.html',
  styleUrls: ['./status.component.css'],
})
export class StatusComponent implements OnInit {
  statusID: string;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private statusService: StatusService
  ) {
    this.statusID = '';
  }

  ngOnInit(): void {
    console.log(this.route.snapshot.params.statusID);
    this.route.params.subscribe((params: Params) => {
      this.statusID = params.statusID;
    });
    this.statusService.getStatus(this.statusID).subscribe((res) => {
      console.log(res);
    });
  }
}
