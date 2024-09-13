// src/components/AddTaskModal.tsx
import React, { useEffect, useState } from "react";
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
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import iTodo from "../interfaces/iTodo";

interface AddTaskModalProps {
  onSave: (item: iTodo) => void;
  item: iTodo;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal: React.FC<AddTaskModalProps> = ({ onSave, item, isOpen, onClose }) => {
  const [editTaskTitle, setEditTaskTitle] = useState("");
  const [editTaskCompleted, setEditTaskCompleted] = useState(false);
  const [editTaskId, setEditTaskId] = useState(0);

  useEffect(() => {
    setEditTaskTitle(item.title);
    setEditTaskCompleted(item.completed);
    setEditTaskId(item.id);
  }, [item]);

  const handleEditTask = () => {
    if (editTaskTitle.trim()) {
      const item: iTodo = {
        id: editTaskId,
        title: editTaskTitle,
        completed: editTaskCompleted,
      };
      onSave(item);
      setEditTaskTitle("");
      setEditTaskCompleted(false);
      setEditTaskId(0);
      onClose();
    }
  };

  return (
    <>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Editar Tarefa</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <FormControl>
              <FormLabel>Titulo</FormLabel>
              <Input value={editTaskTitle} onChange={(e) => setEditTaskTitle(e.target.value)} placeholder="Editar titulo" />
            </FormControl>
          </ModalBody>

          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleEditTask}>
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

export default EditTaskModal;
