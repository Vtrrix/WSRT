import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class SideMenuService {
  menuElements = new Subject<{ title: string; route: string }[]>();

  constructor() {
    this.menuElements.next([
      { title: 'My Info', route: '/' },
      { title: 'My Status', route: 'status' },
    ]);
  }

  changeSideMenu(elements: { title: string; route: string }[]) {
    this.menuElements.next(elements);
  }
}
