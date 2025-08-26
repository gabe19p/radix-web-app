import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-nav',
  imports: [CommonModule, RouterModule],
  templateUrl: './nav.html',
  styleUrl: './nav.scss',
})
export class Nav {
  currentRoute = '';

  constructor(private router: Router) {
    // Update currentRoute whenever navigation changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  scrollToTop(link: string): void {
    this.router.navigate([link]).then(() => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }
}
