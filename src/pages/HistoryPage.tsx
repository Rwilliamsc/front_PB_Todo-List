import React, { useEffect, useState } from "react";
import { Box, Heading, Container } from "@chakra-ui/react";
import HistoryTable from "../components/HistoryTable";
import { HistoryEntry } from "../types/types";
import Navbar from "../components/Navbar";
import { useAuth } from "../context/AuthContextType";
import api from "../services/api";

const HistoryPage: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const { token, userId } = useAuth();

  useEffect(() => {
    if (token && userId) {
      const fetchUser = async () => {
        try {
          const response = await api.get(`/taskhistory-service/api/tasks/history/user/${userId}`);
          setHistory(response.data);
        } catch (error) {
          console.error("Error fetching history", error);
        }
      };

      fetchUser();
    }
  }, [token, userId]);

  return (
    <>
      <Navbar />
      <Container maxW="lg" mt={12} centerContent size="lg">
        <Box w="5xl" mt={10} boxShadow="md">
          <Heading as="h1" size="xl" textAlign="center" mb={6}>
            Histórico de Alterações
          </Heading>
          <HistoryTable data={history} />
        </Box>
      </Container>
    </>
  );
};

export default HistoryPage;
