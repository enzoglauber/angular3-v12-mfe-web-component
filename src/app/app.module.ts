import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { BComponent } from './b/b.component';
import { NotFoundComponent } from './not-found.component';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot([
      { path: 'angular3/a', component: AComponent },
      { path: 'angular3/b', component: BComponent },
      { path: 'angular3/error', component: NotFoundComponent },

      { path: '**', redirectTo: 'angular3/error', pathMatch: 'full' },
    ]),
  ],
  declarations: [AComponent, BComponent, AppComponent, NotFoundComponent],
  providers: [],
  bootstrap: [],
})
export class AppModule {
  constructor(private injector: Injector) {}

  ngDoBootstrap() {
    const ce = createCustomElement(AppComponent, { injector: this.injector });
    customElements.define('angular3-element', ce);

    customElements.define(
      'angular3-a-element',
      createCustomElement(AComponent, { injector: this.injector })
    );
    customElements.define(
      'angular3-b-element',
      createCustomElement(BComponent, { injector: this.injector })
    );
  }
}
