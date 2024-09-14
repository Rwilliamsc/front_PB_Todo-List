// src/components/AddTaskModal.tsx
import React, { useState } from "react";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Input,
  useDisclosure,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import iAddTodo from "../interfaces/iAddTodo";

interface AddTaskModalProps {
  onAddTask: (item: iAddTodo) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onAddTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);

  const handleAddTask = () => {
    if (newTaskTitle.trim()) {
      const item: iAddTodo = {
        title: newTaskTitle,
        description: newDescription,
        completed: newTaskCompleted,
      };
      onAddTask(item);
      setNewTaskTitle("");
      setNewDescription("");
      setNewTaskCompleted(false);
      onClose();
    }
  };

  return (
    <>
      <Button colorScheme="teal" size="md" mb={4} onClick={onOpen}>
        Nova Tarefa
      </Button>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Nova Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} placeholder="Insira um titulo" />
            </FormControl>
            <FormControl>
              <FormLabel>Descrição</FormLabel>
              <Input value={newDescription} onChange={(e) => setNewDescription(e.target.value)} placeholder="Insira uma descrição" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleAddTask}>
              Adicionar
            </Button>
            <Button variant="ghost" onClick={onClose}>
              Cancelar
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default AddTaskModal;
