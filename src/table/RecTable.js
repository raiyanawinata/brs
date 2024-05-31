import React from 'react';
import { Table } from 'react-bootstrap';
import './TableNav.css'; // Import custom CSS for additional styling

const RecTable = ({ recommendations, category }) => {
  return (
    <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'scroll', fontSize:'18px' }}>
      <h3>Top Recommendations in {category}</h3>
      <Table bordered hover className="table-custom">
        <thead className="bg-purpletext-white">
          <tr>
            <th>No.</th>
            <th>Judul Buku</th>
            <th>Penulis</th>
            <th>Kategori</th>
            <th>Tahun Terbit</th>
            <th>Rating</th>

          </tr>
        </thead>
        <tbody>
          {recommendations.map((book, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.judul}</td>
              <td>{book.penulis}</td>
              <td>{book.kategori}</td>
              <td>{book.tahun_terbit}</td>
              <td>{book.rating}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default RecTable;