import React from "react";
import { Box, Heading, Container, useToast } from "@chakra-ui/react";
import SignupForm from "../components/Signup";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

interface SignupData {
  name: string;
  email: string;
  username: string;
  password: string;
}

const SignupPage: React.FC = () => {
  const toast = useToast();
  const navigate = useNavigate();

  const handleSignup = async (data: SignupData) => {
    const response = await api.post(`/user-service/api/users`, data);

    toast({
      title: "Conta criada!",
      description: `Bem-vindo, ${response.data.name}! Sua conta foi criada com sucesso.`,
      status: "success",
      duration: 4000,
      isClosable: true,
    });

    navigate("/login");
  };

  return (
    <Container maxW="xl" centerContent>
      <Box w="100%" mt={10}>
        <Heading as="h1" size="xl" textAlign="center" mb={6}>
          Criação de Conta
        </Heading>
        <SignupForm onSubmit={handleSignup} />
      </Box>
    </Container>
  );
};

export default SignupPage;
