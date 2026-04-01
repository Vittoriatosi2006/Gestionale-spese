import { useState } from "react";
import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";
import type { Pagamento } from "./type";

function App() {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>([]);

  const aggiungiPagamento = (p: Pagamento) => {
    setPagamenti([p, ...pagamenti]); // aggiunge in cima alla lista
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
