import { Component } from '@angular/core';

@Component({
  selector: 'app-top-nav',
  imports: [],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
})
export class TopNav {
  menuOpen: boolean = false;

  toggleMenu() {
    // set the menuOpen variable to whatever it isn't
    this.menuOpen = !this.menuOpen;
  }
}
