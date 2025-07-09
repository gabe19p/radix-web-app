import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import gsap from 'gsap';
import ScrollTrigger from 'gsap/ScrollTrigger';
gsap.registerPlugin(ScrollTrigger);

import { Footer } from '../../components/footer/footer';
import { TopNav } from '../../components/top-nav/top-nav';

@Component({
  selector: 'app-home',
  imports: [Footer, TopNav],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
