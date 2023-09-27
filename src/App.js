import { useLocation } from 'react-router-dom';
import './App.css';
import Header from "./components/core/header/Header";
import Footer from "./components/core/footer/Footer";
import CreateRoutes from './components/routes/Routes';

const App = () => {
  const location = useLocation();
  
  return(
    <>
      <div id="wrapper">
        {/* {location.pathname !== "/" ? "" : <Header />} */}
        <main id="main">
          <CreateRoutes />
        </main>
        {/* {location.pathname !== "/" ? "" : <Footer />} */}
      </div>
    </>
  )
}
export default App