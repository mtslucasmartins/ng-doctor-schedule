import { Clinic } from './Clinic';

export class User {

  id: number;
  email: string;
  fullname: string;
  username: string;
  password: string;
  clinic: Clinic;

  constructor(builder: any) {
    this.id = builder.id;
    this.email = builder.email;
    this.fullname = builder.fullname;
    this.username = builder.username;
    this.password = builder.password;
    this.clinic = builder.clinic ? new Clinic(builder.clinic) : null;
  }

}
