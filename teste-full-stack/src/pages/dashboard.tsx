import UpdateForm from "@/components/updateForm";

import { Box, Center, Container, Heading } from "@chakra-ui/react";
import { GetServerSideProps } from "next";
import nookies from "nookies";
import { IToken, IUserInfos } from "@/types";
import { api } from "@/services";
import ContactList from "@/components/contactList";

const Dashboard = ({ userInfos, token }: any) => {
  return (
    <Container maxW="90vw">
      <Center h="100%" w="100%">
        <Box bg="gray.50" h="100%" w="100%" p={7} marginTop={30}>
          <UpdateForm user={userInfos} token={token} />
          <ContactList user={userInfos} token={token} />
        </Box>
      </Center>
    </Container>
  );
};

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const cookies = nookies.get(ctx);

  if (!cookies["login.token"]) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
  }
  api.defaults.headers.common.authorization = `Bearer ${cookies["login.token"]}`;
  const user: IUserInfos = await api
    .get(`/users`)
    .then((res) => res.data)
    .catch((err) => console.log(err));

  return {
    props: {
      token: cookies["login.token"],
      userInfos: user,
    },
  };
};

export default Dashboard;
