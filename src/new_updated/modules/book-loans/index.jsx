import React, { useState } from 'react'
import { Spinner } from 'react-bootstrap';
import { AlertNotif } from '../../components/alerts';
import TableData from './TableData';
import Top10BookRecommendedByTitle from '../book-recommended/Top10BookRecommendedByTitle';

export function TopBookLoans({ loanData }) {
    const [selectedBook, setSelectedBook] = useState();

    const HandlerSelectedBook = (data) => {
        setSelectedBook(data);
    }

    if (selectedBook) {
        return <Top10BookRecommendedByTitle bookselected={selectedBook} HandlerSelectedBook={HandlerSelectedBook} />
    } else {
        return (
            <div className='card card-flush h-xl-100 border'>
                <div className="card-header pt-5">
                    <h3 className="card-title align-items-start flex-column">
                        <span className="card-label fw-bold text-gray-800">
                            Daftar Buku Peminjaman
                        </span>
                    </h3>
                </div>
                <div className="card-body py-3">
                    {loanData.loading ? <Spinner animation="border" role="status"></Spinner> :
                        loanData.message ? <AlertNotif color="danger" message={loanData.message} /> :
                            Object.values(loanData.data).length > 0 ? (
                                <TableData data={loanData.data} HandlerSelectedBook={HandlerSelectedBook} />
                            ) : ""
                    }
                </div>
            </div>
        )
    }
}

