import { Component, Injector } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'app';
  static loading: boolean;
  static injector: Injector;
  constructor(injector: Injector) {
    AppComponent.injector = injector;
    AppComponent.loading = true;
  }
}


