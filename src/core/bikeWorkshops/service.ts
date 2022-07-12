import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { v4 } from 'uuid';
import { ValidationError } from '../common/errors';
import {
  BikeWorkshopTable as BikeWorkshopTable,
  ServiceRequestTable,
} from './db';
import { NewServiceRequestDto, ServiceRequestDto } from './dtos';
import { BikeWorkshop, ServiceRequest } from './model';

@Injectable()
export class BikeWorkshopService {
  async createBikeWorkshop(name: string): Promise<void> {
    const newWorkshop = new BikeWorkshop(v4(), name);

    const repo = db.getRepository<BikeWorkshop>(BikeWorkshopTable);
    try {
      await repo.insert(newWorkshop);
    } catch (error) {
      throw new ValidationError(
        'Bike workshop with name ' + name + ' already exists',
      );
    }
  }

  async getBikeWorkshops(): Promise<BikeWorkshop[]> {
    const repo = db.getRepository<BikeWorkshop>(BikeWorkshopTable);
    return repo.find({ order: { name: 'asc' } });
  }
}

@Injectable()
export class ServiceRequestService {
  async registerNewServiceRequest(
    requestData: NewServiceRequestDto,
  ): Promise<string> {
    const newRequest = ServiceRequest.new(requestData);

    const repo = db.getRepository<ServiceRequest>(ServiceRequestTable);
    await repo.insert(newRequest);

    return newRequest.pk;
  }

  async getWorkshopServiceRequests(
    workshop_pk: string,
  ): Promise<ServiceRequestDto[]> {
    const repo = db.getRepository<ServiceRequest>(ServiceRequestTable);
    const serviceRequests = await repo.find({
      where: { workshop_pk: workshop_pk },
    });
    serviceRequests.sort(ServiceRequest.sortFn);
    return serviceRequests.map((s) => ({
      pk: s.pk,
      bike_pk: s.bike_pk,
      workshop_pk: s.workshop_pk,
      status: s.status,
      created_at: s.created_at,
      last_update_at: s.last_update_at,
    }));
  }
}
