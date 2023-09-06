import axios from 'axios';
import queryString from 'query-string';
import { FeedbackOptionInterface, FeedbackOptionGetQueryInterface } from 'interfaces/feedback-option';
import { GetQueryInterface, PaginatedInterface } from '../../interfaces';

export const getFeedbackOptions = async (
  query?: FeedbackOptionGetQueryInterface,
): Promise<PaginatedInterface<FeedbackOptionInterface>> => {
  const response = await axios.get('/api/feedback-options', {
    params: query,
    headers: { 'Content-Type': 'application/json' },
  });
  return response.data;
};

export const createFeedbackOption = async (feedbackOption: FeedbackOptionInterface) => {
  const response = await axios.post('/api/feedback-options', feedbackOption);
  return response.data;
};

export const updateFeedbackOptionById = async (id: string, feedbackOption: FeedbackOptionInterface) => {
  const response = await axios.put(`/api/feedback-options/${id}`, feedbackOption);
  return response.data;
};

export const getFeedbackOptionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/feedback-options/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteFeedbackOptionById = async (id: string) => {
  const response = await axios.delete(`/api/feedback-options/${id}`);
  return response.data;
};
