import { Injectable, Renderer2, RendererFactory2 } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

type ThemeType = 'light' | 'dark';

type ThemeColors = {
  '--primary': string;
  '--primary-hover': string;
  '--background': string;
  '--surface': string;
  '--text-primary': string;
  '--text-secondary': string;
  '--border': string;
  '--border-light': string;
  '--shadow': string;
  '--overlay': string;
  '--success': string;
  '--success-hover': string;
  '--danger': string;
  '--danger-hover': string;
};

@Injectable({
  providedIn: 'root'
})
export class ThemeService {
  private renderer: Renderer2;
  private colorScheme: ThemeType = 'light';
  private isDarkTheme = new BehaviorSubject<boolean>(false);
  isDarkTheme$ = this.isDarkTheme.asObservable();

  private themes: Record<ThemeType, ThemeColors> = {
    light: {
      '--primary': '#ff6b6b',         // Coral pink
      '--primary-hover': '#ff5252',   // Darker coral
      '--background': '#f8f9fa',
      '--surface': '#ffffff',
      '--text-primary': '#333333',
      '--text-secondary': '#606060',
      '--border': '#e0e0e0',
      '--border-light': '#eeeeee',
      '--shadow': '0 2px 4px rgba(0, 0, 0, 0.1)',
      '--overlay': 'rgba(0, 0, 0, 0.5)',
      '--success': '#28a745',
      '--success-hover': '#218838',
      '--danger': '#dc3545',
      '--danger-hover': '#c82333'
    },
    dark: {
      '--primary': '#ff7b7b',         // Lighter coral pink for dark mode
      '--primary-hover': '#ff8787',   // Even lighter on hover for contrast
      '--background': '#121212',
      '--surface': '#1e1e1e',
      '--text-primary': '#ffffff',
      '--text-secondary': '#b3b3b3',
      '--border': '#2d2d2d',
      '--border-light': '#404040',
      '--shadow': '0 2px 8px rgba(0, 0, 0, 0.4)',
      '--overlay': 'rgba(0, 0, 0, 0.7)',
      '--success': '#2ea043',
      '--success-hover': '#3fb950',
      '--danger': '#da3633',
      '--danger-hover': '#f85149'
    }
  };

  constructor(rendererFactory: RendererFactory2) {
    this.renderer = rendererFactory.createRenderer(null, null);
    this.init();
  }

  init() {
    this.setTheme(this.colorScheme);
  }

  setTheme(scheme: ThemeType) {
    this.colorScheme = scheme;
    const theme = this.themes[scheme];
    Object.keys(theme).forEach(key => {
      document.documentElement.style.setProperty(
        key,
        theme[key as keyof ThemeColors]
      );
    });
    this.isDarkTheme.next(scheme === 'dark');
  }

  toggleTheme() {
    const newScheme = this.colorScheme === 'light' ? 'dark' : 'light';
    this.setTheme(newScheme);
  }

  getCurrentTheme() {
    return this.isDarkTheme.value ? 'dark' : 'light';
  }
} 