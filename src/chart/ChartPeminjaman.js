// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { Card, Row, Col, Spinner, Alert, Table, Button } from 'react-bootstrap';
// import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
// import TableRec from '../table/TableRec';
// import RecTable from '../table/RecTable';

// const ChartPeminjaman = () => {
//   const [loanData, setLoanData] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [selectedCategory, setSelectedCategory] = useState(null); // State to store selected category
//   const [selectedCategoryBooks, setSelectedCategoryBooks] = useState([]); // State to store books of the selected category
//   const [selectedCategoryRecommendations, setSelectedCategoryRecommendations] = useState([]); // State to store recommendations of the selected category
//   const [showTableRec, setShowTableRec] = useState(false); // State to control showing TableRec
//   const [showRecTable, setShowRecTable] = useState(false); // State to control showing RecTable

//   useEffect(() => {
//     fetchLoanData();
//   }, []);

//   const fetchLoanData = async () => {
//     try {
//       const response = await axios.get('https://ec68-34-106-153-254.ngrok-free.app/loan_data', {
//         headers: {
//           'ngrok-skip-browser-warning': 'true'
//         }
//       });
//       setLoanData(response.data);
//     } catch (error) {
//       console.error('Error fetching loan data:', error);
//       setError('Error fetching loan data. Please try again later.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchCategoryBooks = async (category) => {
//     try {
//       const response = await axios.post('https://ec68-34-106-153-254.ngrok-free.app/recommendation', {
//         selected_categories: [category]
//       });
//       setSelectedCategoryBooks(response.data[category].top_10_books_most_borrowed);
//       setSelectedCategoryRecommendations(response.data[category].top_recommendations);
//       setShowTableRec(true);
//       setShowRecTable(false); // Reset to ensure only one table is shown at a time
//     } catch (error) {
//       console.error('Error fetching category books:', error);
//       setError('Error fetching category books. Please try again later.');
//     }
//   };

//   const getTopAuthors = (data, topN = 10) => {
//     const sortedBooks = data.slice().sort((a, b) => b.total_peminjam - a.total_peminjam);
//     return sortedBooks.slice(0, topN);
//   };

//   const getTopCategories = (data, topN = 10) => {
//     const categoryMap = {};
//     data.forEach(item => {
//       if (!categoryMap[item.kategori]) categoryMap[item.kategori] = 0;
//       categoryMap[item.kategori] += 1;
//     });

//     const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
//     return sortedCategories.slice(0, topN);
//   };

//   const getTopBooks = (data, topN = 10) => {
//     const sortedBooks = data.slice().sort((a, b) => b.total_peminjam - a.total_peminjam);
//     return sortedBooks.slice(0, topN);
//   };

//   const topAuthors = getTopAuthors(loanData);
//   const topCategories = getTopCategories(loanData);
//   const topBooks = getTopBooks(loanData);

//   const handleShowTableRec = (category) => {
//     setSelectedCategory(category);
//     fetchCategoryBooks(category);
//   };

//   const handleShowChartPeminjaman = () => {
//     setShowTableRec(false);
//     setShowRecTable(false);
//   };

//   const handleShowRecTable = () => {
//     setShowRecTable(true);
//     setShowTableRec(false);
//   };

//   if (loading) {
//     return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
//   }

//   if (error) {
//     return <Alert variant="danger">{error}</Alert>;
//   }

//   return (
//     <Row className="mt-4">
//       <Col md={4}>
//         <Card>
//           <Card.Body>
//             <Card.Title>10 Penulis Terpopuler</Card.Title>
//             <Table striped bordered hover style={{ fontSize: '18px' }}>
//               <thead style={{ fontSize: '18px' }}>
//                 <tr>
//                   <th>Nama Penulis</th>
//                   <th>Total Peminjam</th>
//                 </tr>
//               </thead>
//               <tbody style={{ fontSize: '18px' }}>
//                 {topAuthors.map((book, index) => (
//                   <tr key={index}>
//                     <td>{book.penulis}</td>
//                     <td>{book.total_peminjam}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col md={4}>
//         <Card>
//           <Card.Body>
//             <Card.Title>10 Kategori Terpopuler</Card.Title>
//             <ResponsiveContainer width="100%" height={400}>
//               <BarChart data={topCategories} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
//                 <CartesianGrid strokeDasharray="3 3" />
//                 <XAxis dataKey="0" angle={-45} textAnchor="end" interval={0} />
//                 <YAxis />
//                 <Tooltip />
//                 <Legend />
//                 <Bar dataKey="1" fill="#8884d8" />
//               </BarChart>
//             </ResponsiveContainer>

