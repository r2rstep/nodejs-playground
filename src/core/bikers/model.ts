import { BikeDto } from './dtos';
import { v4 } from 'uuid';

export class Biker {
  pk: string;
  name: string;

  private constructor(pk: string, name: string) {
    this.pk = pk;
    this.name = name;
  }

  static new(name: string): Biker {
    return new Biker(v4(), name);
  }
}

export class Bike {
  pk: string;
  biker_pk: string;
  name: string;
  brand: string;
  model?: string;

  private constructor(
    biker_pk: string,
    name: string,
    brand: string,
    model?: string,
  ) {
    this.pk = v4();
    this.biker_pk = biker_pk;
    this.name = name;
    this.brand = brand;
    this.model = model || '';
  }

  static new(data: BikeDto): Bike {
    return new Bike(data.biker_pk, data.name, data.brand, data.model);
  }
}
