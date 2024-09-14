import { Flex, Avatar, Text, MenuButton, Menu, MenuDivider, MenuGroup, MenuItem, MenuList, LightMode } from "@chakra-ui/react";
import { useAuth } from "../context/AuthContextType";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const { logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  const handleUser = () => {
    navigate("/profile");
  };
  const handleTasks = () => {
    navigate("/todos");
  };
  const handleHistory = () => {
    navigate("/history");
  };

  return (
    <Flex as="nav" bg="teal.500" padding={4} justify="space-between" align="center" width="100%" position="fixed" top={0} left={0} zIndex={1000}>
      <Text fontSize="xl" fontWeight="bold" color="white">
        ToDo-List
      </Text>

      <LightMode>
        <Menu>
          <MenuButton as={Avatar}></MenuButton>
          <MenuList>
            <MenuGroup>
              <MenuItem onClick={handleUser}>Minha Conta</MenuItem>
              <MenuItem onClick={handleTasks}>Minhas Tarefas</MenuItem>
              <MenuItem onClick={handleHistory}>Meus Históricos </MenuItem>
            </MenuGroup>
            <MenuDivider />
            <MenuGroup>
              <MenuItem onClick={handleLogout}>Sair</MenuItem>
            </MenuGroup>
          </MenuList>
        </Menu>
      </LightMode>
    </Flex>
  );
};

export default Navbar;
