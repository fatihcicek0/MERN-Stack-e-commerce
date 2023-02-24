import './App.css';
import { useRoutes } from 'react-router-dom';
import routes from './routes';
import Header from './components/Header';

function App() {
  const showRoutes = useRoutes(routes);

  return (
    <div className="App">
      <Header />
      {showRoutes}
    </div>
  );
}
export default App;
