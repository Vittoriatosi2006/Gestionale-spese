import "./Recenti.css";
import type { Pagamento } from "./type";

interface RecentiProps {
  pagamenti: Pagamento[];
}

export default function Recenti({ pagamenti }: RecentiProps) {
  return (
    <main className="recenti-container">
      <h2 className="i-miei-pagamenti">I MIEI PAGAMENTI</h2>
      {pagamenti.map((p, index) => (
        <div className="spesa-singola" key={index}>
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
            <h3 className="prezzo-pagamento">€ {p.importo.toFixed(2)}</h3>
            <span className="metodo-pagamento">
              {p.metodo === "carta" ? "Carta" : "Contanti"}
            </span>
          </div>
        </div>
      ))}
    </main>
  );
}
