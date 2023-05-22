import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  nickname: string;

  data$: Observable<any>;

  constructor() {
    this.nickname = environment.nickname;
  }
}
