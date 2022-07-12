import { Body, Controller, Post } from '@nestjs/common';
import {
  ApiOperation,
  ApiProperty,
  ApiPropertyOptional,
} from '@nestjs/swagger';
import { BikerService } from 'src/core/bikers/service';

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
}

@Controller('bikers')
export class BikersController {
  constructor(private readonly bikerService: BikerService) {}

  @ApiOperation({ summary: 'Register a new biker ' })
  @Post()
  async registerNewBiker(@Body() req: RegisterBikerReq): Promise<string> {
    return await this.bikerService.registerNewBiker(req.name);
  }

  @ApiOperation({ summary: "Add a new bike to biker's collection" })
  @Post('me/bikes')
  // eslint-disable-next-line @typescript-eslint/no-empty-function
  async addNewBike(@Body() req: AddNewBikeReq): Promise<void> {
    await this.bikerService.addNewBike(req);
  }
}
