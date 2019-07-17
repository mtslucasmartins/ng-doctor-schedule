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
  public image: string | ArrayBuffer;
  public defaultImage = 'assets/images/camera-placeholder.jpg';

  public location: any;
  public examType: any;
  public provider: any;


  constructor(private userService: UserService) { }

  public readURL(event: any): void {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.image = reader.result || that.defaultImage;

      reader.readAsDataURL(file);
    }
  }

  public onLocationSelected(location: any) {
    this.location = location;
    this.nextStep();
  }
  public onExamTypeSelected(examType: any) {
    this.examType = examType;
    this.nextStep();
  }
  public onProviderSelected(provider: any) {
    this.provider = provider;
    this.nextStep();
  }


  public previousStep() {
    this.currentStep = this.currentStep - 1;
  }
  public nextStep() {
    this.currentStep = this.currentStep + 1;

    console.log(this.currentStep);
  }

  ngOnInit() {
    this.user = new User({ id: 1, email: 'sit.amet@dolorelitpellentesque.co.uk', fullname: 'Karina O. Maddox' });
  }

  ngOnDestroy() { }

}
