import { AfterViewInit, Component, Inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import MorphSVGPlugin from 'gsap/MorphSVGPlugin';
import ScrambleTextPlugin from 'gsap/ScrambleTextPlugin';

gsap.registerPlugin(
  MorphSVGPlugin,
  ScrollTrigger,
  ScrambleTextPlugin,
  ScrollToPlugin
);

@Component({
  selector: 'app-what-we-do',
  imports: [],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss',
})
export class WhatWeDo implements AfterViewInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
    const tl = gsap.timeline();
    const groups = this.document.querySelectorAll('.discipline-group');

    groups.forEach((group) => {
      const header = group.querySelector('.discipline-header');
      const subItems = group.querySelector('.sub-items') as HTMLElement;

      let isOpen = false;

      if (header && subItems) {
        gsap.set(subItems, { height: 0, opacity: 0 });

        header.addEventListener('click', () => {
          if (isOpen) {
            gsap.to(subItems, {
              height: 0,
              opacity: 0,
              duration: 0.4,
              ease: 'power2.inOut',
            });
            header.classList.remove('open');
          } else {
            const fullHeight = subItems.scrollHeight;

            gsap.to(subItems, {
              height: fullHeight,
              opacity: 1,
              duration: 0.4,
              ease: 'power2.inOut',
              onComplete: () => {
                subItems.style.height = 'auto'; // unlock height
              },
            });

            header.classList.add('open');
          }

          isOpen = !isOpen;
        });
      }
    });

    tl.from(
      '.blobA',
      {
        x: 100,
        y: 200,
        opacity: 0,
        duration: 2,
        ease: 'power3.out',
      },
      0
    )
      .from(
        '.blobB',
        {
          x: -50,
          y: -300, // slide in from top
          opacity: 0,
          duration: 2,
          ease: 'power3.out',
        },
        0.2
      )
      .from(
        '.hero-title',
        {
          y: -100,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        1
      )
      .from(
        '.hero-wrapper p',
        {
          y: 60,
          opacity: 0,
          duration: 1,
          ease: 'power2.out',
        },
        0.8
      );

    gsap.to('#mission', {
      scrollTrigger: {
        trigger: '#mission',
        start: 'top 70%',
      },
      duration: 1,
      scrambleText: {
        text: 'Our Mission ',
        chars: '01 ',
        revealDelay: 0.1,
        speed: 0.3,
      },
      onComplete: () => {
        gsap.to('.cursor', {
          opacity: 0,
          duration: 0.8,
          repeat: -1,
          yoyo: true,
          ease: 'none',
        });

        gsap.fromTo(
          '#mission-paragraph',
          {
            y: 40,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            duration: 1,
            ease: 'power2.out',
          }
        );
      },
    });

    // Core Capabilities Scroll Animation
    gsap
      .timeline({
        scrollTrigger: {
          trigger: '.what-we-do-capabilities',
          start: 'top 50%',
        },
      })
      .from('.capabilites-title', {
        y: 50,
        opacity: 0,
        duration: 1,
        ease: 'power2.out',
      })
      .from(
        '.capabilities-grid .capability',
        {
          y: 30,
          opacity: 0,
          duration: 0.6,
          ease: 'power2.out',
          stagger: 0.1,
        },
        '+=0.2'
      ); // slight pause after title

    const disciplinesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.what-we-do-disciplines',
        start: 'top 70%',
      },
    });

    // Step 1: Animate title
    disciplinesTl.to('#disciplines', {
      duration: 1,
      scrambleText: {
        text: 'Our Disciplines ',
        chars: '01 ',
        revealDelay: 0.1,
        speed: 0.3,
      },
    });
    disciplinesTl.fromTo(
      '.disciplines-list',
      {
        y: 40,
        opacity: 0,
        duration: 0.8,
        ease: 'power2.out',
      },
      { y: 0, opacity: 1 },
      '>' // Start after scrambleText
    );

    // Shapes for blobA
    const shapesA = [
      '#blob1',
      '#blob2',
      '#blob3',
      '#blob4',
      '#blob5',
      '#blob6',
      '#blob7',
      '#blob8',
    ];

    // Shapes for blobB
    const shapesB = [
      '#blob1',
      '#blob2',
      '#blob3',
      '#blob4',
      '#blob5',
      '#blob6',
      '#blob7',
      '#blob8',
    ];

    const animateBlob = (pathId: string, shapes: string[]) => {
      let lastIndex = 0;

      function morph() {
        let nextIndex;
        do {
          nextIndex = Math.floor(Math.random() * shapes.length);
        } while (nextIndex === lastIndex);

        lastIndex = nextIndex;

        gsap.to(pathId, {
          duration: 6,
          ease: 'sine.inOut',
          morphSVG: shapes[nextIndex],
          onComplete: morph,
        });
      }

      morph();
    };

    animateBlob('#blobA', shapesA);
    animateBlob('#blobB', shapesB);
  }
}
