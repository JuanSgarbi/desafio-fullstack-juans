import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Stack,
} from "@chakra-ui/react";

import { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IUpdateUser } from "@/types";
import {
  EmailIcon,
  LockIcon,
  PhoneIcon,
  ViewIcon,
  ViewOffIcon,
} from "@chakra-ui/icons";

import { useAuth } from "@/contexts/authContext";
import { destroyCookie } from "nookies";
import { useRouter } from "next/router";

const UpdateForm = ({ user, token }: any) => {
  const router = useRouter();
  const { updateUser } = useAuth();
  const [name, setName] = useState(user.full_name);
  const [email, setEmail] = useState(user.email);
  const [phone, setPhone] = useState(user.phone_number);

  const formschema = yup.object().shape({
    email: yup
      .string()
      .email("Deve ser um email válido")
      .required("Email obrigatório"),
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
  } = useForm<IUpdateUser>({ resolver: yupResolver(formschema) });

  const onSubmitFunction = (updateData: IUpdateUser) => {
    updateUser(updateData, user.id, token);
  };

  const logout = () => {
    destroyCookie(null, "login.token");
    router.push("/");
  };

  return (
    <Box p={4} borderWidth={1} borderRadius={8} boxShadow="lg">
      <Flex justify={"space-between"} align={"center"}>
        <Heading>Editar perfil</Heading>
        <Button colorScheme="purple" onClick={logout}>
          Sair
        </Button>
      </Flex>
      <form onSubmit={handleSubmit(onSubmitFunction)}>
        <Stack spacing={4}>
          <FormControl isRequired>
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
            <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
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
            <FormErrorMessage>{errors.email?.message}</FormErrorMessage>
          </FormControl>

          <FormControl isRequired>
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

            <FormErrorMessage>{errors.phone_number?.message}</FormErrorMessage>
          </FormControl>
          <Button colorScheme="purple" type="submit">
            Salvar
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default UpdateForm;
