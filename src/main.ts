import { provideHttpClient, withInterceptorsFromDi } from '@angular/common/http';
import { importProvidersFrom } from '@angular/core';
import { BrowserModule, bootstrapApplication } from '@angular/platform-browser';
// import { provideAnimations } from '@angular/platform-browser/animations';
import 'zone.js'; // Included with Angular CLI.
import { AppComponent } from './app/app.component';

bootstrapApplication(AppComponent, {
    providers: [
        importProvidersFrom(BrowserModule),
        // provideAnimations(),
        provideHttpClient(withInterceptorsFromDi())
    ]
})
  .catch(console.error);
