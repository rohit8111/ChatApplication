
import './App.css';
import Routes from "./routes/index"
import AuthProvider from './context/authProvider';

function App() {
  return (
    <AuthProvider>
      <Routes/>
    </AuthProvider>
  );
}

export default App;
