import { useState } from "react";
import "./Navbar.css";
import "./style.css";

interface NavbarProps {
  totaleCarta: number;
  totaleContanti: number;
  cassaforte: number;
  setCassaforte: (n: number) => void;
  showSaldo: boolean;
  setShowSaldo: (b: boolean) => void;
}

export default function Navbar({
  totaleCarta,
  totaleContanti,
  cassaforte,
  setCassaforte,
  showSaldo,
  setShowSaldo,
}: NavbarProps) {
  const [editing, setEditing] = useState(false);

  const oggi = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
  });

  return (
    <>
      <nav className="navbar">
        <div className="navbar-sinistra">
          <img
            src="/icona-principale.svg"
            className="icona-navbar"
            onClick={() => setShowSaldo(!showSaldo)}
          />

          <div className="titoli">
            <h2 className="i-miei-soldini">I MIEI SOLDINI</h2>
            <h3 className="ricordati">
              Ricordati di conservali, non di spenderli!
            </h3>
          </div>
        </div>

        <div className="navbar-destra">
          <span className="data-di-oggi">{oggi}</span>
        </div>
      </nav>

      {showSaldo && (
        <div className="overlay" onClick={() => setShowSaldo(false)}>
          <div className="saldo-card" onClick={(e) => e.stopPropagation()}>
            <h3>Totale soldi</h3>

            {/* CARTA */}
            <div className="riga-saldo">
              <img src="/icona-carta.svg" className="icona-saldo" />
              <span> Carta</span>
              <div className="valore">€ {totaleCarta.toFixed(2)}</div>
            </div>

            {/* CONTANTI */}
            <div className="riga-saldo">
              <img src="/icona-contanti.svg" className="icona-saldo" />
              <span>Contanti</span>
              <div className="valore">€ {totaleContanti.toFixed(2)}</div>
            </div>

            {/* CASSAFORTE */}
            <div className="riga-saldo cassaforte">
              <img src="/icona-cassaforte.svg" className="icona-saldo" />

              <span>Cassaforte</span>

              <div
                className="valore"
                onClick={() => !editing && setEditing(true)}
              >
                {editing ? (
                  <input
                    type="number"
                    value={cassaforte}
                    onChange={(e) => setCassaforte(Number(e.target.value))}
                    onBlur={() => setEditing(false)}
                    autoFocus
                  />
                ) : (
                  <>€ {cassaforte.toFixed(2)}</>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
