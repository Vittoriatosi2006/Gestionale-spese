import { useState } from "react";
import "./NewEntry.css";
import "./style.css";

export default function NewEntry() {
  const [bottoneSelezionato, setBottoneSelezionato] = useState("");

  return (
    <main>
      <div className="prima-parte">
        <h1 className="entrate"> Entrate </h1>
        <h2 className="inserisci-dati"> Inserisci i dati del pagamento: </h2>
      </div>

      <div className="seconda-parte">
        <h3 className="amount"> AMOUNT </h3>
        <div className="importo">
          <span className="euro"> €</span>
          <input type="number" className="input-prezzo" placeholder="0,00" />
        </div>
      </div>

      <div className="terza-parte">
        <h3 className="metodi-di-pagamento-testo">METODI DI PAGAMENTO</h3>
        <div className="bottoni-pagamenti">
          <div
            className={`indicatore ${
              bottoneSelezionato === "contanti" ? "destra" : "sinistra"
            }`}
          ></div>
          <button
            className="metodo"
            onClick={() => setBottoneSelezionato("carta")}
          >
            <img src="icona-carta.svg" />
            CARTA
          </button>
          <button
            className="metodo"
            onClick={() => setBottoneSelezionato("contanti")}
          >
            <img src="icona-contanti.svg" />
            CONTANTI
          </button>
        </div>
      </div>

      <div className="quarta-parte">
        <div className="parte-descrizione">
          <h3 className="descrizione"> DESCRIZIONE</h3>
          <input
            type="text"
            className="input-descrizione"
            placeholder="Cosa hai acquistato? Dove?"
          />
        </div>
        <div className="parte-data">
          <h3 className="data"> DATA </h3>
          <input type="date" className="input-data" />
        </div>
      </div>
    </main>
  );
}
