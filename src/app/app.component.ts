import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  public updateAvailable: boolean;

  title = 'ng-doctor-schedule';

  public ngOnInit() {
    this.updateAvailable = false;
  }

}
