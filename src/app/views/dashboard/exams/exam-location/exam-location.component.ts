import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';
import { LocationsService } from 'src/app/services/locations.service';

export interface LocationInt {
  id: string;
  description: string;
}

@Component({
  selector: 'app-exam-location-create-component',
  templateUrl: './exam-location.component.html',
  styles: [`
    .button-clear{
      background-color: white;
      color: red;
      border-left: none;
      border-color: lightgray;
    }
    .ui-button:enabled:hover{
      background-color: white;
      color: red;
      border-left: none;
      border-color: lightgray;
    }
    .ui-button:enabled:active{
      background-color: white;
      color: red;
      border-left: none;
      border-color: lightgray;
    }
    .ui-button:enabled:focus{
      box-shadow: none;
    }
  `]
})
export class ExamLocationComponent implements OnInit, OnDestroy {

  @Output() locationSelected = new EventEmitter();

  @Input() location: LocationInt;

  //
  public description: string = '';

  //
  public recentlyUsedLocations: LocationInt[];

  public filteredLocations: LocationInt[];

  public noResults = false;

  constructor(private locationsService: LocationsService) { }

  public getRecentUsedLocations() {
    this.recentlyUsedLocations = [
      { id: '1', description: 'Hospital Dona Helena' }
    ];
  }

  public createLocation(description: string = this.description || '') {
    const location = { description };
    this.locationsService.createLocation(location)
      .subscribe((response: any) => {
        this.findLocations();
        if (response.data && response.data.locations) {
          const locations = response.data.locations;
          if (locations.length === 0) {
            this.filteredLocations = [];
            this.noResults = true;
          } else {
            this.filteredLocations = response.data.locations;
            this.noResults = false;
          }
        }
      });
  }

  public findLocations(description: string = this.description || '') {
    const fields = ['id', 'description'];
    this.locationsService.findLocations(description, fields)
      .subscribe((response: any) => {
        if (response.data && response.data.locations) {
          const locations = response.data.locations;
          if (locations.length === 0) {
            this.filteredLocations = [];
            this.noResults = true;
          } else {
            this.filteredLocations = response.data.locations;
            this.noResults = false;
          }
        }
      });
  }

  public select(location: LocationInt) {
    this.locationSelected.emit(location);
  }

  // --------------------------------------------------------------------------
  // LIFE CYCLE STUFF
  // --------------------------------------------------------------------------
  public ngOnInit() {
    // Received a Location as Parameter.
    if (typeof this.location !== 'undefined' && this.location !== null) {
      this.findLocations(this.description);
    }

    this.getRecentUsedLocations();
  }

  ngOnDestroy() {
    this.description = '';
  }

}
