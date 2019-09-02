import { Component, OnInit } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';
import { ExamService } from 'src/app/services/exam.service';
import { DateUtils } from 'src/app/utils/Date.utils';
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

  public exams: Array<User>;

  begin = new Date();
  end = new Date();

  provider: any = {
    value: {},
    autocomplete: new Array()
  }
  examType: any = {
    value: {},
    autocomplete: new Array()
  }

  constructor(private examService: ExamService, private providerService: ProviderService, private examTypeService: ExamTypeService) { }

  public getAllExams() {

    this.examService.findExams(JSON.stringify(this.begin), JSON.stringify(this.end)).subscribe((response: any) => {
      if (response.data && response.data.exams) {
        this.exams = response.data.exams;

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

  public findProvider(input) {

    this.providerService.findProviders(input.query, ['id', 'description']).subscribe((response: any) => {
      if (response.data && response.data.providers) {
        const providers = response.data.providers;
        if (providers.length === 0) {
          this.provider.autocomplete = [];
        } else {
          this.provider.autocomplete = providers;
        }
      }
    });
  }

  public findExamType(input) {

    this.examTypeService.findExamTypes(input.query, ['id', 'description']).subscribe((response: any) => {
      if (response.data && response.data.examType) {
        const examType = response.data.examType;
        if (examType.length === 0) {
          this.examType.autocomplete = [];
        } else {
          this.examType.autocomplete = examType;
        }
      }
    });
  }

  // Define o dia de hoje no Input do filtro
  setDateToday() {
    const date = new Date();
    this.setDates(
      date, date
    );
  }

  // Define as datas da semana atual (Sabado até Domingo) no Input do filtro
  setDateThisWeek() {
    this.setDates(
      DateUtils.getWeekDay(0), DateUtils.getWeekDay(6)
    );
  }

  // Define as datas do mês atual (Primeiro até o último dia) no Input do filtro
  setDateThisMonth() {
    this.setDates(
      DateUtils.getMonthFirstDay(false),
      DateUtils.getMonthLastDay(false)
    );
  }

  // Define as datas do mês anterior (Primeiro até o último dia) no Input do filtro
  setDateLastMonth() {
    this.setDates(
      DateUtils.getMonthFirstDay(true),
      DateUtils.getMonthLastDay(true)
    );
  }

  // Define as datas nos Inputs do filtro e pega as Serviços e Departamentos baseados na data selecionada
  private setDates(begin: Date, end: Date) {
    this.begin = begin;
    this.end = end;
    this.getAllExams();
  }

  ngOnInit() {
    this.setDateThisWeek();
    this.getAllExams();
  }

}
