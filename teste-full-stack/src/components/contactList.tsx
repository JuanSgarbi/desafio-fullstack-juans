import { api } from "@/services";
import { IContacts } from "@/types";
import {
  Box,
  Card,
  CardBody,
  CardHeader,
  CloseButton,
  Flex,
  Heading,
  Stack,
  StackDivider,
  Text,
  useToast,
  Wrap,
  WrapItem,
} from "@chakra-ui/react";
import { useState } from "react";
import CreateContact from "./createContact";

const ContactList = ({ user, token }: any) => {
  const toast = useToast();
  const [contacts, setContacts] = useState(user.contacts);
  const deleteContact = async (idContact: string, token: string) => {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    await api
      .delete(`/contact/${idContact}`)
      .then((res) => {
        toast({
          title: "Contato deletado com sucesso",
          status: "success",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Erro ao deletar contato",
          status: "error",
          description: "Tente novamente mais tarde.",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      });

    const contactFilter = contacts.filter(
      (contact: IContacts) => contact.id !== idContact
    );

    setContacts(contactFilter);
  };
  return (
    <>
      <Flex justify={"space-between"} align={"center"}>
        <Heading marginTop={7} marginBottom={7}>
          Seus contatos
        </Heading>
        <CreateContact
          contacts={contacts}
          setContacts={setContacts}
          token={token}
        />
      </Flex>
      <Wrap spacing="30px">
        {contacts.length > 0 ? (
          contacts.map((contact: IContacts) => {
            return (
              <WrapItem key={contact.id}>
                <Card w="200px" h="270px" overflowY={"hidden"}>
                  <CloseButton
                    position={"absolute"}
                    right={0}
                    onClick={() => deleteContact(contact.id, token)}
                  />
                  <CardHeader>
                    <Heading
                      size="md"
                      whiteSpace={"nowrap"}
                      overflowX={"hidden"}
                      textOverflow="ellipsis"
                      pb={1}
                    >
                      {contact.full_name}
                    </Heading>
                  </CardHeader>

                  <CardBody>
                    <Stack divider={<StackDivider />} spacing="4">
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Email
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {contact.email}
                        </Text>
                      </Box>
                      <Box>
                        <Heading size="xs" textTransform="uppercase">
                          Telefone
                        </Heading>
                        <Text pt="2" fontSize="sm">
                          {contact.phone_number}
                        </Text>
                      </Box>
                    </Stack>
                  </CardBody>
                </Card>
              </WrapItem>
            );
          })
        ) : (
          <Card>
            <CardBody>
              <Text>Você ainda não possui contatos.</Text>
            </CardBody>
          </Card>
        )}
      </Wrap>
    </>
  );
};

export default ContactList;
