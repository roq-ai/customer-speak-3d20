import { DashboardInterface } from 'interfaces/dashboard';
import { FeedbackFormInterface } from 'interfaces/feedback-form';
import { UserInterface } from 'interfaces/user';
import { GetQueryInterface } from 'interfaces';

export interface BusinessInterface {
  id?: string;
  description?: string;
  name: string;
  created_at?: any;
  updated_at?: any;
  user_id: string;
  tenant_id: string;
  dashboard?: DashboardInterface[];
  feedback_form?: FeedbackFormInterface[];
  user?: UserInterface;
  _count?: {
    dashboard?: number;
    feedback_form?: number;
  };
}

export interface BusinessGetQueryInterface extends GetQueryInterface {
  id?: string;
  description?: string;
  name?: string;
  user_id?: string;
  tenant_id?: string;
}
