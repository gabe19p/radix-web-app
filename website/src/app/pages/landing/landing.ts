import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollSmoother from 'gsap/ScrollSmoother';
gsap.registerPlugin(ScrollSmoother);
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-landing',
  imports: [],
  templateUrl: './landing.html',
  styleUrl: './landing.scss',
})
export class Landing implements AfterViewInit {
  ngAfterViewInit(): void {
    // Initialize smooth scroll
    ScrollSmoother.create({
      wrapper: '#smooth-wrapper',
      content: '#smooth-content',
      smooth: 2, // increase for more smoothing
      effects: true, // enable data-speed effects
    });

    // Animate each pinned section
    gsap.utils.toArray('.pin').forEach((section: any) => {
      ScrollTrigger.create({
        trigger: section,
        start: 'top top',
        end: '+=100%',
        pin: true,
        pinSpacing: true,
        scrub: true,
      });
    });

    // Add fade/move in animation
    gsap.utils.toArray('.section .content').forEach((content: any) => {
      gsap.from(content, {
        opacity: 0,
        y: 50,
        scrollTrigger: {
          trigger: content,
          start: 'top 80%',
          end: 'top 50%',
          scrub: true,
        },
      });
    });
  }
}
