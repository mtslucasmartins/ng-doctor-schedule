export class Clinica {

  id: number;
  cnpj: string;
  description: string;

  constructor(builder: any) {
    this.id = builder.id;
    this.cnpj = builder.cnpj;
    this.description = builder.description;
  }

}