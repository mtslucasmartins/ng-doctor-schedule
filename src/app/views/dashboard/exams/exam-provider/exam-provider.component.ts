import { Component, OnInit, OnDestroy, Output, EventEmitter, Input, SimpleChanges, OnChanges } from '@angular/core';
import { ProviderService } from 'src/app/services/provider.service';

export interface ProviderInt {
  id: string;
  description: string;
}

@Component({
  selector: 'app-exam-provider-create-component',
  templateUrl: './exam-provider.component.html',
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
export class ExamProviderComponent implements OnInit, OnDestroy {

  @Output() providerSelected = new EventEmitter();

  @Input() provider: ProviderInt;

  //
  public description: string = this.provider ? this.provider.description || '' : '';

  //
  public recentlyUsedProviders: ProviderInt[];

  public filteredProviders: ProviderInt[];

  public noResults = false;

  constructor(private locationsService: ProviderService) { }

  public createProvider(description: string = this.description || '') {
    const location = { description };
    this.locationsService.createProvider(location)
      .subscribe((response: any) => {
        this.findProviders();
        if (response.data && response.data.providers) {
          const providers = response.data.providers;
          if (providers.length === 0) {
            this.filteredProviders = [];
            this.noResults = true;
          } else {
            this.filteredProviders = response.data.providers;
            this.noResults = false;
          }
        }
      });
  }

  public findProviders(description: string = this.description || '') {
    const fields = ['id', 'description'];
    this.locationsService.findProviders(description, fields)
      .subscribe((response: any) => {
        if (response.data && response.data.providers) {
          const providers = response.data.providers;
          if (providers.length === 0) {
            this.filteredProviders = [];
            this.noResults = true;
          } else {
            this.filteredProviders = providers;
            this.noResults = false;
          }
        }
      });
  }

  public select(provider: ProviderInt) {
    this.providerSelected.emit(provider);
  }

  // --------------------------------------------------------------------------
  // LIFE CYCLE STUFF
  // --------------------------------------------------------------------------
  public ngOnInit() {
    // Received a Location as Parameter.
    if (typeof this.provider !== 'undefined' && this.provider !== null) {
      this.findProviders(this.description);
    }
    
    // this.getRecentUsedLocations();
  }
  
  ngOnDestroy() { 
    this.description = '';
  }

}
