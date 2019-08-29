import { Component, OnInit, OnDestroy, EventEmitter, Output, Input, OnChanges, SimpleChanges } from '@angular/core';
import { ExamTypeService } from 'src/app/services/exam-type.service';

export interface ExamTypeInt {
  id: string;
  description: string;
}

@Component({
  selector: 'app-exam-type-create-component',
  templateUrl: './exam-type.component.html',
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
export class ExamTypeComponent implements OnInit, OnDestroy {

  @Output() examTypeSelected = new EventEmitter();

  @Input() examType: ExamTypeInt;

  //
  public description: string = '';

  //
  public recentlyUsedTypes: ExamTypeInt[];

  public filteredTypes: ExamTypeInt[];

  public noResults = false;


  constructor(private examTypeService: ExamTypeService) { }

  public getRecentUsedTypes() {
    this.recentlyUsedTypes = [
      { id: '1', description: 'Hospital Dona Helena' }
    ];
  }

  public createExamType(description: string = this.description || '') {
    const examType = { description };
    this.examTypeService.createExamType(examType)
      .subscribe((response: any) => {
        this.findExamTypes();
        if (response.data && response.data.examTypes) {
          const examTypes = response.data.examTypes;
          if (examTypes.length === 0) {
            this.filteredTypes = [];
            this.noResults = true;
          } else {
            this.filteredTypes = examTypes;
            this.noResults = false;
          }
        }
      });
  }

  public findExamTypes(description: string = this.description || '') {
    const fields = ['id', 'description'];
    this.examTypeService.findExamTypes(description, fields)
      .subscribe((response: any) => {
        if (response.data && response.data.examTypes) {
          const examTypes = response.data.examTypes;
          if (examTypes.length === 0) {
            this.filteredTypes = [];
            this.noResults = true;
          } else {
            this.filteredTypes = response.data.examTypes;
            this.noResults = false;
          }
        }
      });
  }

  public select(examType: ExamTypeInt) {
    this.examTypeSelected.emit(examType);
  }


  // --------------------------------------------------------------------------
  // LIFE CYCLE STUFF
  // --------------------------------------------------------------------------
  public ngOnInit() {
    if (typeof this.examType !== 'undefined' && this.examType !== null) {
      this.findExamTypes(this.description);
    }
    this.getRecentUsedTypes();
  }
  
  ngOnDestroy() { 
    this.description = '';
  }

}
