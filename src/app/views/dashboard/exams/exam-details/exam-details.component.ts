import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';
import { LocationsService } from 'src/app/services/locations.service';

export interface LocationInt {
  id: string;
  description: string;
}

@Component({
  selector: 'app-exam-details-create-component',
  templateUrl: './exam-details.component.html'
})
export class ExamDetailsComponent implements OnInit, OnDestroy {

  @Output() locationSelected = new EventEmitter();

  @Input() location: LocationInt;

  public image: string | ArrayBuffer;
  public defaultImage = 'assets/images/camera-placeholder.jpg';

  constructor(private locationsService: LocationsService) { }

  public readURL(event: any): void {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.image = reader.result || that.defaultImage;

      reader.readAsDataURL(file);
    }
  }

  // --------------------------------------------------------------------------
  // LIFE CYCLE STUFF
  // --------------------------------------------------------------------------
  public ngOnInit() {

  }

  ngOnDestroy() { }

}
