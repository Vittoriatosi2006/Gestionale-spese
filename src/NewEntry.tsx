import "./NewEntry.css";
import "./style.css";

export default function NewEntry() {
  return (
    <main>
      <div className="prima-parte">
        <h1 className="new-entry"> Entrate </h1>
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
        <h3 className="metodi-di-pagamento"> METODO DI PAGAMENTO </h3>
      </div>
    </main>
  );
}
