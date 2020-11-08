import {
  Box,
  Heading,
  Accordion,
  AccordionItem,
  AccordionHeader,
  AccordionPanel,
  AccordionIcon,
  FormControl,
  FormLabel,
  Input,
  FormErrorMessage,
  Button,
  Alert,
  AlertIcon,
  Icon,
  Flex,
  Text,
} from "@chakra-ui/core";
import Axios from "axios";
import Link from "next/link";
import { Field, Formik } from "formik";
import { NextApiResponse } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { MdBuild } from "react-icons/md";

export default function Home() {
  const [email, setEmail] = useState<string>("");
  const handleSubmit = () => {
    // Axios.post('/api/mailgun', {
    //   emailAddress: "febrilian.kr@gmail.com",
    //   verificationCode: "892473"
    // })
    // .then(function (response) {
    //   console.log(response);
    // })
    // .catch(function (error) {
    //   console.log(error);
    // });
  };

  function validateEmail(value) {
    let error;
    if (!value) {
      error = "Email is required";
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) {
      error = "Invalid email address";
    }
    return error;
  }

  return (
    <div>
      <Head>
        <title>Cepat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box height="80px" margin="0 auto 0">
        <Flex align="center" justify="space-between">
          <Flex p={"20px 20px 20px"}>
            <Heading as="h1" size="lg" mb="2">
              Cepat
            </Heading>
          </Flex>
          <Flex p={"20px 50px 20px"} align="center" justify="center">
            <Text textAlign="center">About</Text>
          </Flex>
        </Flex>
      </Box>

      <Box w="1200px" margin="0 auto 0">
        <Box textAlign="center" margin="100px 0 100px">
          <Heading as="h1" size="2xl" mb="5">
            Pasang link berbagai e-commerce anda
          </Heading>
          <Text fontSize="4xl" mb="5">
            Linktree untuk bisnis Anda
          </Text>
          <Button variantColor="purple" size="lg">
            Dapatkan halaman Anda
          </Button>
        </Box>

        <Heading as="h1" size="xl" mb="2" m="0px 0 20px">
          Frequently Asked Questions
        </Heading>
        <Accordion>
          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                Apa itu Cepat.co?
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>
              Pasang link online store anda, atau berjualan di sini tanpa
              bersaing dengan dropshipper.
            </AccordionPanel>
          </AccordionItem>

          <AccordionItem>
            <AccordionHeader>
              <Box flex="1" textAlign="left">
                Apa kelebihan berjualan di Cepat.co?
              </Box>
              <AccordionIcon />
            </AccordionHeader>
            <AccordionPanel pb={4}>Pembeli tidak perlu login</AccordionPanel>
          </AccordionItem>
        </Accordion>

        {/* FORM */}
        <Box w="fit-content" textAlign="center" margin={"50px auto"}>
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(true);
              console.log("email", values);

              //generating six digits code for verification
              const verificationCode = Math.floor(
                100000 + Math.random() * 900000
              );

              Axios.post("/api/mailgun", {
                emailAddress: values.email,
                verificationCode: verificationCode,
              })
                .then(function (response) {
                  console.log(response.data.message);
                  actions.setSubmitting(false);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            {(props) => (
              <form
                onSubmit={props.handleSubmit}
                style={{ textAlign: "center" }}
              >
                <Field name="email" validate={validateEmail}>
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.email && form.touched.email}
                    >
                      <FormLabel htmlFor="email">Email</FormLabel>
                      <Input {...field} id="email" placeholder="Your e-mail" />
                      <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Button
                  variantColor="teal"
                  variant="outline"
                  mt={2}
                  isLoading={props.isSubmitting}
                  type="submit"
                >
                  Submit
                </Button>
              </form>
            )}
          </Formik>
        </Box>
      </Box>
    </div>
  );
}
