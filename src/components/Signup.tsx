import React, { useState } from "react";
import { Box, Button, FormControl, FormLabel, Input, Stack, useToast, Flex } from "@chakra-ui/react";

interface SignupFormProps {
  onSubmit: (data: SignupFormData) => void;
}

interface SignupFormData {
  name: string;
  email: string;
  username: string;
  password: string;
}

const SignupForm: React.FC<SignupFormProps> = ({ onSubmit }) => {
  const [formData, setFormData] = useState<SignupFormData>({
    name: "",
    email: "",
    username: "",
    password: "",
  });

  const toast = useToast();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e: React.FormEvent): void => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.username || !formData.password) {
      toast({
        title: "Erro",
        description: "Todos os campos são obrigatórios.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
      return;
    }
    onSubmit(formData);
  };

  return (
    <Box maxW="xl" mx="auto" mt={10} p={8} borderWidth={1} borderRadius="md" boxShadow="lg">
      {/* <Heading mb={6} textAlign="center" size="lg">
        Criar Nova Conta
      </Heading> */}
      <form onSubmit={handleSubmit}>
        <Stack spacing={4} width="md">
          <FormControl id="name" isRequired>
            <FormLabel>Nome</FormLabel>
            <Input type="text" name="name" value={formData.name} onChange={handleChange} />
          </FormControl>
          <Flex justifyContent="space-between" width="md">
            <FormControl id="email" isRequired>
              <FormLabel>Email</FormLabel>
              <Input type="email" name="email" value={formData.email} onChange={handleChange} />
            </FormControl>

            <FormControl id="username" ml={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input type="text" name="username" value={formData.username} onChange={handleChange} />
            </FormControl>
          </Flex>
          <Flex justifyContent="space-between">
            <FormControl id="password" isRequired>
              <FormLabel>Senha</FormLabel>
              <Input type="password" name="password" value={formData.password} onChange={handleChange} />
            </FormControl>

            <FormControl id="password" ml={4} isRequired>
              <FormLabel>Confirme sua Senha</FormLabel>
              <Input type="password" name="password" />
            </FormControl>
          </Flex>

          <Button colorScheme="teal" type="submit" size="lg" mt={4}>
            Criar Conta
          </Button>
        </Stack>
      </form>
    </Box>
  );
};

export default SignupForm;
