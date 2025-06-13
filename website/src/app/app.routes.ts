import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WhoWeAre } from './pages/who-we-are/who-we-are';
import { WhatWeDo } from './pages/what-we-do/what-we-do';
import { Careers } from './pages/careers/careers';
import { Leadership } from './pages/leadership/leadership';
import { Landing } from './pages/landing/landing';
import { Template } from './template/template';

export const routes: Routes = [
  { path: '', component: Landing },
  {
    path: '',
    component: Template, // Layout with nav/footer
    children: [
      { path: 'home', component: Home },
      { path: 'who-we-are', component: WhoWeAre },
      { path: 'what-we-do', component: WhatWeDo },
      { path: 'radix-careers', component: Careers },
      { path: 'who-we-are/leadership', component: Leadership },
    ],
  },
];
