import { AfterViewInit, Component, Inject } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';

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
    this.splitText();
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
        trigger: '.careers-disciplines',
        start: 'top 70%',
      },
    });
    disciplinesTl.from('.disciplines-letter', {
      opacity: 0,
      scale: 0.8,
      delay: 1,
      y: 20,
      stagger: 0.05,
      duration: 0.6,
      ease: 'power2.out',
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

  private splitText() {
    const split = (id: string, className: string) => {
      const el = this.document.getElementById(id);
      if (!el) return;
      const chars = el?.textContent?.split('') || [];
      el.innerHTML = chars
        .map(
          (c) => `<span class="${className}">${c === '' ? '&nbsp;' : c}</span>`
        )
        .join('');
    };

    split('disciplines', 'disciplines-letter');
  }
}
