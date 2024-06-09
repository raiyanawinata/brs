import React, { useEffect, useState } from 'react'
import { TopBookLoans } from './book-loans'
import { CalculateCard } from './calculate-books'
import { CardDataMaster } from './calculate-books/CalculateCard';
import PopularItems from './popular-items';
import axios from 'axios';


const apiUrl = process.env.REACT_APP_API_BACKEND;
export default function Contents() {
  const [loanData, setLoadData] = useState({ loading: false, data: [], message: "" });

  useEffect(() => {
    fetchLoanData(setLoadData)
  }, []);


  const currentCollectionBook = { total: 23456, name: "Total koleksi" };
  const currentBookLoan = { total: Object.values(loanData.data).length , name: "Total dipinjam" };

  const currentTotalCategory = { total: 12, name: "Total koleksi" };
  const currentTotalLoanByCategory = { total: 8, name: "Total dipinjam" };

  const navTabs = [{ id: 1, name: "Daftar Buku Dipinjam", content: "nav-loan-book", component: <TopBookLoans loanData={loanData} /> },
  { id: 2, name: "Popular Item", content: "nav-popularity", component: <PopularItems loanData={loanData} /> }]
  const [activeTab, setActiveTab] = useState(0);

  return (
    <>
      <div className="my-5 row">
        <div className="col-6 col-lg-4">
          <CardDataMaster />
        </div>

        <div className="col-6 col-lg-4">
          <CalculateCard title="Koleksi Buku" original={currentCollectionBook} calculate={currentBookLoan} />
        </div>

        <div className="col-6 col-lg-4">
          <CalculateCard title="Kategori Buku" original={currentTotalCategory} calculate={currentTotalLoanByCategory} />
        </div>

      </div>
      <ul className="nav nav-underline my-10" role="tablist" id="nav-tab">
        {navTabs.map((v, index) => (
          <li key={index} className={`nav-link fw-bold ${activeTab === index ? 'active' : 'text-dark'}`} id={"menu-" + v.content} data-bs-toggle="tab" data-bs-target={"#" + v.content} type="button" role="tab" aria-controls="nav-home" aria-selected="true" onClick={() => setActiveTab(index)}>
            {v.name}
          </li>
        ))}
      </ul >
      <div className="tab-content" id='nav-tabContent'>
        {navTabs[activeTab].component}
      </div >
    </>
  )
}

const fetchLoanData = async (setLoanData) => {
  setLoanData({ loading: true, data: [], message: "" });
  try {
    const response = await axios.get(apiUrl + '/loan_data', {
      headers: {
        'ngrok-skip-browser-warning': 'true'
      }
    });
    setLoanData({ loading: false, data: response.data, message: "" });
  } catch (error) {
    console.error('Error fetching loan data:', error);
    setLoanData({ loading: false, data: [], message: "Terjadi kesalahan dalam koneksi ke server. Silakan coba lagi nanti." });
  }
};