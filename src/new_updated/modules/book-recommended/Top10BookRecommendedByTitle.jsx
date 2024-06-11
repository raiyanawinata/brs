// import React from 'react'

// export default function Top10BookRecommendedByTitle({ bookselected, HandlerSelectedBook }) {
//     return (
//         <div className='card card-flush h-xl-100 border'>
//             <div className="card-header pt-5">
//                 <div className="card-title align-items-center">
//                     <button className="btn btn-icon" type='button' onClick={() => HandlerSelectedBook(null)}>
//                         <i className="bi bi-arrow-left-circle fs-2x"></i>
//                     </button>
//                     <div className='d-flex ms-3'>
//                         <div className='d-flex flex-column border border-dashed rounded p-3 bg-light'>
//                             <span className="card-label fw-bold text-gray-800">
//                                 Buku {bookselected.judul}
//                             </span>
//                             <span className="text-gray-500 pt-1 fw-semibold fs-6">Kategori <span className="text-primary">{bookselected.kategori}</span></span>
//                         </div>

//                         <div className='d-flex flex-column mx-3 border border-dashed rounded p-3 bg-light'>
//                             <span className="card-label fw-bold text-gray-800">
//                                 Penulis: {bookselected.penulis}
//                             </span>
//                             <div className="d-flex">
//                                 <span className="text-gray-500 pt-1 fw-semibold fs-6 me-2">Tahun terbit <span className="text-primary">{bookselected.tahun_terbit}</span></span>
//                                 <span className="text-gray-500 pt-1 fw-semibold fs-6">· Dipinjam sebanyak <span className="text-primary">{bookselected.total_peminjam}x</span></span>
//                             </div>
//                         </div>
//                     </div>

//                 </div>
//             </div>
//             <div className="card-body py-8">
//                 <h3>Daftar Buku Rekomendasi:</h3>
//                 <div className="table-responsive">
//                     <table className="table table-row-dashed align-middle gs-0 gy-4">
//                         <thead>
//                             <tr className='fs-7 fw-bold border-0 text-gray-500'>
//                                 <th>No</th>
//                                 <th>Judul</th>
//                                 <th>Penulis</th>
//                                 <th>Kategori</th>
//                                 <th>Rating</th>
//                                 <th>Score</th>
//                             </tr>
//                         </thead>
//                         <tbody>
//                             <tr>
//                                 <td colSpan={6}>
//                                     Belum ada data buku
//                                 </td>
//                             </tr>
//                         </tbody>
//                     </table>
//                 </div>
//             </div>
//         </div>
//     )
// }

import React from 'react'
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';

export default function Top10BookRecommendedByTitle({ bookselected, recommendations, onBack }) {
    return (
        <div className='card card-flush h-xl-100 border'>
            <div className="card-header pt-5">
                <div className="card-title align-items-center">
                    <button className="btn btn-icon" type='button' onClick={onBack}>
                        <i className="bi bi-arrow-left-circle fs-2x"></i>
                    </button>
                    <div className='d-flex ms-3'>
                        <div className='d-flex flex-column border border-dashed rounded p-3 bg-light'>
                            <span className="card-label fw-bold text-gray-800">
                                Buku {bookselected.judul}
                            </span>
                            <span className="text-gray-500 pt-1 fw-semibold fs-6">Kategori <span className="text-primary">{bookselected.kategori}</span></span>
                        </div>

                        <div className='d-flex flex-column mx-3 border border-dashed rounded p-3 bg-light'>
                            <span className="card-label fw-bold text-gray-800">
                                Penulis: {bookselected.penulis}
                            </span>
                            <div className="d-flex">
                                <span className="text-gray-500 pt-1 fw-semibold fs-6 me-2">Tahun terbit <span className="text-primary">{bookselected.tahun_terbit}</span></span>
                                <span className="text-gray-500 pt-1 fw-semibold fs-6">· Dipinjam sebanyak <span className="text-primary">{bookselected.total_peminjam}x</span></span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className="card-body py-8">
                <h3>Daftar Buku Rekomendasi:</h3>
                <div className="table-responsive">
                    {recommendations.loading ? (
                        <Spinner animation="border" role="status" />
                    ) : recommendations.message ? (
                        <AlertNotif color="danger" message={recommendations.message} />
                    ) : recommendations.data.length > 0 ? (
                        <table className="table table-row-dashed align-middle gs-0 gy-4">
                            <thead>
                                <tr className='fs-7 fw-bold border-0 text-gray-500'>
                                    <th>No</th>
                                    <th>Judul</th>
                                    <th>Penulis</th>
                                    <th>Kategori</th>
                                    <th>Rating</th>
                                    <th>Score</th>
                                </tr>
                            </thead>
                            <tbody>
                                {recommendations.data.map((v, index) => (
                                    <tr key={index}>
                                        <td>{index + 1}</td>
                                        <td>{v.judul}</td>
                                        <td>{v.penulis}</td>
                                        <td>{v.kategori}</td>
                                        <td>{v.rating}</td>
                                        <td>{v.hybrid_score}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <tr>
                            <td colSpan={6}>
                                Belum ada data buku
                            </td>
                        </tr>
                    )}
                </div>
            </div>
        </div>
    )
}
