import Navbar from "./Navbar";
import NewEntry from "./NewEntry";
import Recenti from "./Recenti";

function App() {
  return (
    <div className="App">
      <Navbar />
      <div className="main-content">
        <NewEntry />
        <Recenti />
      </div>
    </div>
  );
}

export default App;
