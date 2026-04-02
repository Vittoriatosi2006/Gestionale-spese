import "./Recenti.css";
import type { Pagamento } from "./type";

// aggiungi onElimina qui
interface RecentiProps {
  pagamenti: Pagamento[];
  onElimina: (index: number) => void;
}

type PagamentiPerMese = {
  [mese: string]: Pagamento[];
};

export default function Recenti({ pagamenti, onElimina }: RecentiProps) {
  const pagamentiOrdinati = [...pagamenti].sort(
    (a, b) => new Date(b.data).getTime() - new Date(a.data).getTime(),
  );

  const pagamentiPerMese: PagamentiPerMese = {};
  pagamentiOrdinati.forEach((p) => {
    const date = new Date(p.data);
    const mese = date.toLocaleDateString("it-IT", { month: "long" });
    if (!pagamentiPerMese[mese]) {
      pagamentiPerMese[mese] = [];
    }
    pagamentiPerMese[mese].push(p);
  });

  return (
    <main className="recenti-container">
      <h2 className="i-miei-pagamenti">I MIEI PAGAMENTI</h2>

      {Object.entries(pagamentiPerMese).map(([mese, pagamentiDelMese]) => (
        <div key={mese}>
          <h3 className="mese-sezione">{mese}</h3>
          {pagamentiDelMese.map((p, index) => (
            <div
              className="spesa-singola"
              key={index}
              onClick={() => onElimina(pagamenti.indexOf(p))}
              style={{ cursor: "pointer" }}
            >
              <img src="icona-acquisto.svg" className="icona-acquisto" />
              <div className="descrizione-e-data">
                <h3 className="descrizione-pagamento">{p.descrizione}</h3>
                <span className="data-pagamento">
                  {new Date(p.data).toLocaleDateString("it-IT", {
                    day: "numeric",
                    month: "long",
                  })}
                </span>
              </div>
              <div className="prezzo-e-metodo">
                <h3
                  className={`prezzo-pagamento ${
                    p.importo >= 0 ? "entrata" : "spesa"
                  }`}
                >
                  {p.importo >= 0 ? "+" : "-"} €{" "}
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
    </main>
  );
}
