import "./App.css";
import Search from "./components/search";
require("dotenv").config();

//could pass each query down here to search component children
function App() {
  return (
    <div className="App">
      <h1>MultiTube</h1>
      <Search />
    </div>
  );
}

export default App;
