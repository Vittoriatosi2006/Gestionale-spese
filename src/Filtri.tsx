import "./Filtri.css";

interface FiltriProps {
  tipoFiltro: string;
  setTipoFiltro: (val: string) => void;

  dataDa: string;
  setDataDa: (val: string) => void;

  dataA: string;
  setDataA: (val: string) => void;

  filtroOpen: boolean;
  setFiltroOpen: (val: boolean) => void;
}

export default function Filtri({
  tipoFiltro,
  setTipoFiltro,
  dataDa,
  setDataDa,
  dataA,
  setDataA,
  filtroOpen,
  setFiltroOpen,
}: FiltriProps) {
  return (
    <>
      <div className="barra-filtri">
        <select
          value={tipoFiltro}
          onChange={(e) => setTipoFiltro(e.target.value)}
        >
          <option value="tutti">Tutti</option>
          <option value="entrate">Entrate</option>
          <option value="uscite">Uscite</option>
        </select>

        <div className="azioni-header">
          {(dataDa || dataA) && (
            <button
              className="reset-header"
              onClick={() => {
                setDataDa("");
                setDataA("");
              }}
            >
              Reset
            </button>
          )}

          <button
            className="btn-apri-filtro"
            onClick={() => setFiltroOpen(true)}
          >
            <img src="/icona-filtri.svg" className="icona-filtro" />
          </button>
        </div>
      </div>

      {filtroOpen && (
        <div className="overlay-filtro" onClick={() => setFiltroOpen(false)}>
          <div className="card-filtro" onClick={(e) => e.stopPropagation()}>
            <h3>Filtra per data</h3>

            <div className="campo">
              <label>Da:</label>
              <input
                type="date"
                value={dataDa}
                onChange={(e) => setDataDa(e.target.value)}
              />
            </div>

            <div className="campo">
              <label>A:</label>
              <input
                type="date"
                value={dataA}
                onChange={(e) => setDataA(e.target.value)}
              />
            </div>

            <button className="applica" onClick={() => setFiltroOpen(false)}>
              Applica filtri
            </button>
          </div>
        </div>
      )}
    </>
  );
}
