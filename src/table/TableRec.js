import React from 'react';
import { Table } from 'react-bootstrap';
import './TableNav.css'; // Import custom CSS for additional styling

const TableRec = ({ books, category }) => {
  return (
    <div className="table-responsive" style={{ maxHeight: '600px', overflowY: 'scroll', fontSize:'18px' }}>
      <h3>Top 10 Books in {category}</h3>
      <Table bordered hover className="table-custom">
        <thead className="bg-purple text-white">
          <tr>
            <th>No.</th>
            <th>Judul Buku</th>
            <th>Total Peminjam</th>
          </tr>
        </thead>
        <tbody>
          {books.map((book, index) => (
            <tr key={index}>
              <td>{index + 1}</td>
              <td>{book.judul}</td>
              <td>{book.total_peminjam}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default TableRec;
