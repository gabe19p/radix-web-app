import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
import { TopNav } from '../../components/top-nav/top-nav';
import { Footer } from '../../components/footer/footer';
gsap.registerPlugin(ScrollTrigger);

@Component({
  selector: 'app-careers',
  imports: [CommonModule, TopNav, Footer],
  templateUrl: './careers.html',
  styleUrl: './careers.scss',
})
export class Careers {}
