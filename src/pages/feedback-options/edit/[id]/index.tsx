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
  Center,
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
import { FunctionComponent, useState, useRef } from 'react';
import * as yup from 'yup';
import useSWR from 'swr';
import { AccessOperationEnum, AccessServiceEnum, requireNextAuth, withAuthorization } from '@roq/nextjs';
import { compose } from 'lib/compose';
import { ImagePicker } from 'components/image-file-picker';
import { getFeedbackOptionById, updateFeedbackOptionById } from 'apiSdk/feedback-options';
import { feedbackOptionValidationSchema } from 'validationSchema/feedback-options';
import { FeedbackOptionInterface } from 'interfaces/feedback-option';
import { FeedbackFormInterface } from 'interfaces/feedback-form';
import { getFeedbackForms } from 'apiSdk/feedback-forms';

function FeedbackOptionEditPage() {
  const router = useRouter();
  const id = router.query.id as string;

  const { data, error, isLoading, mutate } = useSWR<FeedbackOptionInterface>(
    () => (id ? `/feedback-options/${id}` : null),
    () => getFeedbackOptionById(id),
  );
  const [formError, setFormError] = useState(null);

  const handleSubmit = async (values: FeedbackOptionInterface, { resetForm }: FormikHelpers<any>) => {
    setFormError(null);
    try {
      const updated = await updateFeedbackOptionById(id, values);
      mutate(updated);
      resetForm();
      router.push('/feedback-options');
    } catch (error: any) {
      if (error?.response.status === 403) {
        setFormError({ message: "You don't have permisisons to update this resource" });
      } else {
        setFormError(error);
      }
    }
  };

  const formik = useFormik<FeedbackOptionInterface>({
    initialValues: data,
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
              label: 'Update Feedback Option',
              isCurrent: true,
            },
          ]}
        />
      }
    >
      <Box rounded="md">
        <Box mb={4}>
          <Text as="h1" fontSize={{ base: '1.5rem', md: '1.875rem' }} fontWeight="bold" color="base.content">
            Update Feedback Option
          </Text>
        </Box>
        {(error || formError) && (
          <Box mb={4}>
            <Error error={error || formError} />
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
    operation: AccessOperationEnum.UPDATE,
  }),
)(FeedbackOptionEditPage);
