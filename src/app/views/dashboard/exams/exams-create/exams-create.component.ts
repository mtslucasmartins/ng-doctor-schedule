import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';
import { MenuItem } from 'primeng/components/common/menuitem';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exams-create-component',
  templateUrl: './exams-create.component.html',
  styles: [`
    .content-of-item:hover{
      cursor: pointer;
    }
    
    .item-selected{
      background-color: rgba(0,0,0,.2);
      box-shadow: 0 7px 7px 0 rgba(0,0,0,.15), 0 0 5px 0 rgba(0,0,0,.15);
    }
    
    .content-of-item {
      background-color: rgba(0,0,0,.02);
      border-radius: 4px;
      position: relative; 
      text-align: center;
      min-height: 4em;
      border: 1px rgba(23, 162, 184) solid;
    }

    .wrap-text {
      word-break: break-word; 
      white-space: initial;
    }

    .f-2em{
      font-size: 2em;
    }
  `],
  // styleUrls: ['./exams-list.component.scss']
  encapsulation: ViewEncapsulation.None
})
export class ExamCreateComponent implements OnInit, OnDestroy {

  public availableSteps: any = {
    0: 'EXAM_LOCATION',
    1: 'EXAM_TYPE',
    2: 'EXAM_PROVIDER',
    3: 'EXAM_PICTURE',
    4: 'EXAM_REVENUE'
  };

  public currentStep = 0;
  public lastStep = 0;

  public user: User;

  public location: any;
  public examType: any;
  public provider: any;
  public healthPlan: any;

  items: any[];

  description = '';

  constructor(private examService: ExamService) { }


  public onLocationSelected(location: any) {
    this.location = location;
    this.items[this.currentStep].label = `${location.description}`;
    this.nextStep();
  }
  public onExamTypeSelected(examType: any) {
    this.examType = examType;
    this.items[this.currentStep].label = `${examType.description}`;
    this.nextStep();
  }
  public onProviderSelected(provider: any) {
    this.provider = provider;
    this.items[this.currentStep].label = `${provider.description}`;
    this.nextStep();
  }
  public onHealthPlanSelected(healthPlan: any) {
    this.healthPlan = healthPlan;
    this.items[this.currentStep].label = `${healthPlan.description}`;
    this.nextStep();
  }


  public previousStep() {
    this.currentStep = this.currentStep - 1;
  }

  public nextStep() {
    this.currentStep = this.currentStep + 1;

    if (this.currentStep > this.lastStep) {
      this.lastStep = this.currentStep;
    }
  }

  save(fileUrl: string) {
    this.examService.createExam(fileUrl, this.examType.id, this.location.id, this.provider.id, this.healthPlan.id).subscribe((response: any) => {
    });
  }
  returnDateNow(){
    return new Date();
  }
  ngOnInit() {
    this.user = new User(JSON.parse(localStorage.getItem('user')));

    this.location = {};
    this.examType = {};
    this.provider = {};
    this.healthPlan = {};

    this.items = [
      { label: 'Local de Atendimento', icon: 'fas fa-map-marker-alt fa-fw', disabled: false },
      { label: 'Tipo de Atendimento', icon: 'fas fa-file-alt fa-fw', disabled: false },
      { label: 'Operadora', icon: 'fas fa-hand-holding-heart fa-fw', disabled: false },
      { label: 'Plano de Saude', icon: 'fas fa-heartbeat fa-fw', disabled: true }
    ];
  }

  disabledHealthPlan(i: number) {
    return (this.provider && this.provider.id && i == 3) || i != 3 ? this.currentStep = i : 0;
  }

  ngOnDestroy() { }

}
