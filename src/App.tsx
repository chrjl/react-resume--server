import AppBar from './components/AppBar';
import Document from './components/Document';
import './styles/App.css';

export default function App() {
  const debug = `debug area`;
  return (
    <>
      <div id="app-bar">
        <AppBar />
      </div>
      <div id="document">
        <Document />
      </div>
    </>
      <textarea
        id="debug-area"
        style={{ width: '100%' }}
        rows={20}
        value={debug}
        readOnly
      ></textarea>
  );
}
