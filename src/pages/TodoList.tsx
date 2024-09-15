import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextType";
import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Taskslist from "../components/Taskslist";
import iTodo from "../interfaces/iTodo";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";
import api, { setAuthToken } from "../services/api";
import iAddTodo from "../interfaces/iAddTodo";
import initialEditTodo from "../utils/initialEditTodo";

// const mockTodo: iTodo[] = [
//   { id: 1, title: "teste 1", description: "Descrição para teste", userId: 0, completed: false },
//   { id: 2, title: "teste 2", description: "Descrição para teste", userId: 0, completed: false },
//   { id: 3, title: "teste 3", description: "Descrição para teste", userId: 0, completed: false },
// ];

const TodoList = () => {
  const [todos, setTodos] = useState<iTodo[]>([]);
  const [editTodo, setEditTodo] = useState<iTodo>(initialEditTodo);
  const { token, userId } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    if (!token) {
      setAuthToken(token);

      const fetchTodos = async () => {
        try {
          const response = await api.get(`/task-service/api/tasks/user/${userId}`);
          setTodos(response.data);
        } catch (error) {
          console.error("Error fetching todos", error);
        }
      };

      fetchTodos();
    }
  }, [token, userId]);

  const addTask = async (newTask: iAddTodo) => {
    try {
      if (userId) {
        newTask.userId = userId;
      }
      const response = await api.post("/task-service/api/tasks", newTask);
      setTodos((prevTodos) => [...prevTodos, response.data]);
    } catch (error) {
      console.error("Error add task", error);
    }
  };

  const deleteTask = async (taskToDelete: iTodo) => {
    try {
      await api.delete(`/task-service/api/tasks/${taskToDelete.id}`);
      setTodos((prevTodos) => prevTodos.filter((task) => task.id !== taskToDelete.id));
    } catch (error) {
      console.error("Error remove task", error);
    }
  };

  const openEditTask = (taskToEdit: iTodo) => {
    setEditTodo(taskToEdit);
    onOpen();
  };

  const saveEditTask = async (updatedTask: iTodo) => {
    try {
      const response = await api.put(`/task-service/api/tasks/${updatedTask.id}`, updatedTask);
      setTodos((prevTodos) => prevTodos.map((task) => (task.id === updatedTask.id ? response.data : task)));
    } catch (error) {
      console.error("Error edit task", error);
    }
    setTodos((prevTodos) => prevTodos.map((task) => (task.id === updatedTask.id ? updatedTask : task)));
    setEditTodo(initialEditTodo);
    onClose();
  };

  return (
    <Box w="100%" h="100vh">
      <Navbar />
      <Box pt={24}>
        <Heading mb={8}>Lista de Tarefas</Heading>
        <AddTaskModal onAddTask={addTask} />
        <EditTaskModal item={editTodo} onSave={saveEditTask} onClose={onClose} isOpen={isOpen} />
        <Taskslist items={todos} onDelete={deleteTask} onEdit={openEditTask} />
      </Box>
    </Box>
  );
};

export default TodoList;
