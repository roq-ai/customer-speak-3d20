import { FeedbackOptionInterface } from 'interfaces/feedback-option';
import { GetQueryInterface } from 'interfaces';

export interface CustomerFeedbackInterface {
  id?: string;
  feedback_option_id: string;
  customer_name?: string;
  customer_number?: string;
  created_at?: any;
  updated_at?: any;

  feedback_option?: FeedbackOptionInterface;
  _count?: {};
}

export interface CustomerFeedbackGetQueryInterface extends GetQueryInterface {
  id?: string;
  feedback_option_id?: string;
  customer_name?: string;
  customer_number?: string;
}
