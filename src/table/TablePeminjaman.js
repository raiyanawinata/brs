import React, { useState, useEffect } from 'react';
import { Table, Container, Spinner, Alert } from 'react-bootstrap';
import axios from 'axios';
import './TableNav.css'; // Import custom CSS for additional styling

const TablePeminjaman = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      const response = await axios.get('https://f74e-34-82-232-76.ngrok-free.app/loan_data');
      setLoanData(response.data);
      setLoading(false);
    } catch (error) {
      setError('Error fetching loan data. Please try again later.');
      setLoading(false);
    }
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Container fluid className="mt-4">
      <h4 className="table-title text-purple mb-4">Data Peminjaman</h4>
      <div className="table-responsive">
        <Table bordered hover className="table-custom">
          <thead className="bg-purple text-white">
            <tr>
              <th>No.</th>
              <th>Judul Buku</th>
              <th>Penulis</th>
              <th>Kategori</th>
              <th>Tahun Terbit</th>
              <th>Total Peminjam</th>
            </tr>
          </thead>
          <tbody>
          {Array.isArray(loanData) ? (
          loanData.map((item, index) => (
    <tr key={index}>
      <td>{index + 1}</td>
      <td>{item.judul}</td>
      <td>{item.penulis}</td>
      <td>{item.kategori}</td>
      <td>{item.tahun_terbit}</td>
      <td>{item.total_peminjam}</td>
    </tr>
  ))
) : (
  <tr>
    <td colSpan="6">No data available</td>
  </tr>
)}

          </tbody>
        </Table>
      </div>
    </Container>
  );
};

export default TablePeminjaman;
