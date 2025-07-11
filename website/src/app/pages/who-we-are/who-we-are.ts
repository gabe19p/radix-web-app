import {
  AfterViewInit,
  Component,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  OnDestroy,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Footer } from '../../components/footer/footer';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-who-we-are',
  imports: [RouterModule, Footer, CommonModule],
  templateUrl: './who-we-are.html',
  styleUrl: './who-we-are.scss',
})
export class WhoWeAre implements AfterViewInit, OnDestroy {
  @ViewChildren('valueSlide', { read: ElementRef })
  valueSlides!: QueryList<ElementRef>;
  @ViewChildren('cultureSlide', { read: ElementRef })
  cultureSlides!: QueryList<ElementRef>;
  @ViewChildren('partnersTrack', { read: ElementRef })
  partnersTrack!: QueryList<ElementRef>;

  coreValues = [
    {
      value: 'People',
      statement:
        'Our people are the foundation of our mission. We foster a world-class culture that empowers and prioritizes them.',
      image: '../../../assets/photos/coreValuePeople.jpg',
    },
    {
      value: 'Passion',
      statement:
        'We are inspired by the missions we serve and proactively seek innovative methodologies to address evolving challenges.',
      image: '../../../assets/photos/coreValuePassion.jpg',
    },
    {
      value: 'Integrity',
      statement:
        'We uphold the highest standards of performance, acting with unwavering honesty and accountability to earn and sustain the trust of our colleagues, partners, and customers.',
      image: '../../../assets/photos/coreValueIntegrity.jpg',
    },
  ];

  culture = [
    {
      headline: 'We empower those who serve.',
      statement:
        'We take pride in being on the periphery supporting our national heroes; they will never know us, yet they will feel the benefit of our work!',
    },
    {
      headline: 'We innovate with purpose.',
      statement:
        'A company of empowered bold thinkers; we are driven by passion, creativity, and the audacity to constantly push the boundaries of technology.',
    },
    {
      headline: 'Trust is our foundation.',
      statement:
        'Our commitment to reliability, quality, and integrity is unwavering; we are accountable to the highest standards and always deliver on our promises.',
    },
    {
      headline: 'We are a team of families.',
      statement:
        'We actively foster an environment where both professional and personal life are valued and supported. We encourage a culture of flexibility and balance, being human takes precedence.',
    },
  ];

  leadership = [
    {
      name: 'Pete Molina',
      title: 'CEO',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium exercitationem officiis, iure illum voluptatem aliquid veritatis voluptatibus sit a cumque temporibus maiores facere, deleniti voluptate, vel dolor nihil ratione. Voluptatem.',
    },
    {
      name: 'Mike Kritenbrink',
      title: 'VP',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium exercitationem officiis, iure illum voluptatem aliquid veritatis voluptatibus sit a cumque temporibus maiores facere, deleniti voluptate, vel dolor nihil ratione. Voluptatem.',
    },
    {
      name: 'Ricky Kee',
      title: 'Corporate Director',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium exercitationem officiis, iure illum voluptatem aliquid veritatis voluptatibus sit a cumque temporibus maiores facere, deleniti voluptate, vel dolor nihil ratione. Voluptatem.',
    },
    {
      name: 'Roger Altobelli',
      title: 'Director of Solutions',
      photo: '../../../assets/headshots/headshot-pete.png',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laudantium exercitationem officiis, iure illum voluptatem aliquid veritatis voluptatibus sit a cumque temporibus maiores facere, deleniti voluptate, vel dolor nihil ratione. Voluptatem.',
    },
  ];

  partners = [
    { image: '../../../assets/logos/amazon.png' },
    { image: '../../../assets/logos/boeing.png' },
    { image: '../../../assets/logos/google.png' },
    { image: '../../../assets/logos/l3.png' },
    { image: '../../../assets/logos/lockheed.jpg' },
    { image: '../../../assets/logos/northrop.jpg' },
    { image: '../../../assets/logos/raytheon.jpg' },
  ];

  partnerOffset = 0;

  visiblePartners: any[] = [];
  partnerIndex = 0;
  valueIndex = 0;
  cultureIndex = 0;
  leadershipIndex = 0;
  intervalId: any;

  ngAfterViewInit() {
    this.updateVisiblePartners();
    // Ensure all slides start hidden
    gsap.set('.value-carousel .carousel-slide', { autoAlpha: 0 });
    gsap.set('.culture-carousel .carousel-slide', { autoAlpha: 0 });
    gsap.set('.leadership-carousel .carousel-slide', { autoAlpha: 0 });
    this.showSlide(this.valueIndex, '.value-carousel');
    this.showSlide(this.cultureIndex, '.culture-carousel');
    this.showSlide(this.leadershipIndex, '.leadership-carousel');

    // Auto-cycle every X seconds
    this.intervalId = setInterval(() => {
      this.valueIndex = (this.valueIndex + 1) % this.coreValues.length;
      this.cultureIndex = (this.cultureIndex + 1) % this.culture.length;
      this.leadershipIndex =
        (this.leadershipIndex + 1) % this.leadership.length;
      this.partnerIndex = (this.partnerIndex + 1) % this.partners.length;
      this.updateVisiblePartners();

      this.showSlide(this.valueIndex, '.value-carousel');
      this.showSlide(this.cultureIndex, '.culture-carousel');
      this.showSlide(this.leadershipIndex, '.leadership-carousel');
    }, 8000);
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  showSlide(index: number, containerSelector: string) {
    gsap.to(`${containerSelector} .carousel-slide`, {
      autoAlpha: 0,
      duration: 0.4,
      ease: 'power2.out',
    });

    gsap.fromTo(
      `${containerSelector} .carousel-slide[data-index="${index}"]`,
      { autoAlpha: 0, x: 20 },
      {
        autoAlpha: 1,
        x: 0,
        duration: 0.8,
        ease: 'power2.out',
      }
    );
  }

  showNextSlide() {
    this.valueIndex = (this.valueIndex + 1) % this.coreValues.length;
    this.cultureIndex = (this.cultureIndex + 1) % this.culture.length;
    this.leadershipIndex = (this.leadershipIndex + 1) % this.leadership.length;

    this.showSlide(this.valueIndex, '.value-carousel');
    this.showSlide(this.cultureIndex, '.culture-carousel');
    this.showSlide(this.leadershipIndex, '.leadership-carousel');
  }

  updateVisiblePartners() {
    const track = this.partnersTrack.first?.nativeElement as HTMLElement;
    if (!track) return;

    const partnerWidth =
      track.children[0]?.getBoundingClientRect().width || 150;
    const totalWidth = partnerWidth * this.partners.length;

    this.partnerOffset -= partnerWidth;

    // Wrap to beginning
    if (Math.abs(this.partnerOffset) >= totalWidth) {
      this.partnerOffset = 0;
      gsap.set(track, { x: 0 }); // jump reset
    } else {
      gsap.to(track, {
        x: this.partnerOffset,
        duration: 0.6,
        ease: 'power2.out',
      });
    }
  }
}
