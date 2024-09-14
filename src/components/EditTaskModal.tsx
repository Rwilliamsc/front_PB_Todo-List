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
import initialEditTodo from "../utils/initialEditTodo";

interface EditTaskModalProps {
  onSave: (item: iTodo) => void;
  item: iTodo;
  isOpen: boolean;
  onClose: () => void;
}

const EditTaskModal: React.FC<EditTaskModalProps> = ({ onSave, item, isOpen, onClose }) => {
  const [taskData, setTaskData] = useState<iTodo>(initialEditTodo);

  useEffect(() => {
    setTaskData({
      id: item.id,
      title: item.title,
      description: item.description || "",
      completed: item.completed,
      userId: item.userId || 0,
    });
  }, [item]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaskData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEditTask = () => {
    if (taskData.title.trim()) {
      onSave(taskData);
      setTaskData(initialEditTodo);
      onClose();
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Editar Tarefa</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <FormControl>
            <FormLabel>Título</FormLabel>
            <Input name="title" value={taskData.title} onChange={handleInputChange} placeholder="Editar título" />
          </FormControl>
          <FormControl mt={4}>
            <FormLabel>Descrição</FormLabel>
            <Input name="description" value={taskData.description} onChange={handleInputChange} placeholder="Editar descrição" />
          </FormControl>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={handleEditTask}>
            Salvar
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditTaskModal;
