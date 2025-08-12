import { SafeHtml } from '@angular/platform-browser';

export interface Capability {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  image: string;
  video: string;
}

export const capabilities = [
  {
    id: 'sc',
    title: 'Satisfaction & Credibility',
    subtitle: 'Satisfaction and Credibility',
    description:
      'Ensure the provision of clean, reliable data for various applications. The framework integrates three core data concepts: satisfaction, credibility, and resilience. Each plays a crucial role in maintaining data integrity and trustworthiness. By automating data evaluation, prioritization, and anomaly detection, S&C provides a streamlined approach to consuming and maintaining clean reliable data',
    image: 'assets/sac.jpg',
    video: 'assets/videos/sc (blue).mp4',
  },
  {
    id: 'act',
    title: 'Advanced Custody & Tracking',
    subtitle: 'Advanced Custody and Tracking',
    description:
      'Transparently deliver purified real-world truth data and its logic-filtered custody analysis to systems that influence decision-making. Integrate multi-source data to produce a complete visualization of real-world conditions, while validating the credibility of data for the person-on-the-loop. Supports time-restricted critical decisions by reducing decision cycle time and enabling a competitive edge',
    image: 'assets/act.jpg',
    video: 'assets/videos/act.mp4',
  },
  {
    id: 'dso',
    title: 'Dynamic Space Orchestration',
    subtitle: 'Dynamic Space Orchestration',
    description:
      'Comprehensive software development and systems engineering for small satellites (>1,100 lbs). Includes GNC, telemetry, and integration into government-defined networks. Our team develops mission software, troubleshoots, and integrates niche operational capabilities into government satellite systems',
    image: 'assets/dso.jpg',
    video: 'assets/videos/dso.mp4',
  },
  {
    id: 'cew',
    title: 'Customized Electronic Warfare',
    subtitle: 'Customized Electronic Warfare',
    description:
      'SDR Waveform Emulation Evaluation and Simulation for both training and field operations. Waveform hardware-to-software decomposition for synthesis solutions. AI/ML-enabled morphing waveform for communications and enemy identification',
    image: 'assets/cew.jpg',
    video: 'assets/videos/cew.mp4',
  },
];
