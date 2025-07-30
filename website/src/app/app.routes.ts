import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { WhoWeAre } from './pages/who-we-are/who-we-are';
import { WhatWeDo } from './pages/what-we-do/what-we-do';
import { Careers } from './pages/careers/careers';
import { Leadership } from './pages/leadership/leadership';
import { CapabilityPage } from './pages/capability-page/capability-page';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'home', component: Home },
  {
    path: 'who-we-are',
    component: WhoWeAre,
  },
  { path: 'what-we-do', component: WhatWeDo },
  { path: 'careers', component: Careers },
  { path: 'who-we-are/leadership', component: Leadership },
  { path: 'capabilities', component: CapabilityPage },
];
