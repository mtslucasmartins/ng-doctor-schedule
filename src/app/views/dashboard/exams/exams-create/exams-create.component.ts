import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-exams-create-component',
  templateUrl: './exams-create.component.html'
  // styleUrls: ['./exams-list.component.scss']
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

  public user: User;

  public location: any;
  public examType: any;
  public provider: any;


  constructor(private userService: UserService) { }


  public onLocationSelected(location: any) {
    this.location = location;
    localStorage.setItem('location', JSON.stringify(location));
    this.nextStep();
  }
  public onExamTypeSelected(examType: any) {
    this.examType = examType;
    localStorage.setItem('examType', JSON.stringify(examType));
    this.nextStep();
  }
  public onProviderSelected(provider: any) {
    this.provider = provider;
    localStorage.setItem('provider', JSON.stringify(provider));
    this.nextStep();
  }


  public previousStep() {
    this.currentStep = this.currentStep - 1;
  }

  public nextStep() {
    this.currentStep = this.currentStep + 1;
  }

  ngOnInit() {
    this.user = new User({ id: 1, email: 'sit.amet@dolorelitpellentesque.co.uk', fullname: 'Karina O. Maddox' });

    this.location = JSON.parse(localStorage.getItem('location') || '{}');
    this.examType = JSON.parse(localStorage.getItem('examType') || '{}');
    this.provider = JSON.parse(localStorage.getItem('provider') || '{}');

  }

  ngOnDestroy() { }

}
