import { Route, BrowserRouter as Router , Routes } from "react-router"
import { routesArray } from "./constants/routes/index.routes";
import 'react-toastify/dist/ReactToastify.css';

function App() {

  return (
    <>
      <Router>
        <Routes>
          {routesArray.map((route, index) => (
            <Route key={index} path={route.path} element={route.element} />
          ))}
        </Routes>
      </Router>
    </>
  );

}

export default App
