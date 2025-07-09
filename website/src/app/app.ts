import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNav } from './components/top-nav/top-nav';
import { Footer } from './components/footer/footer';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'website';
}
