import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';

@Component({
  selector: 'app-exam-details-create-component',
  templateUrl: './exam-details.component.html'
})
export class ExamDetailsComponent implements OnInit, OnDestroy {

  date = new Date();
  pt: any;
  @Output() saveExam = new EventEmitter();

  public image: string | ArrayBuffer;
  private file: File;
  public defaultImage = 'assets/images/camera-placeholder.jpg';

  constructor(private examService: ExamService) { }

  public readURL(event: any): void {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      this.file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.image = reader.result || that.defaultImage;

      reader.readAsDataURL(this.file);
    }
  }

  save() {
    this.examService.upload(this.file).subscribe((response: any) => {
      if (response.status === 'success') {
        let message = `https://s4.ottimizzacontabil.com:55325/storage/${response.record.id}/download`;
        this.file = null;
        this.image = null;
        this.saveExam.emit(message);
      }
    })
  }

  // --------------------------------------------------------------------------
  // LIFE CYCLE STUFF
  // --------------------------------------------------------------------------
  public ngOnInit() {
    this.pt = {
      firstDayOfWeek: 1,
      dayNames: ["domingo", "segunda", "terça", "quarta", "quinta", "sexta", "sábado"],
      dayNamesShort: ["dom", "seg", "ter", "qua", "qui", "sex", "sab"],
      dayNamesMin: ["D", "S", "T", "Q", "Q", "S", "S"],
      monthNames: ["Janeiro", "Fevereiro", "Março", "Abril", "Maio", "Junho", "Julho", "Agosto", "Setembro", "Outubro", "Novembro", "Dezembro"],
      monthNamesShort: ["jan", "fev", "mar", "abr", "mai", "jun", "jul", "ago", "set", "out", "nov", "dez"],
      today: 'Hoje',
      clear: 'Excluir'
    }
  }

  ngOnDestroy() { }

}
