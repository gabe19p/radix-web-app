import { Component } from '@angular/core';
import { Footer } from '../components/footer/footer';
import { TopNav } from '../components/top-nav/top-nav';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-template',
  imports: [Footer, TopNav, RouterOutlet],
  templateUrl: './template.html',
  styleUrl: './template.scss',
})
export class Template {}
