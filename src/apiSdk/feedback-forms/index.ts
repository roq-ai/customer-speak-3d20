import axios from 'axios';
import queryString from 'query-string';
import { FeedbackFormInterface, FeedbackFormGetQueryInterface } from 'interfaces/feedback-form';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFeedbackForms = async (
  query?: FeedbackFormGetQueryInterface,
): Promise<PaginatedInterface<FeedbackFormInterface>> => {
  const response = await axios.get('/api/feedback-forms', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFeedbackForm = async (feedbackForm: FeedbackFormInterface) => {
  const response = await axios.post('/api/feedback-forms', feedbackForm);
  return response.data;
};

export const updateFeedbackFormById = async (id: string, feedbackForm: FeedbackFormInterface) => {
  const response = await axios.put(`/api/feedback-forms/${id}`, feedbackForm);
  return response.data;
};

export const getFeedbackFormById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/feedback-forms/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFeedbackFormById = async (id: string) => {
  const response = await axios.delete(`/api/feedback-forms/${id}`);
  return response.data;
};
