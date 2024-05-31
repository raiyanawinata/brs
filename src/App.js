import logo from './logo.svg';
import './App.css';
import NavbarNav from './navbar/NavbarNav';
import TablePeminjaman from './table/TablePeminjaman';
import ChartPeminjaman from './chart/ChartPeminjaman';

function App() {
  return (
    <div className="App">
     <NavbarNav/>
     <TablePeminjaman/>
     <ChartPeminjaman/>
    </div>
  );
}

export default App;
