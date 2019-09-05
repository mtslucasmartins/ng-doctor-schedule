import { Component, OnInit } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { ProviderService } from 'src/app/services/provider.service';
import { ExamTypeService } from 'src/app/services/exam-type.service';

@Component({
  selector: 'app-exams-list',
  templateUrl: './exams-list.component.html'
})
export class ExamsListComponent implements OnInit {

  public pageSize = 10;
  public pageIndex = 0;

  public tableItensLabel: string;

  public pendingExams: Array<any>;

  dataAtendimento = new Date();

  cost: string = '0.00';

  constructor(private examService: ExamService, private providerService: ProviderService, private examTypeService: ExamTypeService) { }

  public getAllExams() {

    this.examService.findPendingExams().subscribe((response: any) => {
      if (response.data && response.data.pendingExams) {
        this.pendingExams = response.data.pendingExams;

        let start = (this.pageIndex) * this.pageSize + 1;
        let end = +response.length;

        if (this.pageSize < response.length) {
          end = this.pageSize * (this.pageIndex + 1);
          if (end > response.count) {
            end = response.count;
          }
        }

        // e.g. "21-30 of 193 items"
        this.tableItensLabel = start + ' a ' + end + ' de ' + response.length;
      }
    });
  }

  ngOnInit() {
    this.getAllExams();
  }

}
