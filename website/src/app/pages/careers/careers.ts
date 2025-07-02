import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-careers',
  imports: [CommonModule],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {}
