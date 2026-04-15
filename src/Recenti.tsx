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
  const [modalOpen, setModalOpen] = useState(false); //per aprire o chiudere il modal con le somme
  const [selectedId, setSelectedId] = useState<number | null>(null); //per modiifcare o eliminare un pagamento
  const [dataDa, setDataDa] = useState("");
  const [dataA, setDataA] = useState("");

  const pagamentiFiltrati = pagamenti.filter((p) => {
    const dataPagamento = new Date(p.data).getTime();
    if (dataDa && dataA) {
      return (
        dataPagamento >= new Date(dataDa).getTime() &&
        dataPagamento <= new Date(dataA).getTime()
      );
    }
    if (dataDa) {
      return dataPagamento >= new Date(dataDa).getTime();
    }
    if (dataA) {
      return dataPagamento <= new Date(dataA).getTime();
    }
    return true;
  });

  // Ordina pagamenti dal più recente al meno recente
  const pagamentiOrdinati = [...pagamentiFiltrati].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  );

  //Ordina pagamenti per giorno
  const pagamentiPerGiorno: PagamentiPerMese = {};
  pagamentiOrdinati.forEach((p) => {
    const date = new Date(p.data);
    const giorno = date.toLocaleDateString("it-IT", {
      day: "numeric",
      month: "long",
    });
    if (!pagamentiPerGiorno[giorno]) {
      pagamentiPerGiorno[giorno] = [];
    }
    pagamentiPerGiorno[giorno].push(p);
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
      <h2 className="lista-pagamenti">LISTA PAGAMENTI</h2>

      <span className="filtra-per-data"> Filtra per data : </span>
      <div className="filtro-data">
        <input
          type="date"
          value={dataDa}
          onChange={(e) => setDataDa(e.target.value)}
        />
        <span className="trattino">→</span>
        <input
          type="date"
          value={dataA}
          onChange={(e) => setDataA(e.target.value)}
        />
        {(dataDa || dataA) && (
          <button
            onClick={() => {
              setDataDa("");
              setDataA("");
            }}
          >
            Reset
          </button>
        )}
      </div>

      {/*object.entries crea un oggetto con tutti i dati, in questo caso viene creato un oggetto per ogni mese contenente i pagamenti di quel mese*/}
      {Object.entries(pagamentiPerGiorno).map(
        ([giorno, pagamentiDelGiorno]) => (
          <div key={giorno}>
            {/* esempio: pagamenti di aprile */}
            <h3 className="mese-sezione">{giorno}</h3>
            {pagamentiDelGiorno.map((p) => (
              <div
                className="spesa-singola"
                key={p.id}
                onClick={() => handleClickPagamento(p.id)}
              >
                <img src="icona-acquisto.svg" className="icona-acquisto" />
                {/*descrizione e data a sinistra */}
                <div className="descrizione-e-data">
                  <h3 className="descrizione-pagamento">{p.descrizione}</h3>
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
        ),
      )}

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