//             {showTableRec ? (
//               <div>
//                 <TableRec books={selectedCategoryBooks} category={selectedCategory} />
//                 <div style={{ marginLeft: '10px', marginTop: '10px' }}>
//                   <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
//                   <Button variant="primary" onClick={handleShowRecTable} style={{ marginLeft: '10px' }}>Lihat Rekomendasi</Button>
//                 </div>
//               </div>
//             ) : showRecTable ? (
//               <div>
//                 <RecTable recommendations={selectedCategoryRecommendations} category={selectedCategory} />
//                 <div style={{ marginLeft: '10px', marginTop: '10px' }}>
//                   <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
//                 </div>
//               </div>
//             ) : (
//               <Table striped bordered hover style={{ fontSize: '18px' }}>
//                 <thead style={{ fontSize: '18px' }}>
//                   <tr>
//                     <th>Nama Kategori</th>
//                     <th>Jumlah Buku</th>
//                     <th>Aksi</th>
//                   </tr>
//                 </thead>
//                 <tbody style={{ fontSize: '18px' }}>
//                   {topCategories.map((category, index) => (
//                     <tr key={index}>
//                       <td>{category[0]}</td>
//                       <td>{category[1]}</td>
//                       <td>
//                         <Button variant="primary" onClick={() => handleShowTableRec(category[0])}>Lihat Data</Button>
//                       </td>
//                     </tr>
//                   ))}
//                 </tbody>
//               </Table>
//             )}
//           </Card.Body>
//         </Card>
//       </Col>
//       <Col md={4}>
//         <Card>
//           <Card.Body>
//             <Card.Title>10 Judul Buku Terpopuler</Card.Title>
//             <Table striped bordered hover style={{ fontSize: '18px' }}>
//               <thead style={{ fontSize: '18px' }}>
//                 <tr>
//                   <th>Judul Buku</th>
//                   <th>Total Peminjam</th>
//                 </tr>
//               </thead>
//               <tbody style={{ fontSize: '18px' }}>
//                 {topBooks.map((book, index) => (
//                   <tr key={index}>
//                     <td>{book.judul}</td>
//                     <td>{book.total_peminjam}</td>
//                   </tr>
//                 ))}
//               </tbody>
//             </Table>
//           </Card.Body>
//         </Card>
//       </Col>
//     </Row>
//   );
// };

// export default ChartPeminjaman;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Card, Row, Col, Spinner, Alert, Table, Button } from 'react-bootstrap';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import TableRec from '../table/TableRec';
import RecTable from '../table/RecTable';

