import { Component, OnInit, OnDestroy, Output, EventEmitter, Input } from '@angular/core';
import { ExamService } from 'src/app/services/exam.service';
import { finalize } from 'rxjs/operators';

@Component({
  selector: 'app-exam-details-create-component',
  templateUrl: './exam-details.component.html',
  styles: [`
    .centralize-loading{
      position: absolute;
      left: 0;
      right: 0;
      display: flex;
      height: 100%;
      justify-content: center;
      align-items: center;
      overflow: hidden;
    }
  `]
})
export class ExamDetailsComponent implements OnInit, OnDestroy {

  date = new Date();
  pt: any;
  @Output() saveExam = new EventEmitter();

  public image: string | ArrayBuffer;
  private file: File;
  public defaultImage = 'assets/images/camera-placeholder.jpg';

  loadingImage: boolean = false;

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
    this.loadingImage = true;
    this.examService.compressionImage(this.file).pipe(
      finalize(() => {
        this.loadingImage = false;
      })
    ).subscribe((response: Blob) => {
      this.examService.upload(this.examService.blobToFile(response, this.file.name)).pipe(
        finalize(() => {
          this.loadingImage = false;
        })
      ).subscribe((response: any) => {
        if (response.status === 'success') {
          let message = `https://s4.ottimizzacontabil.com:55325/storage/${response.record.id}/download`;
          this.file = null;
          this.image = null;
          this.saveExam.emit(message);
        }
      })
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
