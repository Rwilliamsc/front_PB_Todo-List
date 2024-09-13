import { Flex, Avatar, Button, Text } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContextType";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <Flex
      as="nav"
      bg="teal.500"
      color="white"
      padding={4}
      justify="space-between"
      align="center"
      width="100%"
      position="fixed"
      top={0}
      left={0}
      zIndex={1000}
    >
      <Text fontSize="xl" fontWeight="bold">
        ToDo-List
      </Text>
      <Flex align="center">
        <Avatar />
        <Button ml={4} colorScheme="teal" variant="outline" onClick={handleLogout}>
          Sair
        </Button>
      </Flex>
    </Flex>
  );
};

export default Navbar;
