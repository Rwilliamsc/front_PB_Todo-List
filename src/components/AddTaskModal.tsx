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
import iTodo from "../interfaces/iTodo";

interface AddTaskModalProps {
  onAddTask: (item: iTodo) => void;
}

const AddTaskModal: React.FC<AddTaskModalProps> = ({ onAddTask }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [newTaskCompleted, setNewTaskCompleted] = useState(false);
  const [newTaskId, setNewTaskId] = useState(0);

  const handleAddTask = () => {
    setNewTaskId(Math.floor(Math.random() * 100) + 1);
    if (newTaskTitle.trim()) {
      const item: iTodo = {
        id: newTaskId,
        title: newTaskTitle,
        completed: newTaskCompleted,
      };
      onAddTask(item);
      setNewTaskTitle("");
      setNewTaskCompleted(false);
      setNewTaskId(0);
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
