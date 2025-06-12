import { AfterViewInit, Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-who-we-are',
  imports: [RouterModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss',
})
export class WhoWeAre implements AfterViewInit {
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
