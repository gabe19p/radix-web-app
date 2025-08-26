import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { capabilities, Capability } from '../../data/capabilities.data';
import { CommonModule } from '@angular/common';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-capability-page',
  imports: [RouterModule, CommonModule],
  templateUrl: './capability-page.html',
  styleUrl: './capability-page.scss',
})
export class CapabilityPage implements OnInit {
  capability: Capability | undefined;

  constructor(private route: ActivatedRoute, private router: Router) {}

  ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');
    this.capability = capabilities.find((cap) => cap.id === id);
    console.log(this.capability);
  }

  goBack(): void {
    this.router.navigate(['/what-we-do']).then(() => {
      window.scrollTo({ top: 1100, behavior: 'smooth' });
    });
  }
}
