import { Provider } from "react-redux";
import store from "./redux/store";

import Container from "./components/container/Container";

const App = () => {
  return (
    <Provider store={store}>
      <Container />
    </Provider>
  );
};

export default App;
