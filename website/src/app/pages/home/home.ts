import { Component } from '@angular/core';
import { TestThree } from '../../components/test-three/test-three';

@Component({
  selector: 'app-home',
  imports: [TestThree],
  templateUrl: './home.html',
  styleUrl: './home.scss',
})
export class Home {}
