import { List, ListItem, Stack, Wrap, WrapItem, Text, Heading, Box } from "@chakra-ui/react";

import { AiFillEdit, AiFillDelete } from "react-icons/ai";
import ITodo from "../interfaces/iTodo";
import iTodo from "../interfaces/iTodo";

interface Params {
  items: ITodo[];
  onDelete: (item: iTodo) => void;
  onEdit: (item: iTodo) => void;
}

const Taskslist = (props: Params) => {
  const deleteItem = (item: iTodo) => {
    props.onDelete(item);
  };

  const editItem = (item: iTodo) => {
    props.onEdit(item);
  };

  return (
    <Stack spacing={4} width="800px">
      <List spacing={3}>
        {props.items.map((item: ITodo) => (
          <ListItem
            key={item.id}
            p={4}
            borderWidth={1}
            borderRadius="md"
            boxShadow="sm"
            display="flex"
            justifyContent="space-between"
            alignItems="center"
          >
            <Box>
              <Heading as="h3" size="md">
                {item.title}
              </Heading>
              <Text fontSize="md">{item.description}</Text>
            </Box>
            <Wrap>
              <WrapItem>
                <AiFillEdit onClick={() => editItem(item)} cursor="pointer" />
              </WrapItem>
              <WrapItem ml={2} mb={2}>
                <AiFillDelete onClick={() => deleteItem(item)} cursor="pointer" />
              </WrapItem>
            </Wrap>
          </ListItem>
        ))}
      </List>
    </Stack>
  );
};

export default Taskslist;
