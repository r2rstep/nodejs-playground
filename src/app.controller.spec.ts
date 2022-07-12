import { Test, TestingModule } from '@nestjs/testing';
import { BikeWorkshopsController } from './api/bikeWorkshops';
import { BikeWorkshopService } from './core/bikeWorkshops/service';

describe('AppController', () => {
  let appController: BikeWorkshopsController;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [BikeWorkshopsController],
      providers: [BikeWorkshopService],
    }).compile();

    appController = app.get<BikeWorkshopsController>(BikeWorkshopsController);
  });

  describe('root', () => {
    it('should return "Hello World!"', () => {
      expect(appController.getHello()).toBe('Hello World!');
    });
  });
});
