import { DataSource } from 'typeorm';
import { BikerTable, BikeTable } from './core/bikers/db';
import {
  BikeWorkshopTable as BikeWorkshopTable,
  ServiceRequestTable,
} from './core/bikeWorkshops/db';

export const db = new DataSource({
  type: 'sqlite',
  database: 'db.sql',
  entities: [BikeWorkshopTable, BikerTable, BikeTable, ServiceRequestTable],
  synchronize: true,
});

export async function initDb() {
  await db
    .initialize()
    .then(() => {
      console.log('DB has been initialized!');
    })
    .catch((err) => {
      console.error('Error during DB initialization', err);
    });
}
