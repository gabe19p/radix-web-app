import {
  Component,
  Input,
  Output,
  EventEmitter,
  AfterViewInit,
  OnDestroy,
  ElementRef,
  ViewChild,
} from '@angular/core';
import gsap from 'gsap';

@Component({
  selector: 'app-leader-modal',
  imports: [],
  templateUrl: './leader-modal.html',
  styleUrl: './leader-modal.scss',
})
export class LeaderModal implements AfterViewInit, OnDestroy {
  @Input() leader: any;
  @Output() closeModal = new EventEmitter<void>();
  @ViewChild('modal') modalEl!: ElementRef;

  private tl!: gsap.core.Timeline;

  ngAfterViewInit(): void {
    this.tl = gsap.timeline();
    // modal animation
    this.tl.fromTo(
      this.modalEl.nativeElement,
      { autoAlpha: 0, scale: 0.8 },
      { autoAlpha: 1, scale: 1, duration: 0.4, ease: 'power3.out' }
    );
  }

  close() {
    gsap.to(this.modalEl.nativeElement, {
      autoAlpha: 0,
      scale: 0.8,
      duration: 0.3,
      ease: 'power3.in',
      onComplete: () => this.closeModal.emit(),
    });
  }

  ngOnDestroy(): void {
    if (this.tl) {
      this.tl.kill();
    }
  }
}
