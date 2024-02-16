import React, { useState, useEffect } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FormControl, FormLabel, Input, Button, FormErrorMessage, Box, Flex, Text, Link } from "@chakra-ui/react"; // Import Chakra UI components
import { Link as ReactRouterLink } from "react-router-dom";
import useStore from '../store';

function CheckOut() {
    const {activeUser} =useStore();
    const [cart, setCart] = useState([]);
  const validationSchema = Yup.object().shape({
    cardNumber: Yup.string()
      .required("Card number is required")
      .matches(/^\d{16}$/, "Card number must be 16 digits"),
    expiryDate: Yup.string()
      .required("Expiry date is required")
      .matches(/^\d{2}\/\d{2}$/, "Expiry date must be in MM/YY format"),
    cvv: Yup.string()
      .required("CVV is required")
      .matches(/^\d{3}$/, "CVV must be 3 digits"),
  });

  useEffect(() => {
    // Fetch cart items from db.json
    fetch("http://localhost:3000/cart")
      .then((response) => response.json())
      .then((data) => setCart(data))
      .catch((error) => console.error("Error fetching cart items:", error));
  }, []);

  const initialValues = {
    cardNumber: "",
    expiryDate: "",
    cvv: "",
  };

  const clearCart = async () => {
    try {
      // Iterate over each item in the cart and send a DELETE request to remove it
      await Promise.all(cart.map(async (item) => {
        const response = await fetch(`http://localhost:3000/cart/${item.id}`, {
          method: "DELETE",
        });
        if (!response.ok) {
          throw new Error(`Failed to clear item ${item.id}`);
        }
      }));
  
      // Update the cart state to reflect that all items are removed
      setCart([]);
    } catch (error) {
      console.error("Error clearing cart:", error);
      alert("Failed to clear cart. Please try again later.");
    }
  };
  

  const handleSubmit = async (values, { setSubmitting }) => {
    try {
      const paymentDetails = { activeUser, ...values };
    
  
      // Save orders
      const orders = { paymentDetails, cart };
      const ordersResponse = await fetch("http://localhost:3000/orders", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orders),
      });
      if (!ordersResponse.ok) {
        throw new Error("Failed to save orders");
      }
  
      // Reset form
      setSubmitting(false);
      clearCart();
      alert("Order placed successfully!");
      // Redirect or navigate to another page if needed
       window.location.href = "/";
    } catch (error) {
      console.error("Checkout error:", error);
      alert("Failed to place order. Please try again later.");
      setSubmitting(false);
    }
  };
  

  return (
    <Flex alignItems="center" justifyContent="center" minH="100vh">
      <Box minWidth="300px">
        <Formik
          initialValues={initialValues}
          validationSchema={validationSchema}
          onSubmit={handleSubmit}
        >
          {(formik) => (
            <Form>
              <FormControl id="cardNumber" isInvalid={formik.touched.cardNumber && formik.errors.cardNumber}>
                <FormLabel>Card Number</FormLabel>
                <Field name="cardNumber" as={Input} />
                <FormErrorMessage>{formik.errors.cardNumber}</FormErrorMessage>
              </FormControl>

              <FormControl id="expiryDate" mt={4} isInvalid={formik.touched.expiryDate && formik.errors.expiryDate}>
                <FormLabel>Expiry Date</FormLabel>
                <Field name="expiryDate" as={Input} />
                <FormErrorMessage>{formik.errors.expiryDate}</FormErrorMessage>
              </FormControl>

              <FormControl id="cvv" mt={4} isInvalid={formik.touched.cvv && formik.errors.cvv}>
                <FormLabel>CVV</FormLabel>
                <Field name="cvv" type="password" as={Input} />
                <FormErrorMessage>{formik.errors.cvv}</FormErrorMessage>
              </FormControl>

              <Button
                mt={8}
                isLoading={formik.isSubmitting}
                type="submit"
                disabled={!formik.isValid || formik.isSubmitting}
              >
                Submit
              </Button>

            </Form>
          )}
        </Formik>
      </Box>
    </Flex>
  );
}

export default CheckOut;
