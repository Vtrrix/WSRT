import { Component, Input, OnInit } from '@angular/core';
import { SideMenuService } from 'src/app/services/side-menu.service';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  menuElements: { title: string; route: string }[] = [
    { title: 'My Info', route: '/' },
    { title: 'My Status', route: 'status' },
  ];

  constructor(private sideMenuService: SideMenuService) {
    this.sideMenuService.menuElements.subscribe((ele) => {
      this.menuElements = ele;
    });
  }

  ngOnInit(): void {}
}
