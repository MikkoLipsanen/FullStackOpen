import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import Text from './Text';
import useReview from '../hooks/useReview';

const styles = StyleSheet.create({
  flexContainer: {
    display: 'flex',
  },
  inputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    backgroundColor: theme.colors.white,
    gap: 10,
  },
  centeredContainer: {
    justifyContent: 'center'
  },
  input: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 3,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
  },
  error: {
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    backgroundColor: "white",
    borderRadius: 3,
    color: theme.colors.textPrimary,
    fontSize: theme.fontSizes.body,
    fontFamily: theme.fonts.main,
    fontWeight: theme.fontWeights.normal,
    borderColor: theme.colors.error
  },
  buttonStyle: {
    backgroundColor: theme.colors.primary,
    color: theme.colors.white,
    height: 50,
    margin: 12,
    borderWidth: 1,
    padding: 10,
    borderRadius: 3,
    justifyContent: 'center'
  },
});

const validationSchema = yup.object().shape({
    ownerName: yup
        .string()
        .required('Repository owner name is required'),
    repositoryName: yup
        .string()
        .required('Repository name is required'),
    rating: yup
        .number()
        .required('Rating is required'),
    review: yup
        .string()
})

export const ReviewContainer = ({ onSubmit }) => {
    const formik = useFormik({
        initialValues: {
            ownerName: '',
            repositoryName: '',
            rating: '',
            text: ''
        },
        validationSchema,
        onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Repository owner name"
          value={formik.values.ownerName}
          onChangeText={formik.handleChange('ownerName')}
          style={(formik.touched.ownerName && formik.errors.ownerName) ? styles.error : styles.input}
        />
        {formik.touched.ownerName && formik.errors.ownerName && (
          <Text margin='signin' color='error'>{formik.errors.ownerName}</Text>
        )}
        <TextInput
          placeholder="Repository name"
          value={formik.values.repositoryName}
          onChangeText={formik.handleChange('repositoryName')}
          style={(formik.touched.repositoryName && formik.errors.repositoryName) ? styles.error : styles.input}
        />
        {formik.touched.repositoryName && formik.errors.repositoryName && (
          <Text margin='signin' color='error'>{formik.errors.repositoryName}</Text>
        )}
        <TextInput
          placeholder="Rating between 0 and 100"
          multiline={true}
          keyboardType='numeric'
          value={formik.values.rating || ''}
          onChangeText={(e) => {
            formik.setFieldValue('rating', parseInt(e))
          }}
          style={(formik.touched.rating && formik.errors.rating) ? styles.error : styles.input}
        />
        {formik.touched.rating && formik.errors.rating && (
          <Text margin='signin' color='error'>{formik.errors.rating}</Text>
        )}
        <TextInput
          placeholder="Review"
          value={formik.values.text}
          onChangeText={formik.handleChange('text')}
          style={styles.input}
        />
        <TouchableOpacity style={styles.buttonStyle} onPress={formik.handleSubmit}>
          <Text align='center' color="white" fontWeight="bold" fontSize="subheading">Create a review</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const Review = () => {
  const [createReview] = useReview();
  let navigate = useNavigate();

  const onSubmit = async (values) => {
    const { ownerName, repositoryName, rating, text } = values;
    try {
      const data = await createReview({ ownerName, repositoryName, rating, text });
      const id = data.createReview.repositoryId
      navigate(`/items/${id}`);
    } catch (e) {
      console.log(e);
    }
  };

  return <ReviewContainer onSubmit={onSubmit} />;
}

export default Review;