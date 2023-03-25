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
import {
  EmailIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";
import { AiOutlineUser } from "react-icons/ai";
import { IRegisterUser } from "@/types";
import { useAuth } from "@/contexts/authContext";
import { useState } from "react";

const RegisterForm = () => {
  const { registerUser } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [showPassword, setShowpassword] = useState(false);

  const formschema = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Email obrigatório"),
    password: yup.string().required("Senha obrigatória"),
    phone_number: yup
      .string()
      .min(8)
      .max(11)
      .required("Número de telefone obrigatório"),
    full_name: yup.string().required("Nome completo é obrigatório"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<IRegisterUser>({ resolver: yupResolver(formschema) });

  const onSubmitFunction = (data: IRegisterUser) => {
    registerUser(data);
    setEmail("");
    setName("");
    setPassword("");
    setPhone("");
  };

  const emailError = email === "";
  const passwordError = password === "";
  const fullNameError = name === "";
  const phoneNumberError = phone === "";

  return (
    <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Heading>Cadastro</Heading>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <Stack spacing={4}>
          <FormControl isRequired isInvalid={fullNameError}>
            <FormLabel htmlFor="name">Nome completo</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <AiOutlineUser color="gray" />
              </InputLeftElement>
              <Input
                type="text"
                id="name"
                placeholder="Digite seu nome completo"
                {...register("full_name")}
                onChange={(e) => setName(e.target.value)}
                value={name}
              />
            </InputGroup>
            {!fullNameError ? (
              <FormHelperText>Insira seu nome completo.</FormHelperText>
            ) : (
              <FormErrorMessage>
                {errors.phone_number?.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <FormControl isRequired isInvalid={emailError}>
            <FormLabel htmlFor="email">Email</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <EmailIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="emailReg"
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
                id="passwordReg"
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

          <FormControl isRequired isInvalid={phoneNumberError}>
            <FormLabel htmlFor="phone">Telefone</FormLabel>
            <InputGroup>
              <InputLeftElement pointerEvents="none">
                <PhoneIcon color="gray.300" />
              </InputLeftElement>
              <Input
                type="tel"
                id="phone"
                placeholder="Digite seu telefone"
                {...register("phone_number")}
                onChange={(e) => setPhone(e.target.value)}
                value={phone}
              />
            </InputGroup>
            {!phoneNumberError ? (
              <FormHelperText>Insira apenas números.</FormHelperText>
            ) : (
              <FormErrorMessage>
                {errors.phone_number?.message}
              </FormErrorMessage>
            )}
          </FormControl>

          <Button type="submit" colorScheme="purple">
            Criar conta
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default RegisterForm;
