import * as yup from 'yup';

export const feedbackFormValidationSchema = yup.object().shape({
  business_id: yup.string().nullable().required(),
});
