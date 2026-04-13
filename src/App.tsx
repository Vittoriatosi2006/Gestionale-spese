import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";
import type { Pagamento } from "./type";

function App() {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>([]);
  const [pagamentoDaModificare, setPagamentoDaModificare] =
    useState<Pagamento | null>(null); //se si fa un pagamentoche già esiste lo modifica, se è null ne crea uno nuovo
  const [showSaldo, setShowSaldo] = useState(false); //mostra o nasconde la card con i saldi totali
  const [cassaforte, setCassaforte] = useState<number>(0); //importo totale della casssaforte, e si modifica a mano

  useEffect(() => {
    const dati = localStorage.getItem("pagamenti");
    if (dati) setPagamenti(JSON.parse(dati)); //json.parse trasforma la stringa in un array di oggetti

    const safe = localStorage.getItem("cassaforte");
    if (safe) setCassaforte(Number(safe)); //Number(safe) = lo trasforma da stringa a numero
  }, []);

  const aggiornaCassaforte = (val: number) => {
    setCassaforte(val);
    localStorage.setItem("cassaforte", String(val));
  };

  // CALCOLI AUTOMATICI
  const totaleCarta = pagamenti
    .filter((p) => p.metodo === "carta")
    .reduce((acc, p) => acc + p.importo, 0);
  const totaleContanti = pagamenti
    .filter((p) => p.metodo === "contanti")
    .reduce((acc, p) => acc + p.importo, 0);

  const aggiungiPagamento = (p: Pagamento) => {
    let nuovi;
    if (pagamentoDaModificare) {
      nuovi = pagamenti.map((pag) => (pag.id === p.id ? p : pag)); //se stiamo modificando un id gia esistente lo sostituisce, altrimenti lascia tutto com'è
      setPagamentoDaModificare(null);
    } else {
      nuovi = [p, ...pagamenti];
    } //sennò aggiunge un nuovo pagamento in cima alla lista
    setPagamenti(nuovi);
    localStorage.setItem("pagamenti", JSON.stringify(nuovi));
  };

  const eliminaPagamento = (id: number) => {
    const nuovi = pagamenti.filter((p) => p.id !== id);
    setPagamenti(nuovi);
    localStorage.setItem("pagamenti", JSON.stringify(nuovi)); //json.stringify trasforma l'array di oggetti in una stringa
  };

  return (
    <div className="App">
      <Navbar
        totaleCarta={totaleCarta}
        totaleContanti={totaleContanti}
        cassaforte={cassaforte}
        setCassaforte={aggiornaCassaforte}
        showSaldo={showSaldo}
        setShowSaldo={setShowSaldo}
      />

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
