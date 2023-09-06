import { CustomerFeedbackInterface } from 'interfaces/customer-feedback';
import { FeedbackFormInterface } from 'interfaces/feedback-form';
import { GetQueryInterface } from 'interfaces';

export interface FeedbackOptionInterface {
  id?: string;
  feedback_form_id: string;
  option_text: string;
  created_at?: any;
  updated_at?: any;
  customer_feedback?: CustomerFeedbackInterface[];
  feedback_form?: FeedbackFormInterface;
  _count?: {
    customer_feedback?: number;
  };
}

export interface FeedbackOptionGetQueryInterface extends GetQueryInterface {
  id?: string;
  feedback_form_id?: string;
  option_text?: string;
}
