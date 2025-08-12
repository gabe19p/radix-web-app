import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';
import { capabilities, Capability } from '../../data/capabilities.data';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { Router, RouterModule } from '@angular/router';
import { SvgList, svgList as rawSvgList } from '../../data/svg.data';

gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-what-we-do',
  imports: [CommonModule, RouterModule],
  templateUrl: './what-we-do.html',
  styleUrl: './what-we-do.scss',
})
export class WhatWeDo {
  capabilities: Capability[];
  svgList: SvgList;
  constructor(private sanitizer: DomSanitizer, private router: Router) {
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
    this.capabilities = capabilities.map((cap) => ({
      ...cap,
      icon: this.sanitizer.bypassSecurityTrustHtml(cap.icon),
    }));
  }

  openCap(id: string): void {
    this.router.navigate(['/capabilities', id]).then(() => {
      window.scrollTo({ top: 10, behavior: 'smooth' });
    });
  }
}
