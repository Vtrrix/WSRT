import { Component, Input, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-breadcrumb',
  templateUrl: './breadcrumb.component.html',
  styleUrls: ['./breadcrumb.component.css'],
})
export class BreadcrumbComponent implements OnInit {
  currentURL: string[];
  crumbs: { title: string; route: string }[];
  routes: string[];

  constructor(private router: Router) {
    this.crumbs = [];
    this.currentURL = [];
    this.routes = ['/user'];
  }

  ngOnInit(): void {
    this.setCrumbs();

    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event) => {
        this.setCrumbs();
      });
  }

  setCrumbs() {
    this.crumbs = [];
    this.routes = ['/user'];

    this.currentURL = this.router.url.slice(1).split('/');

    for (let i = 1; i < this.currentURL.length; i++) {
      this.routes.push(this.routes[i - 1] + '/' + this.currentURL[i]);
    }
    this.currentURL.map((route, index) => {
      this.crumbs.push({ title: route, route: this.routes[index] });
    });
  }
}
