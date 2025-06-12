import {
  Component,
  ElementRef,
  AfterViewInit,
  ViewChildren,
  QueryList,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { LeaderModal } from '../../components/leader-modal/leader-modal';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-leadership',
  imports: [CommonModule, LeaderModal],
  templateUrl: './leadership.html',
  styleUrl: './leadership.scss',
})
export class Leadership implements AfterViewInit {
  @ViewChildren('card') cards!: QueryList<ElementRef>;

  selectedLeader: any = null;

  openModal(leader: any) {
    this.selectedLeader = leader;
    // prevent scroll if modal is open
    const scrollbarWidth = this.getScrollbarWidth();
    document.body.style.overflow = 'hidden';

    if (scrollbarWidth > 0) {
      document.body.style.paddingRight = `${scrollbarWidth}px`;
    }
  }

  closeModal() {
    this.selectedLeader = null;
    // reset scroll when modal is closed
    document.body.style.overflow = '';
    document.body.style.paddingRight = '';
  }

  ngAfterViewInit(): void {
    this.cards.forEach((card, index) => {
      gsap.from(card.nativeElement, {
        y: 300,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: card.nativeElement,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.1,
      });
    });
  }

  leaders = [
    {
      name: 'Jane Doe',
      title: 'CEO',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
    {
      name: 'John Smith',
      title: 'CTO',
      image: '../../../assets/headshots/headshot-pete.png',
    },
    {
      name: 'Emily Zhang',
      title: 'COO',
      image: '../../../assets/headshots/headshot-pete.png',
    },
    {
      name: 'Carlos Ruiz',
      title: 'CFO',
      image: '../../../assets/headshots/headshot-pete.png',
    },
    {
      name: 'Mina Patel',
      title: 'CMO',
      image: '../../../assets/headshots/headshot-pete.png',
    },
    {
      name: 'Samir Khan',
      title: 'CIO',
      image: '../../../assets/headshots/headshot-pete.png',
    },
  ];

  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }
}
