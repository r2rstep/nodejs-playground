import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import {
  ApiExtraModels,
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BikerService } from 'src/core/bikers/service';
import { ValuesApiOkResponse, ValuesResp } from './commons';

export class RegisterBikerReq {
  @ApiProperty()
  name: string;
}

export class AddNewBikeReq {
  @ApiProperty()
  biker_pk: string;
  @ApiProperty()
  brand: string;
  @ApiPropertyOptional()
  model?: string;
  @ApiProperty()
  name: string;

  constructor(biker_pk: string, brand: string, model: string, name: string) {
    this.biker_pk = biker_pk;
    this.brand = brand;
    this.model = model;
    this.name = name;
  }
}

export class Bike extends AddNewBikeReq {
  @ApiProperty()
  pk: string;
  @ApiProperty()
  biker_pk: string;
  @ApiProperty()
  brand: string;
  @ApiPropertyOptional()
  model?: string;
  @ApiProperty()
  name: string;

  constructor(
    pk: string,
    biker_pk: string,
    brand: string,
    model: string,
    name: string,
  ) {
    super(biker_pk, brand, model, name);
    this.pk = pk;
  }
}

const BikesResp = ValuesResp<Bike>;

@Controller('bikers')
@ApiExtraModels(ValuesResp)
@ApiExtraModels(Bike)
export class BikersController {
  constructor(private readonly bikerService: BikerService) {}

  @ApiOperation({ summary: 'Register a new biker ' })
  @Post()
  async registerNewBiker(@Body() req: RegisterBikerReq): Promise<string> {
    return await this.bikerService.registerNewBiker(req.name);
  }

  @ApiOperation({ summary: "Add a new bike to biker's collection" })
  @Post('me/bikes')
  async addNewBike(@Body() req: AddNewBikeReq): Promise<void> {
    await this.bikerService.addNewBike(req);
  }

  @ApiOperation({ summary: 'Get bikes of the biker' })
  @ValuesApiOkResponse(Bike)
  @Get('me/bikes')
  async getBikerBikes(
    @Param('biker_pk') bikerPk: string,
  ): Promise<ValuesResp<Bike>> {
    const bikes = await this.bikerService.getBikerBikes(bikerPk);
    return new ValuesResp<Bike>(
      bikes.map(
        (bike) =>
          new Bike(bike.pk, bike.biker_pk, bike.brand, bike.model, bike.name),
      ),
    );
  }
}
