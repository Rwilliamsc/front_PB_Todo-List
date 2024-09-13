import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContextType";
import { Box, Heading, useDisclosure } from "@chakra-ui/react";
import Navbar from "../components/Navbar";
import Taskslist from "../components/Taskslist";
import iTodo from "../interfaces/iTodo";
import AddTaskModal from "../components/AddTaskModal";
import EditTaskModal from "../components/EditTaskModal";

const mockTodo: iTodo[] = [
  { id: 1, title: "teste 1", completed: false },
  { id: 2, title: "teste 2", completed: false },
  { id: 3, title: "teste 3", completed: false },
];

const TodoList = () => {
  const [todos, setTodos] = useState<iTodo[]>([]);
  const [editTodo, setEditTodo] = useState<iTodo>({ id: 0, title: "", completed: false });
  const { token } = useAuth();
  const { isOpen, onOpen, onClose } = useDisclosure();

  useEffect(() => {
    setTodos(mockTodo);
    const fetchTodos = async () => {
      const response = await fetch("/api/todos", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTodos(data);
    };

    fetchTodos();
  }, [token]);

  const addtask = (item: iTodo) => {
    setTodos([...todos, item]);
  };

  const deleteTask = (item: iTodo) => {
    const newList = todos.filter((e) => e.id !== item.id);
    setTodos(newList);
  };

  const editTask = (item: iTodo) => {
    setEditTodo(item);
    onOpen();
  };

  const saveTask = (item: iTodo) => {
    const tasks = todos.map((e) => (e.id === item.id ? item : e));
    setTodos(tasks);
  };

  return (
    <Box w="100%" h="100vh">
      <Navbar />
      <Box pt={24}>
        <Heading mb={8}>Lista de Tarefas</Heading>
        <AddTaskModal onAddTask={addtask} />
        <EditTaskModal item={editTodo} onSave={saveTask} onClose={onClose} isOpen={isOpen} />
        <Taskslist items={todos} onDelete={deleteTask} onEdit={editTask} />
      </Box>
    </Box>
  );
};

export default TodoList;
