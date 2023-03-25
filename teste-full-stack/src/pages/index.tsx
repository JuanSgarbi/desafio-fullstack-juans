import LoginForm from "@/components/loginForm";
import RegisterForm from "@/components/registerForm";
import { Container, Box, Center } from "@chakra-ui/react";

const index = () => {
  return (
    <>
      <Container maxW="90vw">
        <Center h="100%" w="100%">
          <Box bg="gray.50" h="100%" w="80%" p={7} marginTop={30}>
            <LoginForm />
            <Center marginBottom={10} marginTop={10} fontWeight="bold">
              Ou
            </Center>
            <RegisterForm />
          </Box>
        </Center>
      </Container>
    </>
  );
};

export default index;
