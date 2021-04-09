import "./App.css";
import Search from "./components/search";
require("dotenv").config();

function App() {
  return (
    <div className="App">
      <h1 className="heading-text">MultiTube</h1>
      <Search />
    </div>
  );
}

export default App;
