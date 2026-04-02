import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";
import type { Pagamento } from "./type";

function App() {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>([]);

  // Carica i pagamenti dal localStorage quando il componente si monta
  useEffect(() => {
    const datiSalvati = localStorage.getItem("pagamenti");
    if (datiSalvati) {
      setPagamenti(JSON.parse(datiSalvati));
    }
  }, []);

  const aggiungiPagamento = (p: Pagamento) => {
    const nuoviPagamenti = [p, ...pagamenti]; // aggiunge in cima alla lista
    setPagamenti(nuoviPagamenti);
    localStorage.setItem("pagamenti", JSON.stringify(nuoviPagamenti)); // <-- qui si salva
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <NewEntry onSalva={aggiungiPagamento} />
        <Recenti pagamenti={pagamenti} />
      </div>
    </div>
  );
}

export default App;
