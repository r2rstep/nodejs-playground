import { EntitySchema } from 'typeorm';
import {
  Biker as BikerDomainModel,
  Bike as BikeDomainModel,
} from 'src/core/bikers/model';

export const BikerTable = new EntitySchema<BikerDomainModel>({
  name: BikerDomainModel.name,
  tableName: BikerDomainModel.name,
  columns: {
    pk: {
      type: String,
      primary: true,
    },
    name: {
      type: String,
    },
  },
});

export const BikeTable = new EntitySchema<BikeDomainModel>({
  name: BikeDomainModel.name,
  tableName: BikeDomainModel.name,
  columns: {
    pk: {
      type: String,
      primary: true,
    },
    biker_pk: {
      type: String,
      unique: true,
    },
    name: {
      type: String,
      unique: true,
    },
    brand: {
      type: String,
    },
    model: {
      type: String,
    },
  },
});
