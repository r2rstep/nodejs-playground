import { EntitySchema } from 'typeorm';
import { BikeWorkshop, ServiceRequest } from 'src/core/bikeWorkshops/model';

export const BikeWorkshopTable = new EntitySchema<BikeWorkshop>({
  name: BikeWorkshop.name,
  tableName: BikeWorkshop.name,
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

export const ServiceRequestTable = new EntitySchema<ServiceRequest>({
  name: ServiceRequest.name,
  tableName: ServiceRequest.name,
  columns: {
    pk: {
      type: String,
      primary: true,
    },
    workshop_pk: {
      type: String,
    },
    bike_pk: {
      type: String,
    },
    request_description: {
      type: String,
    },
    status: {
      type: String,
    },
    history: {
      type: 'simple-json',
    },
  },
});
