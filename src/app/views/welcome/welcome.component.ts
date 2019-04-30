import { Component } from '@angular/core';

@Component({
  selector: 'app-welcome-component',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.scss']
})
export class WelcomeComponent {

  public image: string | ArrayBuffer;
  public defaultImage = 'assets/images/camera-placeholder.jpg';
  // 'https://s3.amazonaws.com/cdn.leiturinha.com.br/blog/uploads/2018/09/livro-imagem.jpg';

  public readURL(event: any): void {
    const that = this;
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];

      const reader = new FileReader();
      reader.onload = e => this.image = reader.result || that.defaultImage;

      reader.readAsDataURL(file);
    }
  }
}
