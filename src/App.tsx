import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";
import type { Pagamento } from "./type";

function App() {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>([]);

  // Carica dal localStorage
  useEffect(() => {
    const datiSalvati = localStorage.getItem("pagamenti");
    if (datiSalvati) {
      setPagamenti(JSON.parse(datiSalvati));
    }
  }, []);

  const aggiungiPagamento = (p: Pagamento) => {
    const nuoviPagamenti = [p, ...pagamenti];
    setPagamenti(nuoviPagamenti);
    localStorage.setItem("pagamenti", JSON.stringify(nuoviPagamenti));
  };

  const eliminaPagamento = (id: number) => {
    const nuoviPagamenti = pagamenti.filter((p) => p.id !== id);
    setPagamenti(nuoviPagamenti);
    localStorage.setItem("pagamenti", JSON.stringify(nuoviPagamenti));
  };

  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <NewEntry onSalva={aggiungiPagamento} />
        <Recenti pagamenti={pagamenti} onElimina={eliminaPagamento} />
      </div>
    </div>
  );
}

export default App;
