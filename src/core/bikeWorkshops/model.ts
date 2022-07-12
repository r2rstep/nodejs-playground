import { v4 } from 'uuid';
import { NewServiceRequestDto } from './dtos';

export class BikeWorkshop {
  pk: string;
  name: string;

  constructor(pk: string, name: string) {
    this.pk = pk;
    this.name = name;
  }
}

export enum ServiceRequestStatus {
  empty = '',
  received = 'received',
  confirmed = 'confirmed',
  bikeReceivedInWorkshop = 'bikeReceivedInWorkshop',
  serviceInProgress = 'serviceInProgress',
  blocked = 'blocked',
  done = 'done',
}

export interface ServiceHistoryEntry {
  occured_at: Date;
  from: ServiceRequestStatus;
  to: ServiceRequestStatus;
}

export class ServiceRequest {
  pk: string;
  bike_pk: string;
  workshop_pk: string;
  request_description: string;
  status: ServiceRequestStatus;
  history: ServiceHistoryEntry[];

  private constructor(
    pk: string,
    bike_pk: string,
    workshop_pk: string,
    request_description: string,
    status: ServiceRequestStatus,
    history?: ServiceHistoryEntry[],
  ) {
    this.pk = pk;
    this.bike_pk = bike_pk;
    this.workshop_pk = workshop_pk;
    this.request_description = request_description;
    this.status = status;
    this.history = history || [];
  }

  public get created_at(): Date {
    return this.history[0].occured_at;
  }

  public get last_update_at(): Date {
    return this.history[this.history.length - 1].occured_at;
  }

  static new(
    workshopPk: string,
    requestData: NewServiceRequestDto,
  ): ServiceRequest {
    const status = ServiceRequestStatus.received;
    const newRequest = new ServiceRequest(
      v4(),
      requestData.bike_pk,
      workshopPk,
      requestData.description,
      ServiceRequestStatus.empty,
    );
    newRequest.changeStatus(status);
    return newRequest;
  }

  changeStatus(newStatus: ServiceRequestStatus): void {
    this.addHistoryEntry(this.status, newStatus);
    this.status = newStatus;
  }

  private addHistoryEntry(
    from: ServiceRequestStatus,
    to: ServiceRequestStatus,
  ): void {
    this.history.push({
      occured_at: new Date(),
      from: from,
      to: to,
    });
  }

  static sortFn(a: ServiceRequest, b: ServiceRequest): number {
    if (a.created_at < b.created_at) return -1;
    else if (a.created_at > b.created_at) return 1;
    else return 0;
  }
}
