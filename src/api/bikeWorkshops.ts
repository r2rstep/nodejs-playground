import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { ApiOkResponse, ApiOperation, ApiProperty } from '@nestjs/swagger';
import { ServiceRequestStatus } from 'src/core/bikeWorkshops/model';
import {
  BikeWorkshopService,
  ServiceRequestService,
} from 'src/core/bikeWorkshops/service';
import { ListedResp } from './commons';

export class CreateBikeWorkshopReq {
  @ApiProperty()
  name: string;
}

export class BikeWorkshop {
  @ApiProperty()
  pk: string;
  @ApiProperty()
  name: string;

  constructor(pk: string, name: string) {
    this.name = name;
    this.pk = pk;
  }
}

export class ServiceRequestReq {
  @ApiProperty()
  bike_pk: string;
  @ApiProperty()
  description: string;
}

export class ServiceRequest {
  @ApiProperty()
  pk: string;
  @ApiProperty()
  bike_pk: string;
  @ApiProperty()
  status: ServiceRequestStatus;
  @ApiProperty()
  created_at: Date;
  @ApiProperty()
  last_update_at: Date | null;

  constructor(
    pk: string,
    bike_pk: string,
    status: ServiceRequestStatus,
    created_at: Date,
    last_update_at: Date,
  ) {
    this.pk = pk;
    this.bike_pk = bike_pk;
    this.status = status;
    this.created_at = created_at;
    this.last_update_at = last_update_at;
  }
}

@Controller('bikeWorkshops')
export class BikeWorkshopsController {
  constructor(
    private readonly bikeWorkshopService: BikeWorkshopService,
    private readonly serviceRequestService: ServiceRequestService,
  ) {}

  @ApiOperation({ summary: 'Create new bike workshop ' })
  @Post()
  async createWorkshop(@Body() req: CreateBikeWorkshopReq): Promise<void> {
    await this.bikeWorkshopService.createBikeWorkshop(req.name);
  }

  @ApiOperation({ summary: 'Get bike workshop' })
  @ApiOkResponse({ type: ListedResp<BikeWorkshop> })
  @Get()
  async getWorkshops(): Promise<ListedResp<BikeWorkshop>> {
    const workshops = await await this.bikeWorkshopService.getBikeWorkshops();
    return new ListedResp<BikeWorkshop>(
      workshops.map((s) => new BikeWorkshop(s.pk, s.name)),
    );
  }

  @ApiOperation({
    summary: 'Register new bike service request in the workshop',
  })
  @Post(':workshopPk/serviceRequests')
  async registerNewServiceRequest(
    @Param('workshopPk') workshopPk: string,
    @Body() req: ServiceRequestReq,
  ): Promise<void> {
    await this.serviceRequestService.registerNewServiceRequest(workshopPk, req);
  }

  @ApiOperation({
    summary: "List workshop's service requests",
  })
  @Get(':workshop_pk/serviceRequests')
  @ApiOkResponse({ type: ListedResp<ServiceRequest> })
  async getServiceRequests(
    @Param('workshop_pk') workshop_pk: string,
  ): Promise<ListedResp<ServiceRequest>> {
    const servicesRequests =
      await this.serviceRequestService.getWorkshopServiceRequests(workshop_pk);
    return new ListedResp<ServiceRequest>(
      servicesRequests.map(
        (s) =>
          new ServiceRequest(
            s.pk,
            s.bike_pk,
            s.status,
            s.created_at,
            s.last_update_at,
          ),
      ),
    );
  }
}
