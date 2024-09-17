import React, { useState } from "react";
import { useAuth } from "../context/AuthContextType";
import { Box, Button, Input, Stack, FormControl, FormLabel, Heading, InputRightElement, InputGroup, Text, useToast } from "@chakra-ui/react";
import api from "../services/api";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";

export interface iDecodedToken {
  sub: string;
  name: string;
  userName: string;
  userId: number;
  iat: number;
  exp: number;
}

const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [show, setShow] = React.useState(false);
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleClick = () => setShow(!show);

  const handleLogin = async () => {
    try {
      const response = await api.post("/oauth-service/api/auth/login", { username, password });
      if (response.status !== 200) {
        toast({
          title: "Não foi possível logar!",
          description: `Login ou senha inválida.`,
          status: "error",
          duration: 4000,
          isClosable: true,
        });
      }
      const tokeJwt = response.data;
      const decoded: iDecodedToken = jwtDecode(tokeJwt);

      console.log(tokeJwt);
      console.log(decoded);

      login(tokeJwt, decoded.name, decoded.userId);
      navigate("/todos");
    } catch (err) {
      console.error("Failed to login", err);
      toast({
        title: "Não foi possível logar!",
        description: `Login ou senha inválida.`,
        status: "error",
        duration: 4000,
        isClosable: true,
      });
    }
  };

  const handleNewAccount = () => {
    navigate("/signup");
  };

  return (
    <Box w="100%" h="100vh" display="flex" alignItems="center" justifyContent="center">
      <Box p={8} maxWidth="600px" borderWidth={1} borderRadius={8} boxShadow="lg">
        <Heading mb={6}>Login</Heading>
        <Stack spacing={4}>
          <FormControl>
            <FormLabel>Usuário</FormLabel>
            <Input width="300px" type="text" value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Insira o seu usuário" />
          </FormControl>

          <FormControl>
            <FormLabel>Senha</FormLabel>
            <InputGroup size="md">
              <Input
                pr="4.5rem"
                type={show ? "text" : "password"}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Insira sua senha"
              />
              <InputRightElement width="4.5rem">
                <Button h="1.75rem" size="sm" onClick={handleClick}>
                  {show ? "Hide" : "Show"}
                </Button>
              </InputRightElement>
            </InputGroup>
          </FormControl>

          <Button colorScheme="teal" size="lg" onClick={handleLogin}>
            Login
          </Button>
        </Stack>
        <Text mt="4" align="center" cursor="pointer" onClick={handleNewAccount}>
          Criar nova conta
        </Text>
      </Box>
    </Box>
  );
};

export default LoginPage;
