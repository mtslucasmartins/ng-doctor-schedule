import { Component, OnInit } from '@angular/core';
import { SwUpdate } from '@angular/service-worker';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public updateAvailable: boolean;

  title = 'ng-doctor-schedule';

  constructor(public swUpdate: SwUpdate) { }

  public refresh() {
    window.location.reload();
  }

  public ngOnInit() {
    this.updateAvailable = false;
    if (this.swUpdate.isEnabled) {
      this.swUpdate.available.subscribe(() => {
        this.updateAvailable = true;
      });
    }
  }

}
