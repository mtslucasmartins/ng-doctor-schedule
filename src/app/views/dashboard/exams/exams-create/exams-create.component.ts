import { Component, OnInit, OnDestroy } from '@angular/core';
import { User } from 'src/app/models/User';
import { UserService } from 'src/app/services/user.services';

@Component({
  selector: 'app-exams-create-component',
  templateUrl: './exams-create.component.html'
  // styleUrls: ['./exams-list.component.scss']
})
export class ExamCreateComponent implements OnInit, OnDestroy {

  public user: User;
  public image: string | ArrayBuffer;
  public defaultImage = 'assets/images/camera-placeholder.jpg';
  // 'https://s3.amazonaws.com/cdn.leiturinha.com.br/blog/uploads/2018/09/livro-imagem.jpg';


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

  ngOnInit() {
    this.user = new User({ id: 1, email: 'sit.amet@dolorelitpellentesque.co.uk', fullname: 'Karina O. Maddox' });
  }

  ngOnDestroy() { }

}
