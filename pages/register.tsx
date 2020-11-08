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
  Link,
  Icon,
} from "@chakra-ui/core";
import Axios from "axios";
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
      error = "Name is required";
    }
    return error;
  }

  return (
    <div>
      <Head>
        <title>Cepat</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Box bg="#fff" w="1200px" margin="0 auto 0">
        <Alert status="info">
          <AlertIcon />
          Cepat.co akan segera launch pada tanggal 1 Januari 2020,{""}
          <Link href="/register">
            daftar Sekarang! <Icon name="external-link" mx="2px" />
          </Link>
        </Alert>
        <Heading as="h1" size="xl" mb="2" textAlign="center" m="50px 0 50px">
          Register
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
        <Box w="fit-content" textAlign="left">
          <Formik
            initialValues={{ email: "" }}
            onSubmit={(values, actions) => {
              actions.setSubmitting(false);
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
                  console.log(response);
                })
                .catch(function (error) {
                  console.log(error);
                });
            }}
          >
            {(props) => (
              <form onSubmit={props.handleSubmit}>
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
                  mt={4}
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
