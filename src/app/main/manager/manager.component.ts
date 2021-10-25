import { Component, OnInit } from '@angular/core';
import { SideMenuService } from 'src/app/services/side-menu.service';

@Component({
  selector: 'app-manager',
  templateUrl: './manager.component.html',
  styleUrls: ['./manager.component.css'],
})
export class ManagerComponent implements OnInit {
  constructor(private sideMenuService: SideMenuService) {}

  ngOnInit(): void {
    this.sideMenuService.changeSideMenu([
      { title: 'Manage Team', route: '/' },
      { title: 'Team Members', route: '' },
      { title: 'Member Status', route: '' },
      { title: 'Settings', route: '' },
    ]);
  }
}
