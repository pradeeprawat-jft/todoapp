import "./App.css";
import Body from "./components/Body";
import { Provider } from "react-redux";
import appStore from "./utils/appStore";

function App() {
  return (
    <div className="container-fluid p-0">
      <Provider store={appStore}>
        <Body></Body>
      </Provider>
    </div>
  );
}

export default App;
