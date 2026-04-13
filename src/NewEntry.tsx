import { useEffect, useState } from "react";
import "./NewEntry.css";
import "./style.css";
import type { Pagamento } from "./type";

interface NewEntryProps {
  onSalva: (p: Pagamento) => void;
  pagamentoDaModificare?: Pagamento | null;
}

export default function NewEntry({
  onSalva,
  pagamentoDaModificare,
}: NewEntryProps) {
  const [bottoneSelezionato, setBottoneSelezionato] = useState<
    "carta" | "contanti"
  >("carta");
  const [importo, setImporto] = useState<number | "">("");
  const [descrizione, setDescrizione] = useState("");
  const [data, setData] = useState("");
  const [segno, setSegno] = useState("+");

  useEffect(() => {
    if (pagamentoDaModificare) {
      setImporto(Math.abs(pagamentoDaModificare.importo));
      setDescrizione(pagamentoDaModificare.descrizione);
      setData(pagamentoDaModificare.data);
      setBottoneSelezionato(pagamentoDaModificare.metodo);
      setSegno(pagamentoDaModificare.importo >= 0 ? "+" : "-");
    }
  }, [pagamentoDaModificare]);

  return (
    <main className="new-entry-container">
      <div className="prima-parte">
        <h1 className="gestionale-spese">Gestionale spese</h1>
        <h2 className="inserisci-dati">Inserisci i dati del pagamento:</h2>
      </div>

      <div className="seconda-parte">
        <div className="importo">
          <div className="segno-container">
            <span className="tipo-operazione">
              {segno === "+" ? "Entrata" : "Uscita"}
            </span>
            <div className="segno">
              <button
                className={segno === "+" ? "segno-attivo" : ""}
                onClick={() => setSegno("+")}
              >
                +
              </button>
              <button
                className={segno === "-" ? "segno-attivo" : ""}
                onClick={() => setSegno("-")}
              >
                -
              </button>
            </div>
          </div>
          <span className="euro">€</span>
          <input
            type="number"
            className="input-prezzo"
            placeholder="0,00"
            value={importo}
            onChange={(e) =>
              setImporto(e.target.value === "" ? "" : Number(e.target.value))
            }
          />
        </div>
      </div>

      <div className="terza-parte">
        <h3 className="metodi-di-pagamento-testo">METODI DI PAGAMENTO</h3>
        <div className="bottoni-pagamenti">
          {/* l'indicatore sarebbe l'ozpione selezionata, quindi o contanti o carta */}
          <div
            className={`indicatore ${
              bottoneSelezionato === "contanti" ? "destra" : "sinistra"
            }`}
          ></div>
          <button
            className="metodo"
            onClick={() => setBottoneSelezionato("carta")}
          >
            <img src="icona-carta.svg" alt="Carta" />
            CARTA
          </button>
          <button
            className="metodo"
            onClick={() => setBottoneSelezionato("contanti")}
          >
            <img src="icona-contanti.svg" alt="Contanti" />
            CONTANTI
          </button>
        </div>
      </div>

      <div className="quarta-parte">
        <div className="parte-descrizione">
          <h3 className="descrizione">DESCRIZIONE</h3>
          <input
            type="text"
            className="input-descrizione"
            placeholder="Cosa hai acquistato? Dove?"
            value={descrizione}
            onChange={(e) => setDescrizione(e.target.value)}
          />
        </div>
        <div className="parte-data">
          <h3 className="data">DATA</h3>
          <input
            type="date"
            className="input-data"
            value={data}
            onChange={(e) => setData(e.target.value)}
          />
        </div>
      </div>

      <div className="quinta-parte">
        <button
          className="salva"
          onClick={() => {
            if (!importo || !descrizione || !data)
              return alert("Compila tutti i campi!");

            const importoFinale =
              segno === "-" ? -Number(importo) : Number(importo);

            onSalva({
              id: pagamentoDaModificare ? pagamentoDaModificare.id : Date.now(),
              importo: importoFinale,
              metodo: bottoneSelezionato,
              descrizione,
              data,
            });

            setImporto("");
            setDescrizione("");
            setData("");
          }}
        >
          Salva
        </button>
      </div>
    </main>
  );
}
