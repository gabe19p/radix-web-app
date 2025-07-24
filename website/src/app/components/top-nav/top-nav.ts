import { Component, ViewChild, ElementRef } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Nav } from '../nav/nav';
import gsap from 'gsap';

@Component({
  selector: 'app-top-nav',
  imports: [CommonModule, RouterModule, Nav],
  templateUrl: './top-nav.html',
  styleUrl: './top-nav.scss',
})
export class TopNav {
  @ViewChild('menuButton', { static: false }) menuButton!: ElementRef;
  menuOpen: boolean = false;

  currentRoute = '';
  constructor(private router: Router) {
    // Update currentRoute whenever navigation changes
    this.router.events.subscribe(() => {
      this.currentRoute = this.router.url;
    });
  }

  toggleMenu() {
    // set the menuOpen variable to whatever it isn't
    console.log('Toggling Menu');
    this.menuOpen = !this.menuOpen;
    gsap.to(this.menuButton.nativeElement, {
      rotate: '+=90',
      duration: 0.5,
      ease: 'none',
    });
  }

  closeMenu() {
    this.toggleMenu();
  }
}
