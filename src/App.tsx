import React from "react";
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { useAuth } from "./context/AuthContextType";
import { Box, Container } from "@chakra-ui/react";
import SignupPage from "./pages/SignupPage";
import ProfilePage from "./pages/ProfilePage";
import HistoryPage from "./pages/HistoryPage";
import LoginPage from "./pages/LoginPage";
import TodoListPage from "./pages/TodoListPage";

const PrivateRoute = ({ children }: { children: React.ReactElement }) => {
  const { token } = useAuth();

  // Se o token não estiver presente, redireciona para a página de login
  return token ? children : <Navigate to="/login" />;
};

const App = () => {
  const { token, restoreContext } = useAuth();
  if (!token) {
    restoreContext();
  }

  return (
    <Container maxW="xl" centerContent>
      <Box p={4}>
        <Router>
          <Routes>
            <Route path="/login" element={<LoginPage />} />
            <Route
              path="/todos"
              element={
                <PrivateRoute>
                  <TodoListPage />
                </PrivateRoute>
              }
            />
            <Route path="/" element={<Navigate to="/login" />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/profile" element={<ProfilePage />} />
            <Route path="/history" element={<HistoryPage />} />
          </Routes>
        </Router>
      </Box>
    </Container>
  );
};

export default App;
