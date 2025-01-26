import { ApplicationConfig } from '@angular/core';
import { provideRouter, withPreloading, withComponentInputBinding, PreloadAllModules } from '@angular/router';
import { routes } from './app-routing.module';
import { provideAnimations } from '@angular/platform-browser/animations';
import { Meta } from '@angular/platform-browser';

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(
      routes,
      withComponentInputBinding(),
      withPreloading(PreloadAllModules),
    ),
    provideAnimations(),
    {
      provide: Meta,
      useClass: Meta
    }
  ]
};
