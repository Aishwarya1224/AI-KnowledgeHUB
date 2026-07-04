export type RetrievedChunk = {
  documentId: string;
  documentName: string;
  chunkId: string;
  chunkIndex: number;
  content: string;
  score: number;
};

export type AskQuestionResponse = {
  answer: string;
  sources: RetrievedChunk[];
};