import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-top-nav',
  imports: [RouterModule],
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
