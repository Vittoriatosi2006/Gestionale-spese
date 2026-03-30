import "./Navbar.css";
import "./style.css";

export default function Navbar() {
  /*data di oggi*/
  const oggi = new Date().toLocaleDateString("it-IT", {
    day: "numeric",
    month: "short",
  });

  return (
    <nav className="navbar">
      <div className="navbar-sinistra">
        <img src="/icona-navbar.png" className="icona-navbar" />
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
  );
}
