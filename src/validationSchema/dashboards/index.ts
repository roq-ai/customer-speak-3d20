import * as yup from 'yup';

export const dashboardValidationSchema = yup.object().shape({
  total_feedbacks: yup.number().integer().nullable(),
  positive_feedbacks: yup.number().integer().nullable(),
  negative_feedbacks: yup.number().integer().nullable(),
  neutral_feedbacks: yup.number().integer().nullable(),
  business_id: yup.string().nullable().required(),
});
