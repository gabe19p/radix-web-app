import {
  AfterViewInit,
  Component,
  OnDestroy,
  QueryList,
  ViewChild,
  ViewChildren,
  ElementRef,
  OnInit,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SvgList, svgList as rawSvgList } from '../../data/svg.data';
import { leadership, Leader } from '../../data/leadership.data'; // adjust path if needed
import { DomSanitizer } from '@angular/platform-browser';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss',
})
export class WhoWeAre implements AfterViewInit, OnDestroy {
  leadership: Leader[] = leadership;
  svgList: SvgList;

  constructor(private sanitizer: DomSanitizer) {
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

  partners = [
    { image: '../../../assets/logos/lockheed.jpg' },
    { image: '../../../assets/logos/amazon.png' },
    { image: '../../../assets/logos/boeing.png' },
    { image: '../../../assets/logos/northrop.jpg' },
    { image: '../../../assets/logos/google.png' },
    { image: '../../../assets/logos/l3.png' },
    { image: '../../../assets/logos/lockheed.jpg' },
    { image: '../../../assets/logos/raytheon.jpg' },
    { image: '../../../assets/logos/northrop.jpg' },
    { image: '../../../assets/logos/google.png' },
  ];

  ngAfterViewInit(): void {
    setTimeout(() => {
      this.splitText();
      this.setupGsapAnimations();
    }, 100); // Slight delay ensures DOM/layout stability
  }

  ngOnDestroy(): void {
    ScrollTrigger.getAll().forEach((trigger) => trigger.kill());
  }

  private setupGsapAnimations() {
    // const missionTl = gsap.timeline({
    //   scrollTrigger: { trigger: '#mission', start: 'top 75%' },
    // });

    // missionTl
    //   .from('.letter', {
    //     opacity: 0,
    //     scale: 0.5,
    //     y: -20,
    //     stagger: 0.03,
    //     duration: 1,
    //     ease: 'back.out(1.7)',
    //   })
    //   .from(
    //     '.word',
    //     {
    //       y: 30,
    //       opacity: 0,
    //       stagger: 0.05,
    //       duration: 1.5,
    //       ease: 'power2.out',
    //     },
    //     '<'
    //   );

    gsap.from('.partner', {
      scrollTrigger: {
        trigger: '#partners',
        start: 'top 50%',
        end: 'bottom 50%',
      },
      opacity: 0,
      // scale: 0.8,
      stagger: 0.1,
      duration: 2,
      // ease: 'back.out(1.7)',
    });
  }

  private splitText() {
    const split = (id: string, className: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const chars = el.textContent?.split('') || [];
      el.innerHTML = chars
        .map(
          (c) => `<span class="${className}">${c === ' ' ? '&nbsp;' : c}</span>`
        )
        .join('');
    };

    const splitWords = (id: string) => {
      const el = document.getElementById(id);
      if (!el) return;
      const words = el.textContent?.split(' ') || [];
      el.innerHTML = words
        .map((w) => `<span class="word">${w}</span>`)
        .join(' ');
    };

    split('heroText', 'hero-letter');
    split('mission', 'letter');
    splitWords('mission-paragraph');
  }
}
