import {
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Observable, Subscription, of } from 'rxjs';
import { environment } from '../environments/environment';
import { AlienService } from './services/alien.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit, OnDestroy {
  nickname: string;
  subscrption!: Subscription;

  data$!: Observable<any>;
  @ViewChild('chatInput') chatInput!: ElementRef;

  constructor(
    private alienService: AlienService,
    private toaster: ToastrService
  ) {
    this.nickname = environment.nickname;
  }

  ngOnInit(): void {
    this.data$ = this.alienService.getData();
  }

  handleMessage(event: any) {
    const message = event.target.value;
    const payload = { nickname: this.nickname, message };
    this.subscrption = this.alienService.sendData(payload).subscribe({
      next: (res) => {
        this.data$ = of(res);
        this.chatInput.nativeElement.value = '';
      },
      error: (err) => {
        this.toaster.error('Internal server error');
      },
    });
  }

  ngOnDestroy(): void {
    this.subscrption.unsubscribe();
  }
}
