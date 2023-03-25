import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormHelperText,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";
import { IUserLogin } from "@/types";
import { EmailIcon, LockIcon, ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { useAuth } from "@/contexts/authContext";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowpassword] = useState(false);
  const { login } = useAuth();

  const formschema = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IUserLogin>({ resolver: yupResolver(formschema) });

  const onSubmitFunction = (data: IUserLogin) => {
    setEmail("");
    setPassword("");
    login(data);
  };

  const emailError = email === "";
  const passwordError = password === "";

  return (
    <>
      <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading>Login</Heading>
        <form onSubmit={handleSubmit(onSubmitFunction)}>
          <Stack spacing={4}>
            <FormControl isRequired isInvalid={emailError}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <EmailIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type="email"
                  id="email"
                  placeholder="Digite seu email"
                  {...register("email")}
                  onChange={(e) => setEmail(e.target.value)}
                  value={email}
                />
              </InputGroup>
              {!emailError ? (
                <FormHelperText>Digite seu e-mail.</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
              )}
            </FormControl>

            <FormControl isRequired isInvalid={passwordError}>
              <FormLabel htmlFor="password">Senha</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <LockIcon color="gray.300" />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Digite sua senha"
                  {...register("password")}
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                />
                <InputRightElement>
                  <Button
                    variant="ghost"
                    onClick={() => setShowpassword(!showPassword)}
                  >
                    {showPassword ? <ViewIcon /> : <ViewOffIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {!passwordError ? (
                <FormHelperText>Digite sua senha.</FormHelperText>
              ) : (
                <FormErrorMessage>{errors.password?.message}</FormErrorMessage>
              )}
            </FormControl>

            <Button type="submit" colorScheme="purple">
              Entrar
            </Button>
          </Stack>
        </form>
      </Box>
    </>
  );
};

export default LoginForm;
