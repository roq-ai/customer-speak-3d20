import * as yup from 'yup';

export const customerFeedbackValidationSchema = yup.object().shape({
  customer_name: yup.string().nullable(),
  customer_number: yup.string().nullable(),
  feedback_option_id: yup.string().nullable().required(),
});
