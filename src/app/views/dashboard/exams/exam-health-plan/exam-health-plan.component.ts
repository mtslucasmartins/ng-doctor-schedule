import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';
import { LocationsService } from 'src/app/services/locations.service';
import { HealthPlanService } from 'src/app/services/health-plan.service';

export interface HealthInt {
  id: string;
  description: string;
}

@Component({
  selector: 'app-exam-health-plan-component',
  templateUrl: './exam-health-plan.component.html'
})
export class ExamHealthPlansComponent implements OnInit, OnDestroy {

  @Output() healthPlanSelected = new EventEmitter();

  @Input() healthPlan: HealthInt;

  @Input() provider: any;

  //
  public description: string = '';

  //
  public recentlyUsedHealthPlans: HealthInt[];

  public filteredHealthPlans: HealthInt[];

  public noResults = false;

  constructor(private healthPlanService: HealthPlanService) { }

  public getRecentUsedHealthPlans() {
    this.recentlyUsedHealthPlans = [
      { id: '1', description: 'Hospital Dona Helena' }
    ];
  }

  public createHealthPlan(description: string = this.description || '') {
    const healthPlan = { description };
    this.healthPlanService.createHealthPlan(healthPlan, this.provider.id)
      .subscribe((response: any) => {
        this.findHealthPlans();
        if (response.data && response.data.healthPlans) {
          const healthPlans = response.data.healthPlans;
          if (healthPlans.length === 0) {
            this.filteredHealthPlans = [];
            this.noResults = true;
          } else {
            this.filteredHealthPlans = response.data.healthPlans;
            this.noResults = false;
          }
        }
      });
  }

  public findHealthPlans(description: string = this.description || '') {
    const fields = ['id', 'description'];
    this.healthPlanService.findHealthPlans(description, this.provider.id, fields)
      .subscribe((response: any) => {
        if (response.data && response.data.healthPlans) {
          const healthPlans = response.data.healthPlans;
          if (healthPlans.length === 0) {
            this.filteredHealthPlans = [];
            this.noResults = true;
          } else {
            this.filteredHealthPlans = response.data.healthPlans;
            this.noResults = false;
          }
        }
      });
  }

  public select(healthPlan: HealthInt) {
    this.healthPlanSelected.emit(healthPlan);
  }

  // --------------------------------------------------------------------------
  // LIFE CYCLE STUFF
  // --------------------------------------------------------------------------
  public ngOnInit() {
    // Received a Location as Parameter.
    if (typeof this.healthPlan !== 'undefined' && this.healthPlan !== null) {
      this.findHealthPlans(this.description);
    }

    this.getRecentUsedHealthPlans();
  }

  ngOnDestroy() {
    this.description = '';
  }

}
