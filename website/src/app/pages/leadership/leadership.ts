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
  @ViewChildren('panel') panels!: QueryList<ElementRef>;
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
    this.panels.forEach((panel, index) => {
      gsap.from(panel.nativeElement, {
        x: 300,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: panel.nativeElement,
          start: 'top 95%',
          toggleActions: 'play none none none',
        },
        delay: index * 0.1,
      });
    });

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
      name: 'Pete Molina',
      title: 'CEO/CFO',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
    {
      name: 'Mike Kritenbrink',
      title: 'VP of Operations',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
  ];

  subleaders = [
    {
      name: 'Ricky Kee',
      title: 'Corporate Operations',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
    {
      name: 'Roger Altobelli',
      title: 'Solutions',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
    {
      name: 'Charlie Smith',
      title: 'Technology & Innovation',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
    {
      name: 'Amanda Smith',
      title: 'Security & Chief of Facility',
      image: '../../../assets/headshots/headshot-pete.png',
      bio: `Lorem ipsum dolor, sit amet consectetur adipisicing elit. Itaque sint deleniti eum debitis laudantium praesentium eius iste voluptate ipsa consectetur minus officiis, id dignissimos voluptates quibusdam necessitatibus quod voluptatibus saepe!`,
    },
  ];

  private getScrollbarWidth(): number {
    return window.innerWidth - document.documentElement.clientWidth;
  }
}
