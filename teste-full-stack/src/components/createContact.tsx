import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { AddIcon, EmailIcon, PhoneIcon } from "@chakra-ui/icons";
import {
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Stack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { AiOutlineUser } from "react-icons/ai";
import { IRegisterContact } from "@/types";
import { api } from "@/services";

function CreateContact({ contacts, setContacts, token }: any) {
  const toast = useToast();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const { isOpen, onOpen, onClose } = useDisclosure();

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
  } = useForm<IRegisterContact>({ resolver: yupResolver(formschema) });

  const onSubmitFunction = async (contactData: IRegisterContact) => {
    const createContact = {
      ...contactData,
      password: "123456",
      is_client: false,
    };
    const contact = await api
      .post("/users", createContact)
      .then((res) => res.data.id)
      .catch((err) => {
        console.log(err);
      });

    const contactId = { id: contact };
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    await api
      .patch("/contact", contactId)
      .then((res) => {
        toast({
          title: "Contato criado com sucesso",
          status: "success",
          description: "Confira na sua lista de contatos",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Erro ao cadastrar",
          status: "error",
          description:
            "Verifique se os dados estão corretos/Email já está em uso.",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      });

    const contactAdded = {
      ...contactData,
      ...contactId,
    };

    setEmail("");
    setName("");
    setPhone("");
    setContacts([...contacts, contactAdded]);

    console.log(contacts);
  };

  return (
    <>
      <Button leftIcon={<AddIcon />} colorScheme="purple" onClick={onOpen}>
        Criar contato
      </Button>
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader borderBottomWidth="1px">Criar contato</DrawerHeader>

          <DrawerBody>
            <Stack spacing="24px">
              <FormControl isRequired>
                <FormLabel htmlFor="name">Nome completo</FormLabel>
                <InputGroup>
                  <InputLeftElement pointerEvents="none">
                    <AiOutlineUser color="gray" />
                  </InputLeftElement>
                  <Input
                    type="text"
                    id="name"
                    placeholder="Digite o nome completo"
                    {...register("full_name")}
                    onChange={(e) => setName(e.target.value)}
                    value={name}
                  />
                </InputGroup>
                <FormErrorMessage>
                  {errors.phone_number?.message}
                </FormErrorMessage>
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
                    placeholder="Digite o email"
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
                    placeholder="Digite o telefone"
                    {...register("phone_number")}
                    onChange={(e) => setPhone(e.target.value)}
                    value={phone}
                  />
                </InputGroup>

                <FormErrorMessage>
                  {errors.phone_number?.message}
                </FormErrorMessage>
              </FormControl>
            </Stack>
          </DrawerBody>

          <DrawerFooter borderTopWidth="1px">
            <Button variant="outline" mr={3} onClick={onClose}>
              Cancel
            </Button>
            <Button
              colorScheme="purple"
              onClick={handleSubmit(onSubmitFunction)}
            >
              Submit
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    </>
  );
}

export default CreateContact;
