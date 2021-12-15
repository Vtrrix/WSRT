import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-back-to-top',
  templateUrl: './back-to-top.component.html',
  styleUrls: ['./back-to-top.component.css'],
})
export class BackToTopComponent implements OnInit {
  mybutton;
  buttonVisible: boolean;
  constructor() {
    this.buttonVisible = false;
    this.mybutton = document.getElementById('btn-back-to-top');
  }

  ngOnInit(): void {
    window.onscroll = () => {
      console.log('das');

      this.scrollFunction();
    };
  }
  scrollFunction() {
    this.mybutton = document.getElementById('btn-back-to-top');
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      this.mybutton!.style.display = 'block';
    } else {
      this.mybutton!.style.display = 'none';
    }
  }

  backToTop() {
    document.body.scrollTop = 0;
    document.documentElement.scrollTop = 0;
  }
}
