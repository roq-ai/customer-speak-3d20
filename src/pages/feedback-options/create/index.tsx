import {
  FormControl,
  FormLabel,
  Input,
  Button,
  Text,
  Box,
  Spinner,
  FormErrorMessage,
  Switch,
  Flex,
} from '@chakra-ui/react';
import Breadcrumbs from 'components/breadcrumb';
import DatePicker from 'components/date-picker';
import { Error } from 'components/error';
import { FormWrapper } from 'components/form-wrapper';
import { NumberInput } from 'components/number-input';
import { SelectInput } from 'components/select-input';
import { AsyncSelect } from 'components/async-select';
import { TextInput } from 'components/text-input';
import AppLayout from 'layout/app-layout';
import { FormikHelpers, useFormik } from 'formik';
import { useRouter } from 'next/router';
import { FunctionComponent, useState } from 'react';
import * as yup from 'yup';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';

import { createFeedbackOption } from 'apiSdk/feedback-options';
import { feedbackOptionValidationSchema } from 'validationSchema/feedback-options';
import { FeedbackFormInterface } from 'interfaces/feedback-form';
import { getFeedbackForms } from 'apiSdk/feedback-forms';
import { FeedbackOptionInterface } from 'interfaces/feedback-option';

function FeedbackOptionCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: FeedbackOptionInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createFeedbackOption(values);
      resetForm();
      router.push('/feedback-options');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<FeedbackOptionInterface>({
    initialValues: {
      option_text: '',
      feedback_form_id: (router.query.feedback_form_id as string) ?? null,
    },
    validationSchema: feedbackOptionValidationSchema,
    onSubmit: handleSubmit,
    enableReinitialize: true,
    validateOnChange: false,
    validateOnBlur: false,
  });

  return (
    <AppLayout
      breadcrumbs={
        <Breadcrumbs
          items={[
            {
              label: 'Feedback Options',
              link: '/feedback-options',
            },
            {
              label: 'Create Feedback Option',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Feedback Option
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.option_text}
            label={'Option Text'}
            props={{
              name: 'option_text',
              placeholder: 'Option Text',
              value: formik.values?.option_text,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<FeedbackFormInterface>
            formik={formik}
            name={'feedback_form_id'}
            label={'Select Feedback Form'}
            placeholder={'Select Feedback Form'}
            fetcher={getFeedbackForms}
            labelField={'id'}
          />
          <Flex justifyContent={'flex-start'}>
            <Button
              isDisabled={formik?.isSubmitting}
              bg="state.info.main"
              color="base.100"
              type="submit"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              _hover={{
                bg: 'state.info.main',
                color: 'base.100',
              }}
            >
              Submit
            </Button>
            <Button
              bg="neutral.transparent"
              color="neutral.main"
              type="button"
              display="flex"
              height="2.5rem"
              padding="0rem 1rem"
              justifyContent="center"
              alignItems="center"
              gap="0.5rem"
              mr="4"
              onClick={() => router.push('/feedback-options')}
              _hover={{
                bg: 'neutral.transparent',
                color: 'neutral.main',
              }}
            >
              Cancel
            </Button>
          </Flex>
        </FormWrapper>
      </Box>
    </AppLayout>
  );
}

export default compose(
  requireNextAuth({
    redirectTo: '/',
  }),
  withAuthorization({
    service: AccessServiceEnum.PROJECT,
    entity: 'feedback_option',
    operation: AccessOperationEnum.CREATE,
  }),
)(FeedbackOptionCreatePage);
