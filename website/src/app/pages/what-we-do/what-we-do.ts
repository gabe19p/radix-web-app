import { AfterViewInit, Component } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-what-we-do',
  imports: [],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss',
})
export class WhatWeDo implements AfterViewInit {
  ngAfterViewInit(): void {
    gsap.to('.banner-image', {
      yPercent: 40,
      ease: 'none',
      scrollTrigger: {
        trigger: '.banner',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
    });
  }
}
