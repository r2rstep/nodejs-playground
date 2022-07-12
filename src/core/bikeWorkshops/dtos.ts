import { ServiceHistoryEntry, ServiceRequestStatus } from './model';

export interface NewServiceRequestDto {
  bike_pk: string;
  workshop_pk: string;
  description: string;
}

export interface ServiceRequestDto {
  pk: string;
  bike_pk: string;
  workshop_pk: string;
  status: ServiceRequestStatus;
  created_at: Date;
  last_update_at: Date | null;
  description?: string;
  history?: ServiceHistoryEntry[];
}
