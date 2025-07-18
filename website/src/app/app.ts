import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TopNav } from './components/top-nav/top-nav';
import { ModelService } from './services/model';

@Component({
  selector: 'app-root',
  imports: [RouterOutlet, TopNav],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'website';

  constructor(private modelService: ModelService) {}

  ngOnInit() {
    this.modelService
      .preloadModel('/assets/models/piece.glb')
      .then(() => console.log('Model preloaded!'))
      .catch((err) => console.error('Failed to preload model:', err));
  }
}
