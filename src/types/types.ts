export interface HistoryEntry {
  id: number;
  taskId: number;
  userId: number;
  changeType: string; // Ajuste o tipo conforme necessário
  changeTimestamp: string; // Formato ISO da data/hora
  oldValue: string;
  newValue: string;
}
