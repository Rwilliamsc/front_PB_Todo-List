import React from "react";
import { Table, Thead, Tbody, Tr, Th, Td } from "@chakra-ui/react";
import { HistoryEntry } from "../types/types"; // Ajuste o caminho conforme necessário

interface HistoryTableProps {
  data: HistoryEntry[];
}

const HistoryTable: React.FC<HistoryTableProps> = ({ data }) => {
  return (
    <Table variant="simple" size="lg">
      <Thead>
        <Tr>
          <Th>ID</Th>
          <Th>Task ID</Th>
          <Th>User ID</Th>
          <Th>Change Type</Th>
          <Th>Change Timestamp</Th>
          <Th>Old Value</Th>
          <Th>New Value</Th>
        </Tr>
      </Thead>
      <Tbody>
        {data.map((entry) => (
          <Tr key={entry.id}>
            <Td>{entry.id}</Td>
            <Td>{entry.taskId}</Td>
            <Td>{entry.userId}</Td>
            <Td>{entry.changeType}</Td>
            <Td>{new Date(entry.changeTimestamp).toLocaleString()}</Td>
            <Td>{entry.oldValue}</Td>
            <Td>{entry.newValue}</Td>
          </Tr>
        ))}
      </Tbody>
    </Table>
  );
};

export default HistoryTable;
