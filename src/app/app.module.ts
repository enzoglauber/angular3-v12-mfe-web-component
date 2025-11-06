import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector, Inject } from '@angular/core';
import { createCustomElement } from '@angular/elements';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { AComponent } from './a/a.component';
import { NotFoundComponent } from './not-found.component';
import { APP_BASE_HREF } from '@angular/common';

@NgModule({
  imports: [
    BrowserModule,
    RouterModule.forRoot(
      [
        { path: 'a', component: AComponent },
        {
          path: 'b',
          loadChildren: () => import('./b/b.module').then((m) => m.BModule),
        },
        { path: 'error', component: NotFoundComponent },

        { path: '**', redirectTo: 'error', pathMatch: 'full' },
        { path: '', redirectTo: 'a', pathMatch: 'full' },
      ],
      {
        enableTracing: true, // 🔥 log detalhado no console
      }
    ),
  ],
  declarations: [AComponent, AppComponent, NotFoundComponent],
  providers: [{ provide: APP_BASE_HREF, useValue: '/angular3/' }],
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
  }
}
