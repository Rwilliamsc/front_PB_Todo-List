import React, { useEffect, useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, useToast, Container, Flex } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContextType";
import api from "../services/api";
import Navbar from "../components/Navbar";

interface ProfileData {
  name: string;
  email: string;
  username: string;
  password: string;
}

const ProfilePage: React.FC = () => {
  const { token, userId } = useAuth();
  const [profileData, setProfileData] = useState<ProfileData>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const toast = useToast();

  useEffect(() => {
    if (token && userId) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/user-service/api/users/${userId}`);
          setProfileData(response.data);
        } catch (error) {
          console.error("Error fetching user", error);
        }
      };

      fetchUser();
    }
  }, [token, userId]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setProfileData({
      ...profileData,
      [e.target.name]: e.target.value,
    });
    console.log("alterando", profileData);
  };

  const handleSubmit = async (e: React.FormEvent): Promise<void> => {
    e.preventDefault();
    if (!profileData.name || !profileData.email || !profileData.username || !profileData.password) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    console.log("pronto para gravar", profileData);
    const response = await api.put(`/user-service/api/users/${userId}`, profileData);
    setProfileData(response.data);

    toast({
      title: "Perfil atualizado!",
      description: "Suas informações foram salvas com sucesso.",
      status: "success",
      duration: 4000,
      isClosable: true,
    });
  };

  return (
    <Box w="100%" h="100vh">
      <Navbar />
      <Container maxW="lg" mt={12} centerContent>
        <Box w="100%" maxW="lg" mt={10}>
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            Meu Perfil
          </Heading>
          <form onSubmit={handleSubmit}>
            <Stack spacing={4} maxW="lg">
              <FormControl id="name" isRequired>
                <FormLabel>Nome</FormLabel>
                <Input width="lg" type="text" name="name" value={profileData.name} onChange={handleChange} />
              </FormControl>

              <FormControl id="email" isRequired>
                <FormLabel>Email</FormLabel>
                <Input width="lg" type="email" name="email" value={profileData.email} onChange={handleChange} />
              </FormControl>
              <Flex justifyContent="space-between" width="lg">
                <FormControl id="username" isRequired>
                  <FormLabel>Username</FormLabel>
                  <Input type="text" name="username" value={profileData.username} onChange={handleChange} />
                </FormControl>

                <FormControl id="password" isRequired>
                  <FormLabel>Senha</FormLabel>
                  <Input ml={2} type="password" name="password" value={profileData.password} onChange={handleChange} />
                </FormControl>
              </Flex>
              <Button colorScheme="teal" type="submit" size="lg" mt={4}>
                Atualizar Perfil
              </Button>
            </Stack>
          </form>
        </Box>
      </Container>
    </Box>
  );
};

export default ProfilePage;
