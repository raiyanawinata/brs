import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';

const apiUrl = process.env.REACT_APP_API_BACKEND;

export default function Top10BookRecommend({ activeCateg }) {
    const [bookRecom, setBookRecom] = useState({ loading: false, data: [], message: "" });

    useEffect(() => {
        fetchRecommendedBookByCateg(activeCateg[0], setBookRecom);
    }, [activeCateg[0]])

    return (
        <div className='card card-flush h-xl-100 border'>
            <div className="card-header pt-5">
                <h3 className="card-title align-items-start flex-column">
                    <span className="card-label fw-bold text-gray-800">
                        Top 10 Book Rekomendasi
                    </span>
                    <span className="text-gray-500 pt-1 fw-semibold fs-6">
                        Kategori <span className="text-primary">{activeCateg[0]}</span>
                    </span>
                </h3>
            </div>
            <div className="card-body">
                <div className="table-responsive">
                    {bookRecom.loading ? (
                        <Spinner animation="border" role="status" />
                    ) : bookRecom.message ? (
                        <AlertNotif color="danger" message={bookRecom.message} />
                    ) : Object.values(bookRecom.data).length > 0 ? (
                        bookRecom.data.map((v, index) => (
                            <div key={index}>
                                <div className='book-recom-item'>
                                    <span className="text-gray-800 fw-bold text-hover-primary fs-6 d-block">
                                        {v.judul}
                                    </span>
                                    <span className="text-gray-500 fw-semibold fs-7 d-block text-start ps-0">
                                        {v.penulis}
                                    </span>
                                </div>
                                <div className='d-flex align-items-center border-0'>
                                    <span className="fw-bold text-gray-800 fs-6 me-3">{v.hybrid_score}</span>
                                    <div className="progress rounded-start-0">
                                        <div className="progress-bar bg-success m-0" role="progressbar" style={{ height: "12px", width: ((v.rating * 100) + "px") }} aria-valuenow={(v.rating * 100)} aria-valuemin="0" aria-valuemax={(v.rating * 100) + "px"}></div>
                                    </div>
                                </div>
                            </div>
                        ))
                    ) : ""}
                </div>
            </div>
        </div>
    )
}

const fetchRecommendedBookByCateg = async (category, setBookRecom) => {
    setBookRecom({ loading: true, data: [], message: "" });
    try {
        const response = await axios.post(apiUrl + '/find_books_and_recommendations_by_category', {
            category_title: category,
            limit: 10
        });
        setBookRecom({ loading: false, data: response.data, message: "" });
    } catch (error) {
        console.error('Error fetching loan data:', error);
        setBookRecom({ loading: false, data: [], message: "Terjadi kesalahan dalam koneksi ke server. Silakan coba lagi nanti." });
    }
};
