import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import TodoList from "./pages/TodoList";
import { useAuth } from "./context/AuthContextType";
import { Box, Container } from "@chakra-ui/react";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();

  // Se o token não estiver presente, redireciona para a página de login
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  return (
    <Container maxW="xl" centerContent>
      <Box p={4}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <TodoList />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/teste" element={<TodoList />} />
          </Routes>
        </Router>
      </Box>
    </Container>
  );
};

export default App;
