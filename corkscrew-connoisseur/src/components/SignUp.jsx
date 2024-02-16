import React from "react";
import { Formik, Form, Field } from "formik";
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Box, Flex, Text, Link } from "@chakra-ui/react";
import * as Yup from "yup";
import { Link as ReactRouterLink } from "react-router-dom";




const SignUp = () => {
    

    const handleSubmit = async (values, actions) => {
        try {
          // Make API request to create a new user
          const response = await fetch("http://localhost:3000/users", {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(values),
          });
          
          if (!response.ok) {
            throw new Error("Failed to sign up");
          }

          console.log("User signed up successfully:", values);

           alert("Account created successfully! Please log in.");
      
          // Reset form
          actions.resetForm();
        } catch (error) {
          console.error("Sign-up error:", error);
          // Handle sign-up error (e.g., display error message)
          // Example:
           alert("Failed to sign up. Please try again later.");
        } finally {
          actions.setSubmitting(false);
        }

        window.location.href = "/login";

      };
      

  return (
    <Formik
      initialValues={{ username: "", email: "", password: "", confirmPassword: "" }}
      validationSchema={Yup.object({
        username: Yup.string().required("Required"),
        email: Yup.string().email("Invalid email address").required("Required"),
        password: Yup.string()
          .required("Required")
          .min(8, "Password must be at least 8 characters")
          .matches(
            /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/,
            "Password must contain at least one letter, one number, and one special character"
          ),
        confirmPassword: Yup.string()
          .oneOf([Yup.ref("password"), null], "Passwords must match")
          .required("Required"),
      })}
      onSubmit={handleSubmit}
    >
      {(formik) => (
        <Flex alignItems="center" justifyContent="center" minH="110vh">
          <Box minWidth="300px">
            <Form>
              <FormControl id="username" isInvalid={formik.touched.username && formik.errors.username}>
                <FormLabel>Username</FormLabel>
                <Field name="username" as={Input} />
                <FormErrorMessage>{formik.errors.username}</FormErrorMessage>
              </FormControl>

              <FormControl id="email" mt={4} isInvalid={formik.touched.email && formik.errors.email}>
                <FormLabel>Email</FormLabel>
                <Field name="email" as={Input} />
                <FormErrorMessage>{formik.errors.email}</FormErrorMessage>
              </FormControl>

              <FormControl id="password" mt={4} isInvalid={formik.touched.password && formik.errors.password}>
                <FormLabel>Password</FormLabel>
                <Field name="password" type="password" as={Input} />
                <FormErrorMessage>{formik.errors.password}</FormErrorMessage>
              </FormControl>

              <FormControl id="confirmPassword" mt={4} isInvalid={formik.touched.confirmPassword && formik.errors.confirmPassword}>
                <FormLabel>Confirm Password</FormLabel>
                <Field name="confirmPassword" type="password" as={Input} />
                <FormErrorMessage>{formik.errors.confirmPassword}</FormErrorMessage>
              </FormControl>

              <Button
                mt={8}
                isLoading={formik.isSubmitting}
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Sign Up
              </Button>

              <Text mt={2}>
                Already have an account?{" "}
                <Link as={ReactRouterLink} to="/login" color="teal.500">
                  Log in
                </Link>
              </Text>
            </Form>
          </Box>
        </Flex>
      )}
    </Formik>
  );
};

export default SignUp;
