export type ExerciseFromHistoryDTO = {
  created_at: string;
  group: string;
  hour: string;
  id: string;
  name: string;
};

export type HistoryDTO = {
  data: ExerciseFromHistoryDTO[];
  title: string;
}