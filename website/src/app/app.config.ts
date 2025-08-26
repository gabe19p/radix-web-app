import {
  ApplicationConfig,
  importProvidersFrom,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
} from '@angular/core';

import {
  provideRouter,
  withViewTransitions,
  withEnabledBlockingInitialNavigation,
  withNavigationErrorHandler,
  ROUTER_CONFIGURATION,
} from '@angular/router';

import { routes } from './app.routes';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({ eventCoalescing: true }),

    provideRouter(
      routes,
      withViewTransitions(),
      withEnabledBlockingInitialNavigation(),
      withNavigationErrorHandler((err) => console.error(err))
    ),

    // ✅ Scroll to top on every route change
    {
      provide: ROUTER_CONFIGURATION,
      useValue: {
        scrollPositionRestoration: 'top',
        anchorScrolling: 'enabled',
      },
    },

    importProvidersFrom(BrowserAnimationsModule),
  ],
};
