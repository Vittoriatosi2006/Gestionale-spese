import { useState } from "react";
import "./Recenti.css";
import type { Pagamento } from "./type";
import ConfirmModal from "./ConfirmModal";
import "./ConfirmModal.css";

interface RecentiProps {
  pagamenti: Pagamento[];
  onElimina: (id: number) => void;
  onModifica: (p: Pagamento) => void;
}

type PagamentiPerMese = {
  [mese: string]: Pagamento[];
};

export default function Recenti({
  pagamenti,
  onElimina,
  onModifica,
}: RecentiProps) {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);

  // Ordina pagamenti dal più recente al meno recente
  const pagamentiOrdinati = [...pagamenti].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  );

  // Raggruppa per mese
  const pagamentiPerMese: PagamentiPerMese = {};
  pagamentiOrdinati.forEach((p) => {
    const date = new Date(p.data);
    const mese = date.toLocaleDateString("it-IT", { month: "long" });
    if (!pagamentiPerMese[mese]) pagamentiPerMese[mese] = [];
    pagamentiPerMese[mese].push(p);
  });

  const handleClickPagamento = (id: number) => {
    setSelectedId(id);
    setModalOpen(true);
  };

  const handleCancel = () => {
    setModalOpen(false);
    setSelectedId(null);
  };

  return (
    <main className="recenti-container">
      <h2 className="i-miei-pagamenti">I MIEI PAGAMENTI</h2>

      {/*object.entries crea un oggetto con tutti i dati, in questo caso viene creato un oggetto per ogni mese contenente i pagamenti di quel mese*/}
      {Object.entries(pagamentiPerMese).map(([mese, pagamentiDelMese]) => (
        <div key={mese}>
          {/* esempio: pagamenti di aprile */}
          <h3 className="mese-sezione">{mese}</h3>
          {pagamentiDelMese.map((p) => (
            <div
              className="spesa-singola"
              key={p.id}
              onClick={() => handleClickPagamento(p.id)}
            >
              <img src="icona-acquisto.svg" className="icona-acquisto" />
              {/*descrizione e data a sinistra */}
              <div className="descrizione-e-data">
                <h3 className="descrizione-pagamento">{p.descrizione}</h3>
                <span className="data-pagamento">
                  {new Date(p.data).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              {/* prezzo e metodo a destra */}
              <div className="prezzo-e-metodo">
                <h3
                  className={`prezzo-pagamento ${
                    p.importo >= 0 ? "entrata" : "spesa"
                  }`}
                >
                  {p.importo >= 0 ? "+" : "-"} €{" "}
                  {/*Math.abs = restituisce il numero selezionato senza + o -*/}
                  {/*toFixed(2) = restituisce il numero con 2 cifre decimali*/}
                  {Math.abs(p.importo).toFixed(2)}
                </h3>
                <span className="metodo-pagamento">
                  {p.metodo === "carta" ? "Carta" : "Contanti"}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}

      <ConfirmModal
        isOpen={modalOpen}
        title="Cosa vuoi fare?"
        message="Vuoi modificare o eliminare questo pagamento?"
        onModifica={() => {
          if (selectedId === null) return;
          {
            /* find scorre l'array e restituisce il primo elemento che soddisfa la condizione, e la condizione sarebbe di cercare l'elemento con lo stesso id che abbiamo selezionato*/
          }
          const pagamento = pagamenti.find((p) => p.id === selectedId);
          if (!pagamento) return;
          onModifica(pagamento);
          setModalOpen(false);
          setSelectedId(null);
        }}
        onElimina={() => {
          if (selectedId === null) return;
          onElimina(selectedId);
          setModalOpen(false);
          setSelectedId(null);
        }}
        onCancel={handleCancel}
      />
    </main>
  );
}
