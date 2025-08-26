import { AfterViewInit, Component, Inject, OnInit } from '@angular/core';
import { CommonModule, DOCUMENT } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import ScrollToPlugin from 'gsap/ScrollToPlugin';
import { DomSanitizer } from '@angular/platform-browser';
import { SvgList, svgList as rawSvgList } from '../../data/svg.data';

gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

@Component({
  selector: 'app-careers',
  imports: [CommonModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers implements AfterViewInit {
  svgList: SvgList;

  constructor(
    private sanitizer: DomSanitizer,
    @Inject(DOCUMENT) private document: Document
  ) {
    this.svgList = Object.fromEntries(
      Object.entries(rawSvgList).map(([key, value]) => [
        key,
        {
          ...value,
          id: key,
          icon: this.sanitizer.bypassSecurityTrustHtml(value.icon),
        },
      ])
    );
  }

  ngAfterViewInit(): void {
    // Delay everything to ensure video is loaded and DOM is stable
    setTimeout(() => {
      this.splitText();
      this.disciplinesAnimations();
      this.whyRadixAnimations();

      // Force ScrollTrigger to re-calculate positions
      ScrollTrigger.refresh();
    }, 100); // A 100ms delay gives the browser time to render the video
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
    split('why-radix', 'why-letter');
  }

  private titleAnimation() {
    gsap
      .timeline({
        scrollTrigger: { trigger: '#heroText', start: 'top center' },
      })
      .from('.hero-wrapper', {
        opacity: 0,
        scale: 0.9,
        delay: 0.1,
        y: 3,
        duration: 0.3,
        ease: 'power2.out',
      });
  }

  private whyRadixAnimations() {
    // Animate letters as before
    gsap.from('.why-letter', {
      scrollTrigger: {
        trigger: '.careers-why',
        start: 'top 80%',
        toggleActions: 'play none none reverse',
      },
      opacity: 0,
      scale: 0.8,
      y: 20,
      stagger: 0.05,
      duration: 0.1,
      ease: 'power2.out',
    });

    // Animate each row individually
    document.querySelectorAll<HTMLElement>('.why-row').forEach((row) => {
      gsap.from(row, {
        scrollTrigger: {
          trigger: row,
          start: 'top 85%', // row's bottom hits 75% down the screen
          toggleActions: 'play none none reverse',
        },
        opacity: 0,
        scale: 0.8,
        x: 20,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  }

  private disciplinesAnimations() {
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
              duration: 0.2,
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
    // disciplinesTl.from('.disciplines-letter', {
    //   opacity: 0,
    //   scale: 0.8,
    //   delay: 1,
    //   y: 20,
    //   stagger: 0.05,
    //   duration: 0.2,
    //   ease: 'power2.out',
    // });
    disciplinesTl.fromTo(
      '.disciplines-list',
      {
        y: 10,
        opacity: 0,
        duration: 0.2,
        ease: 'power2.out',
      },
      { y: 0, opacity: 1 },
      '>' // Start after scrambleText
    );
  }
}
