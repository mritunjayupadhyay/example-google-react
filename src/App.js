import { useLoadScript } from "@react-google-maps/api";
import './App.css';
import MapComponent from './components/map/MapComponent';

function App() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
    libraries: ["places"],
  });

  return (
    <div className="App">
      {isLoaded ? <MapComponent /> : <div>Loading...</div>}
    </div>
  );
}

export default App;