const ChartPeminjaman = () => {
  const [loanData, setLoanData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [selectedCategory, setSelectedCategory] = useState(null); // State to store selected category
  const [selectedCategoryBooks, setSelectedCategoryBooks] = useState([]); // State to store books of the selected category
  const [selectedCategoryRecommendations, setSelectedCategoryRecommendations] = useState([]); // State to store recommendations of the selected category
  const [showTableRec, setShowTableRec] = useState(false); // State to control showing TableRec
  const [showRecTable, setShowRecTable] = useState(false); // State to control showing RecTable

  useEffect(() => {
    fetchLoanData();
  }, []);

  const fetchLoanData = async () => {
    try {
      const response = await axios.get('https://f679-35-237-125-138.ngrok-free.app/loan_data', {
        headers: {
          'ngrok-skip-browser-warning': 'true'
        }
      });
      setLoanData(response.data);
    } catch (error) {
      console.error('Error fetching loan data:', error);
      setError('Error fetching loan data. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const fetchCategoryBooks = async (category) => {
    try {
      const response = await axios.post('https://f679-35-237-125-138.ngrok-free.app/recommendation', {
        selected_categories: [category]
      });
      setSelectedCategoryBooks(response.data[category].top_10_books_most_borrowed);
      setSelectedCategoryRecommendations(response.data[category].top_recommendations);
      setShowTableRec(true);
      setShowRecTable(false); // Reset to ensure only one table is shown at a time
    } catch (error) {
      console.error('Error fetching category books:', error);
      setError('Error fetching category books. Please try again later.');
    }
  };

  const getTopAuthors = (data, topN = 10) => {
    const sortedBooks = data.slice().sort((a, b) => b.total_peminjam - a.total_peminjam);
    return sortedBooks.slice(0, topN);
  };

  const getTopCategories = (data, topN = 10) => {
    const categoryMap = {};
    data.forEach(item => {
      if (!categoryMap[item.kategori]) categoryMap[item.kategori] = 0;
      categoryMap[item.kategori] += item.total_peminjam;
    });

    const sortedCategories = Object.entries(categoryMap).sort((a, b) => b[1] - a[1]);
    return sortedCategories.slice(0, topN);
  };

  const getTopBooks = (data, topN = 10) => {
    const sortedBooks = data.slice().sort((a, b) => b.total_peminjam - a.total_peminjam);
    return sortedBooks.slice(0, topN);
  };

  const topAuthors = getTopAuthors(loanData);
  const topCategories = getTopCategories(loanData);
  const topBooks = getTopBooks(loanData);

  const handleShowTableRec = (category) => {
    setSelectedCategory(category);
    fetchCategoryBooks(category);
  };

  const handleShowChartPeminjaman = () => {
    setShowTableRec(false);
    setShowRecTable(false);
  };

  const handleShowRecTable = () => {
    setShowRecTable(true);
    setShowTableRec(false);
  };

  if (loading) {
    return <Spinner animation="border" role="status"><span className="sr-only">Loading...</span></Spinner>;
  }

  if (error) {
    return <Alert variant="danger">{error}</Alert>;
  }

  return (
    <Row className="mt-4">
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>10 Penulis Terpopuler</Card.Title>
            <Table striped bordered hover style={{ fontSize: '18px' }}>
              <thead style={{ fontSize: '18px' }}>
                <tr>
                  <th>Nama Penulis</th>
                  <th>Total Peminjam</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '18px' }}>
                {topAuthors.map((book, index) => (
                  <tr key={index}>
                    <td>{book.penulis}</td>
                    <td>{book.total_peminjam}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>10 Kategori Terpopuler</Card.Title>
            <ResponsiveContainer width="100%" height={400}>
              <BarChart data={topCategories} margin={{ top: 20, right: 30, left: 20, bottom: 120 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="0" angle={-45} textAnchor="end" interval={0} />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="1" fill="#8884d8" />
              </BarChart>
            </ResponsiveContainer>

            {showTableRec ? (
              <div>
                <TableRec books={selectedCategoryBooks} category={selectedCategory} />
                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                  <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
                  <Button variant="primary" onClick={handleShowRecTable} style={{ marginLeft: '10px' }}>Lihat Rekomendasi</Button>
                </div>
              </div>
            ) : showRecTable ? (
              <div>
                <RecTable recommendations={selectedCategoryRecommendations} category={selectedCategory} />
                <div style={{ marginLeft: '10px', marginTop: '10px' }}>
                  <Button variant="secondary" onClick={handleShowChartPeminjaman}>Kembali</Button>
                </div>
              </div>
            ) : (
              <Table striped bordered hover style={{ fontSize: '18px' }}>
                <thead style={{ fontSize: '18px' }}>
                  <tr>
                    <th>Nama Kategori</th>
                    <th>Jumlah Buku</th>
                    <th>Aksi</th>
                  </tr>
                </thead>
                <tbody style={{ fontSize: '18px' }}>
                  {topCategories.map((category, index) => (
                    <tr key={index}>
                      <td>{category[0]}</td>
                      <td>{category[1]}</td>
                      <td>
                        <Button variant="primary" onClick={() => handleShowTableRec(category[0])}>Lihat Data</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            )}
          </Card.Body>
        </Card>
      </Col>
      <Col md={4}>
        <Card>
          <Card.Body>
            <Card.Title>10 Judul Buku Terpopuler</Card.Title>
            <Table striped bordered hover style={{ fontSize: '18px' }}>
              <thead style={{ fontSize: '18px' }}>
                <tr>
                  <th>Judul Buku</th>
                  <th>Total Peminjam</th>
                </tr>
              </thead>
              <tbody style={{ fontSize: '18px' }}>
                {topBooks.map((book, index) => (
                  <tr key={index}>
                    <td>{book.judul}</td>
                    <td>{book.total_peminjam}</td>
                  </tr>
                ))}
              </tbody>
            </Table>
          </Card.Body>
        </Card>
      </Col>
    </Row>
  );
};

export default ChartPeminjaman;
