// src/types.ts
export interface Pagamento {
  importo: number;
  metodo: "carta" | "contanti";
  descrizione: string;
  data: string;
}
