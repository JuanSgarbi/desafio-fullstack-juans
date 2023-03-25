import { api } from "@/services";
import {
  IUserLogin,
  IProviderProps,
  IRegisterUser,
  IUpdateUser,
} from "@/types";
import { Box, useToast } from "@chakra-ui/react";
import { useRouter } from "next/router";
import { setCookie } from "nookies";
import { createContext, useContext } from "react";

interface IAuthProviderData {
  login: (userData: IUserLogin) => Promise<void>;
  registerUser: (registerData: IRegisterUser) => Promise<void>;
  updateUser: (
    updateData: IUpdateUser,
    userId: string,
    token: string
  ) => Promise<void>;
}

const AuthContext = createContext<IAuthProviderData>({} as IAuthProviderData);

export const AuthProvider = ({ children }: IProviderProps) => {
  const toast = useToast();
  const router = useRouter();

  const login = async (userData: IUserLogin) => {
    await api
      .post("/login", userData)
      .then((res) => {
        setCookie(null, "login.token", res.data.token, {
          maxAge: 86400,
          path: "/",
        });

        toast({
          title: "Login realizado com sucesso",
          status: "success",
          description: "Você está sendo redirecionado",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
        router.push("/dashboard");
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: "Erro ao logar",
          status: "error",
          description: "Verifique seu e-mail e senha.",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      });
  };

  const registerUser = async (registerData: IRegisterUser) => {
    await api
      .post("/users", registerData)
      .then((res) => {
        toast({
          title: "Cadastro realizado com sucesso",
          status: "success",
          description: "Realize seu login com as credenciais criadas",
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
  };

  const updateUser = async (
    updateData: IUpdateUser,
    userId: string,
    token: string
  ) => {
    api.defaults.headers.common.authorization = `Bearer ${token}`;
    await api
      .patch(`/users/${userId}`, updateData)
      .then((res) => {
        toast({
          title: "Atualização realizada com sucesso",
          status: "success",
          description: "Já salvamos suas alterações",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      })
      .catch((err) => {
        toast({
          title: "Erro ao atualizar",
          status: "error",
          description: "Tente novamente mais tarde.",
          position: "top-right",
          isClosable: false,
          duration: 5000,
        });
      });
  };

  return (
    <AuthContext.Provider value={{ login, registerUser, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
