import { useEffect, useState } from "react";
import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";
import type { Pagamento } from "./type";

function App() {
  const [pagamenti, setPagamenti] = useState<Pagamento[]>([]); //pagamenti è la lista principale di tutti i movimenti salvati
  const [pagamentoDaModificare, setPagamentoDaModificare] =
    useState<Pagamento | null>(null); //se si fa su un pagamento che già esiste serve a modificarlo, se è null ne creo uno nuovo
  const [showSaldo, setShowSaldo] = useState(false); //mostra o nasconde la card con i saldi totali
  const [adjustCarta, setAdjustCarta] = useState<string>(""); //serve a tenere traccia di quanto l'utente vuole aggiungere o togliere al saldo carta manualmente
  const [adjustContanti, setAdjustContanti] = useState<string>(""); //serve a tenere traccia di quanto l'utente vuole aggiungere o togliere al saldo contanti manualmente
  const [cassaforte, setCassaforte] = useState<number>(0); //importo totalle  della cassaforte, e si modifica a mano

  //somme automatiche basate sui pagamenti salvati
  const totaleCarta = pagamenti
    .filter((p) => p.metodo === "carta")
    .reduce((acc, p) => acc + p.importo, 0);
  const totaleContanti = pagamenti
    .filter((p) => p.metodo === "contanti")
    .reduce((acc, p) => acc + p.importo, 0);

  //queste due costanti servono per mostrare il saldo aggiornato quando si modifica il saldo manualmente
  const totaleCartaFinale = totaleCarta + (Number(adjustCarta) || 0);
  const totaleContantiFinale = totaleContanti + (Number(adjustContanti) || 0);

  useEffect(() => {
    const datiSalvati = localStorage.getItem("pagamenti");
    if (datiSalvati) {
      setPagamenti(JSON.parse(datiSalvati));
    }
  }, []);

  const aggiungiPagamento = (p: Pagamento) => {
    let nuoviPagamenti;

    if (pagamentoDaModificare) {
      // p = pagamento modificato o nuovo, pag = ogni ele,e to dell'rray  pagamenti
      // se c'è un nnhovo p, viene aggiunti, ltrimenti rimane quellp vecchio
      nuoviPagamenti = pagamenti.map((pag) => (pag.id === p.id ? p : pag));
      setPagamentoDaModificare(null);
    } else {
      nuoviPagamenti = [p, ...pagamenti];
    }

    setPagamenti(nuoviPagamenti);
    localStorage.setItem("pagamenti", JSON.stringify(nuoviPagamenti));
  };
  {
    /* json.stringify trasfora un oggetto js in una stringa */
  }

  const eliminaPagamento = (id: number) => {
    const nuoviPagamenti = pagamenti.filter((p) => p.id !== id);
    setPagamenti(nuoviPagamenti);
    localStorage.setItem("pagamenti", JSON.stringify(nuoviPagamenti));
  };

  return (
    <div className="App">
      <Navbar
        totaleCarta={totaleCartaFinale}
        totaleContanti={totaleContantiFinale}
        cassaforte={cassaforte}
        setCassaforte={setCassaforte}
        showSaldo={showSaldo}
        setShowSaldo={setShowSaldo}
        adjustCarta={adjustCarta}
        setAdjustCarta={setAdjustCarta}
        adjustContanti={adjustContanti}
        setAdjustContanti={setAdjustContanti}
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
