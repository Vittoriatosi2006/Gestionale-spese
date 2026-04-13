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
  adjustCarta: string;
  setAdjustCarta: (n: string) => void;
  adjustContanti: string;
  setAdjustContanti: (n: string) => void;
}

export default function Navbar({
  totaleCarta,
  totaleContanti,
  cassaforte,
  setCassaforte,
  showSaldo,
  setShowSaldo,
  adjustCarta,
  setAdjustCarta,
  adjustContanti,
  setAdjustContanti,
}: NavbarProps) {
  const [editing, setEditing] = useState<
    "carta" | "contanti" | "cassaforte" | null
  >(null);

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
            <h2 className="i-miei-soldini">I miei soldini</h2>
            <h3 className="ricordati">
              Ricordati di conservali, non di spenderli!
            </h3>
          </div>
        </div>

        <div className="navbar-destra">
          <span className="data-di-oggi">{oggi}</span>
          <img src="/icona-calendario.png" className="icona-calendario" />
        </div>
      </nav>

      {showSaldo && (
        <div className="overlay" onClick={() => setShowSaldo(false)}>
          <div className="saldo-card" onClick={(e) => e.stopPropagation()}>
            <h3>Totale soldi</h3>

            {/* CARTA */}
            <div className="riga-saldo">
              <span>💳 Carta</span>

              {editing === "carta" ? (
                <input
                  type="number"
                  value={adjustCarta}
                  onChange={(e) => setAdjustCarta(e.target.value)}
                  onBlur={() => setEditing(null)} //quando smetto di modificare l’input, esco dalla modalità modifica
                  autoFocus //quando questo input appare, mettici subito il cursore dentro
                />
              ) : (
                <div className="valore">
                  € {totaleCarta.toFixed(2)}
                  <span onClick={() => setEditing("carta")} className="edit">
                    ✏️
                  </span>
                </div>
              )}
            </div>

            {/* CONTANTI */}
            <div className="riga-saldo">
              <span>👛 Contanti</span>

              {editing === "contanti" ? (
                <input
                  type="number"
                  value={adjustContanti}
                  onChange={(e) => setAdjustContanti(e.target.value)}
                  onBlur={() => setEditing(null)}
                  autoFocus
                />
              ) : (
                <div className="valore">
                  € {totaleContanti.toFixed(2)}
                  <span onClick={() => setEditing("contanti")} className="edit">
                    ✏️
                  </span>
                </div>
              )}
            </div>

            {/* CASSAFORTE */}
            <div className="riga-saldo">
              <span>🔐 Cassaforte</span>

              {editing === "cassaforte" ? (
                <input
                  type="number"
                  value={String(cassaforte)}
                  onChange={(e) => setCassaforte(Number(e.target.value))}
                  onBlur={() => setEditing(null)}
                  autoFocus
                />
              ) : (
                <div className="valore">
                  € {cassaforte.toFixed(2)}
                  <span
                    onClick={() => setEditing("cassaforte")}
                    className="edit"
                  >
                    ✏️
                  </span>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </>
  );
}
