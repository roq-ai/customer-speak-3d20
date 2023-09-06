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

import { createCustomerFeedback } from 'apiSdk/customer-feedbacks';
import { customerFeedbackValidationSchema } from 'validationSchema/customer-feedbacks';
import { FeedbackOptionInterface } from 'interfaces/feedback-option';
import { getFeedbackOptions } from 'apiSdk/feedback-options';
import { CustomerFeedbackInterface } from 'interfaces/customer-feedback';

function CustomerFeedbackCreatePage() {
  const router = useRouter();
  const [error, setError] = useState(null);

  const handleSubmit = async (values: CustomerFeedbackInterface, { resetForm }: FormikHelpers<any>) => {
    setError(null);
    try {
      await createCustomerFeedback(values);
      resetForm();
      router.push('/customer-feedbacks');
    } catch (error) {
      setError(error);
    }
  };

  const formik = useFormik<CustomerFeedbackInterface>({
    initialValues: {
      customer_name: '',
      customer_number: '',
      feedback_option_id: (router.query.feedback_option_id as string) ?? null,
    },
    validationSchema: customerFeedbackValidationSchema,
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
              label: 'Customer Feedbacks',
              link: '/customer-feedbacks',
            },
            {
              label: 'Create Customer Feedback',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Create Customer Feedback
          </Text>
        </Box>
        {error && (
          <Box mb={4}>
            <Error error={error} />
          </Box>
        )}
        <FormWrapper onSubmit={formik.handleSubmit}>
          <TextInput
            error={formik.errors.customer_name}
            label={'Customer Name'}
            props={{
              name: 'customer_name',
              placeholder: 'Customer Name',
              value: formik.values?.customer_name,
              onChange: formik.handleChange,
            }}
          />

          <TextInput
            error={formik.errors.customer_number}
            label={'Customer Number'}
            props={{
              name: 'customer_number',
              placeholder: 'Customer Number',
              value: formik.values?.customer_number,
              onChange: formik.handleChange,
            }}
          />

          <AsyncSelect<FeedbackOptionInterface>
            formik={formik}
            name={'feedback_option_id'}
            label={'Select Feedback Option'}
            placeholder={'Select Feedback Option'}
            fetcher={getFeedbackOptions}
            labelField={'option_text'}
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
              onClick={() => router.push('/customer-feedbacks')}
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
    entity: 'customer_feedback',
    operation: AccessOperationEnum.CREATE,
  }),
)(CustomerFeedbackCreatePage);
