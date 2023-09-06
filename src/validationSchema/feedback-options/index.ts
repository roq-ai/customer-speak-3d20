import * as yup from 'yup';

export const feedbackOptionValidationSchema = yup.object().shape({
  option_text: yup.string().required(),
  feedback_form_id: yup.string().nullable().required(),
});
