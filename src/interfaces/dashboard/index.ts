import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface DashboardInterface {
  id?: string;
  business_id: string;
  total_feedbacks?: number;
  positive_feedbacks?: number;
  negative_feedbacks?: number;
  neutral_feedbacks?: number;
  created_at?: any;
  updated_at?: any;

  business?: BusinessInterface;
  _count?: {};
}

export interface DashboardGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
}
