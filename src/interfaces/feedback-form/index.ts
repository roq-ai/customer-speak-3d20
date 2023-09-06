import { FeedbackOptionInterface } from 'interfaces/feedback-option';
import { BusinessInterface } from 'interfaces/business';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackFormInterface {
  id?: string;
  business_id: string;
  created_at?: any;
  updated_at?: any;
  feedback_option?: FeedbackOptionInterface[];
  business?: BusinessInterface;
  _count?: {
    feedback_option?: number;
  };
}

export interface FeedbackFormGetQueryInterface extends GetQueryInterface {
  id?: string;
  business_id?: string;
}
