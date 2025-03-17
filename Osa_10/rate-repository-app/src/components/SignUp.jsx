import { TextInput, TouchableOpacity, View, StyleSheet } from 'react-native';
import { useNavigate } from "react-router";
import { useFormik } from 'formik';
import * as yup from 'yup';
import theme from '../theme';
import Text from './Text';
import useSignIn from '../hooks/useSignIn';
import useSignUp from '../hooks/useSignUp';

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
    username: yup
        .string()
        .min(5)
        .max(30)
        .required('Username is required'),
    password: yup
        .string()
        .min(5)
        .max(50)
        .required('Password is required'),
    passwordConfirm: yup
        .string()
        .oneOf([yup.ref('password'), null])
        .required('Password confirmation is required'),

})

export const SignUpContainer = ({ onSubmit }) => {
  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    validationSchema,
    onSubmit,
  });

  return (
    <View style={styles.flexContainer}>
      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Username"
          value={formik.values.username}
          onChangeText={formik.handleChange('username')}
          style={(formik.touched.username && formik.errors.username) ? styles.error : styles.input}
        />
        {formik.touched.username && formik.errors.username && (
          <Text margin='signin' color='error'>{formik.errors.username}</Text>
        )}
        <TextInput
          placeholder="Password"
          secureTextEntry={true}
          value={formik.values.password}
          onChangeText={formik.handleChange('password')}
          style={(formik.touched.password && formik.errors.password) ? styles.error : styles.input}
        />
        {formik.touched.password && formik.errors.password && (
          <Text margin='signin' color='error'>{formik.errors.password}</Text>
        )}
        <TextInput
          placeholder="Password confirmation"
          secureTextEntry={true}
          value={formik.values.passwordConfirm}
          onChangeText={formik.handleChange('passwordConfirm')}
          style={(formik.touched.passwordConfirm && formik.errors.passwordConfirm) ? styles.error : styles.input}
        />
        {formik.touched.passwordConfirm && formik.errors.passwordConfirm && (
          <Text margin='signin' color='error'>{formik.errors.passwordConfirm}</Text>
        )}
        <TouchableOpacity style={styles.buttonStyle} onPress={formik.handleSubmit}>
          <Text align='center' color="white" fontWeight="bold" fontSize="subheading">Sign up</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const SignUp = () => {
    const [signUp] = useSignUp();
    const [signIn] = useSignIn();
    let navigate = useNavigate();

    const onSubmit = async (values) => {    
        const { username, password, passwordConfirm } = values;
        if (password === passwordConfirm) {
            try {
                const user = await signUp({ username, password });
                const token = await signIn({ username, password });
                navigate("/");
            } catch (e) {
                console.log(e);
            }
        }
    };

    return <SignUpContainer onSubmit={onSubmit} />;
}

export default SignUp;