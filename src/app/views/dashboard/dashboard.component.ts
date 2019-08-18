import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-dashboard-component',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {

  public routeId: string;

  public sub;

  public sidebarItems = {
    selected: ''
  };

  constructor(private route: ActivatedRoute) {

  }

  ngOnInit() {
    if (this.route.firstChild.data)
      this.sub = this.route.firstChild
        .data
        .subscribe(v => {
          console.log(v);

          this.routeId = v.routeId;
        });
  }

  ngOnDestroy() {
    // this.sub.unsubscribe();
  }

}
