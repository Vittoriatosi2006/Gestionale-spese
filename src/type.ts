export type Pagamento = {
  id: number;
  importo: number;
  metodo: "carta" | "contanti";
  descrizione: string;
  data: string;
};
