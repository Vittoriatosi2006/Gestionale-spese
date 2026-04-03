import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";
import type { Pagamento } from "./type";

function App() {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>([]);

  const [pagamentoDaModificare, setPagamentoDaModificare] =
    useState<Pagamento | null>(null);

  // Carica dal localStorage
  useEffect(() => {
    const datiSalvati = localStorage.getItem("pagamenti");
    if (datiSalvati) {
      setPagamenti(JSON.parse(datiSalvati));
    }
  }, []);

  const aggiungiPagamento = (p: Pagamento) => {
    let nuoviPagamenti;

    if (pagamentoDaModificare) {
      // modifica pagamento
      nuoviPagamenti = pagamenti.map((pag) => (pag.id === p.id ? p : pag));
      setPagamentoDaModificare(null);
    } else {
      // nuovo pagamento
      nuoviPagamenti = [p, ...pagamenti];
    }

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
        <NewEntry
          onSalva={aggiungiPagamento}
          pagamentoDaModificare={pagamentoDaModificare}
        />
        <Recenti
          pagamenti={pagamenti}
          onElimina={eliminaPagamento}
          onModifica={setPagamentoDaModificare}
        />
      </div>
    </div>
  );
}

export default App;
