import { BrowserRouter } from "react-router-dom";
import Router from "./router/Router";
import { RecoilRoot } from "recoil";

const App = ({ children }: any) => {
  return (
    <BrowserRouter>
      <RecoilRoot>
        <Router />
        {children}
      </RecoilRoot>
    </BrowserRouter>
  );
};

export default App;
