import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  @Input() crumbs: { title: string; route: string }[];
  constructor() {
    this.crumbs = [];
  }

  ngOnInit(): void {}
}
