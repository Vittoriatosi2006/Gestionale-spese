// src/types.ts
export type Pagamento = {
  id: number; // <- aggiungi questa riga
  importo: number;
  metodo: "carta" | "contanti";
  descrizione: string;
  data: string; // o Date, se preferisci
};
