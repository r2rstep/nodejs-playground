import { Injectable } from '@nestjs/common';
import { db } from 'src/db';
import { ValidationError } from '../common/errors';
import { BikerTable, BikeTable } from './db';
import { BikeDto } from './dtos';
import { Bike, Biker } from './model';

@Injectable()
export class BikerService {
  async registerNewBiker(name: string): Promise<string> {
    const newBiker = Biker.new(name);

    const repo = db.getRepository<Biker>(BikerTable);
    try {
      await repo.insert(newBiker);
    } catch (error) {
      throw new ValidationError('Biker with name ' + name + ' already exists');
    }
    return newBiker.pk;
  }

  async addNewBike(newBikeData: BikeDto): Promise<void> {
    const newBike = Bike.new(newBikeData);

    const repo = db.getRepository<Bike>(BikeTable);
    try {
      await repo.insert(newBike);
    } catch (error) {
      throw new ValidationError(
        'You already have a bike with name ' + newBikeData.name,
      );
    }
  }

  async getBikerBikes(bikerPk: string): Promise<BikeDto[]> {
    const repo = db.getRepository<Bike>(BikeTable);
    return await repo.find({
      where: { biker_pk: bikerPk },
      order: { name: 'asc' },
    });
  }
}
