import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { SvgList, svgList as rawSvgList } from '../../data/svg.data';
import { DomSanitizer } from '@angular/platform-browser';
import { RouterModule } from '@angular/router';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-home',
  imports: [RouterModule],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {
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
}
