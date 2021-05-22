export const SignupForm = () => {
  const { register, handleSubmit, errors } = useForm({
    mode: "onBlur",
    validationSchema: Yup.object({
      login: Yup.string()
        .required("Please enter your email")
        .matches(
          /^[a-zA-Z0-9.!#$%&'*+=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
          "Email must contain '@' and '.'. Email could contain english letters, numbers and symbols"
        ),
      password: Yup.string()
        .required("Please enter your password")
        .matches(
          /(?=.*\d)(?=.*[a-z]).{8,}/,
          "Password must contain at least 8 characters, one uppercase and one number"
        ),
    }),
  });
};
