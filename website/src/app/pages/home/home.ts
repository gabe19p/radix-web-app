import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home implements AfterViewInit {
  slogans = [
    'Engineering Solutions Without Borders',
    'Innovating for a Better Tomorrow',
    'Global Impact Through Technology',
  ];
  currentIndex = 0;
  currentSlogan = this.slogans[0];

  @ViewChild('sloganText', { static: true }) sloganText!: ElementRef;

  ngOnInit() {
    setInterval(() => {
      const el = this.sloganText.nativeElement;

      // Fade out
      gsap.to(el, {
        opacity: 0,
        duration: 0.5,
        onComplete: () => {
          // Update text
          this.currentIndex = (this.currentIndex + 1) % this.slogans.length;
          this.currentSlogan = this.slogans[this.currentIndex];

          // Fade in
          gsap.to(el, {
            opacity: 1,
            duration: 0.5,
          });
        },
      });
    }, 4000);
  }

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
