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

// Exams Components
import { ExamCreateComponent } from './exams-create/exams-create.component';
// import { ExamListComponent } from './exams-list/exams-list.component';

@NgModule({
  declarations: [
    // ExamListComponent,
    ExamCreateComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,

    ButtonModule,
    CardModule,
    InputTextModule,
  ],
  exports: [
    // ExamListComponent,
    ExamCreateComponent
  ],
  providers: []
})
export class ExamModule { }
