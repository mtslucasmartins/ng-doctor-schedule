import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

// Prime NG Components.
import { CardModule } from 'primeng/card';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CalendarModule } from 'primeng/calendar';

// Exams Components
import { ExamCreateComponent } from './exams-create/exams-create.component';
import { ExamLocationComponent } from './exam-location/exam-location.component';
import { ExamTypeComponent } from './exam-type/exam-type.component';
import { ExamProviderComponent } from './exam-provider/exam-provider.component';
import { ExamDetailsComponent } from './exam-details/exam-details.component';

import { TabMenuModule } from 'primeng/tabmenu';
import { ExamHealthPlansComponent } from './exam-health-plan/exam-health-plan.component';
import { ExamsListComponent } from './exams-list/exams-list.component';
import { AutoCompleteModule } from 'primeng/autocomplete';
import { InputMaskModule } from 'primeng/inputmask';
import {SpinnerModule} from 'primeng/spinner';

@NgModule({
  declarations: [
    ExamCreateComponent,
    // for creation
    ExamLocationComponent,
    ExamProviderComponent,
    ExamDetailsComponent,
    ExamTypeComponent,
    ExamHealthPlansComponent,
    ExamsListComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ButtonModule,
    CalendarModule,
    CardModule,
    InputTextModule,
    TabMenuModule,
    AutoCompleteModule,
    InputMaskModule,
    SpinnerModule
  ],
  exports: [
    ExamCreateComponent,
    ExamLocationComponent,
    ExamProviderComponent,
    ExamDetailsComponent,
    ExamTypeComponent,
    ExamHealthPlansComponent
  ],
  providers: []
})
export class ExamModule { }
