import { Module } from '@nestjs/common';
import { BikersController } from './api/bikers';
import { BikeWorkshopsController } from './api/bikeWorkshops';
import { BikerService } from './core/bikers/service';
import {
  BikeWorkshopService,
  ServiceRequestService,
} from './core/bikeWorkshops/service';

@Module({
  imports: [],
  controllers: [BikeWorkshopsController, BikersController],
  providers: [BikeWorkshopService, BikerService, ServiceRequestService],
})
export class AppModule {}
