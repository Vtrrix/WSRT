import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrls: ['./side-menu.component.css'],
})
export class SideMenuComponent implements OnInit {
  menuElements: { title: string; route: string }[];

  constructor() {
    this.menuElements = [
      { title: 'My Info', route: '/' },
      { title: 'My Status', route: 'status' },
    ];
  }

  ngOnInit(): void {}
}
