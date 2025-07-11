import { AfterViewInit, Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

import { TopNav } from '../../components/top-nav/top-nav';
import { Footer } from '../../components/footer/footer';
gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

@Component({
  selector: 'app-careers',
  imports: [CommonModule, Footer],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements AfterViewInit {
  constructor(@Inject(DOCUMENT) private document: Document) {}

  ngAfterViewInit(): void {
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

    const disciplinesTl = gsap.timeline({
      scrollTrigger: {
        trigger: '.career-disciplines',
        start: 'top 70%',
      },
    });
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
  }
}
