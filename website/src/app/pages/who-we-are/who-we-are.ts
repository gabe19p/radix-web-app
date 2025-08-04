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

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-who-we-are',
  standalone: true,
  imports: [RouterModule, CommonModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss',
})
export class WhoWeAre implements OnInit, OnDestroy {
  @ViewChildren('partnerEl') partnerEls!: QueryList<ElementRef>;
  @ViewChildren('cultureSlide', { read: ElementRef })
  cultureSlides!: QueryList<ElementRef>;

  coreValues = [
    {
      value: 'People',
      statement: 'Our people are the foundation...',
      image: '../../../assets/photos/coreValuePeople.jpg',
    },
    {
      value: 'Passion',
      statement: 'We are inspired by the missions...',
      image: '../../../assets/photos/coreValuePassion.jpg',
    },
    {
      value: 'Integrity',
      statement: 'We uphold the highest standards...',
      image: '../../../assets/photos/coreValueIntegrity.jpg',
    },
  ];

  culture = [
    {
      headline: 'We empower those who serve.',
      statement: 'We take pride in being on the periphery...',
    },
    {
      headline: 'We innovate with purpose.',
      statement: 'A company of empowered bold thinkers...',
    },
    {
      headline: 'Trust is our foundation.',
      statement: 'Our commitment to reliability, quality...',
    },
    {
      headline: 'We are a team of families.',
      statement: 'We actively foster an environment...',
    },
  ];

  leadership = [
    {
      name: 'Pete Molina',
      title: 'CEO',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Mike Kritenbrink',
      title: 'VP',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Amanda Smith',
      title: 'Director of Sec',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Ricky Kee',
      title: 'Corporate Director',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Roger Altobelli',
      title: 'Director of Strat',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
    {
      name: 'Charlie Smith',
      title: 'Tech Director',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet...',
    },
  ];

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

  cultureIndex = 0;
  intervalId: any;

  ngOnInit() {
    this.splitText();
    this.setupGsapAnimations();
    this.startCultureCarousel();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  private setupGsapAnimations() {
    gsap
      .timeline({
        scrollTrigger: { trigger: '#heroText', start: 'top center' },
      })
      .from('.hero-letter', {
        opacity: 0,
        scale: 0.8,
        delay: 1,
        y: 20,
        stagger: 0.05,
        duration: 0.6,
        ease: 'power2.out',
      });

    const missionTl = gsap.timeline({
      scrollTrigger: { trigger: '#mission', start: 'top 75%' },
    });

    missionTl
      .from('.letter', {
        opacity: 0,
        scale: 0.5,
        y: -20,
        stagger: 0.03,
        duration: 1,
        ease: 'back.out(1.7)',
      })
      .from(
        '.word',
        {
          y: 30,
          opacity: 0,
          stagger: 0.05,
          duration: 1.5,
          ease: 'power2.out',
        },
        '<'
      );

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

  private startCultureCarousel() {
    gsap.set('.culture-carousel .carousel-slide', { autoAlpha: 0 });
    this.showSlide(this.cultureIndex);
    this.intervalId = setInterval(() => {
      this.cultureIndex = (this.cultureIndex + 1) % this.culture.length;
      this.showSlide(this.cultureIndex);
    }, 8000);
  }

  private showSlide(index: number) {
    gsap.to('.culture-carousel .carousel-slide', {
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
    });
    gsap.fromTo(
      `.culture-carousel .carousel-slide[data-index="${index}"]`,
      { autoAlpha: 0, x: 20 },
      { autoAlpha: 1, x: 0, duration: 0.8, ease: 'power2.out' }
    );
  }
}
