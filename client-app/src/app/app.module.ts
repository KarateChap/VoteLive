import { NgModule, isDevMode } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PrimeNgModule } from './shared/modules/primeng.module';
import {
  HTTP_INTERCEPTORS,
  HttpClientModule,
  provideHttpClient,
  withInterceptors,
} from '@angular/common/http';
import { HeaderComponent } from './layout/header/header.component';
import { LayoutComponent } from './layout/layout.component';
import { AuthComponent } from './pages/auth/auth.component';
import { AppRoutingModule } from './app-routing.module';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { EffectsModule } from '@ngrx/effects';
import { StoreRouterConnectingModule } from '@ngrx/router-store';
import { routerReducer } from '@ngrx/router-store';
import * as topicEffects from './pages/topics-list/store/topic.effects';
import * as commonEffects from './shared/common-store/common.effects';
import { topicReducer } from './pages/topics-list/store/topic.reducers';
import { errorInterceptor } from './shared/interceptors/error.interceptor';
import { commonReducer } from './shared/common-store/common.reducers';

@NgModule({
  declarations: [AppComponent, HeaderComponent, LayoutComponent, AuthComponent],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    PrimeNgModule,
    FormsModule,
    StoreModule.forRoot({
      routerReducer,
      topic: topicReducer,
      common: commonReducer,
    }),
    EffectsModule.forRoot([topicEffects, commonEffects]),
    StoreRouterConnectingModule.forRoot(),
    StoreDevtoolsModule.instrument({
      maxAge: 25,
      logOnly: !isDevMode(),
      autoPause: true,
      trace: false,
      traceLimit: 75,
    }),
  ],
  bootstrap: [AppComponent],
  providers: [provideHttpClient(withInterceptors([errorInterceptor]))],
})
export class AppModule {}
