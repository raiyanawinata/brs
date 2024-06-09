import React, { useState, useMemo } from "react";
import { TextSearch } from "../../components/text-box";
import { ButtonRefresh } from "../../components/buttons";
import PaginationComponent from "../../components/paginations";


export default function TableData({ data, HandlerSelectedBook }) {
    const [totalItems, setTotalItems] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);
    const [search, setSearch] = useState("");
    const [sorting, setSorting] = useState({ field: "", order: "" });
    const ITEMS_PER_PAGE = 10;

    const ResultData = useMemo(() => {
        let computedData = data;
        if (search) {
            computedData = computedData.filter((listData) => {
                return Object.keys(listData).some(
                    (key) =>
                        listData[key]
                            .toString()
                            .toLowerCase()
                            .includes(search)
                    //console.log(key,listData[key])
                );
            });
        }
        computedData.sort((a, b) => (a.total_pinjam > b.total_pinjam ? 1 : -1));
        setTotalItems(computedData.length);
        if (sorting.field) {
            const reversed = sorting.order === "asc" ? 1 : -1;
            computedData = computedData.sort(
                (a, b) => reversed * a[sorting.field].localeCompare(b[sorting.field])
            );
        }
        if (computedData.length > 0) {
            return computedData.slice(
                (currentPage - 1) * ITEMS_PER_PAGE,
                (currentPage - 1) * ITEMS_PER_PAGE + ITEMS_PER_PAGE
            );
        } else {
            return [];
        }

    }, [data, currentPage, search, sorting]);

    return (
        <div className="table-responsive">
            <div className="mb-3 d-flex justify-content-between align-items-center">
                <div>
                    <TextSearch onChange={(e) => setSearch(e.target.value)} />
                </div>
                <div>
                    <ButtonRefresh
                        totalItem={totalItems}
                    />
                </div>
            </div>
            <table className="table table-row-dashed align-middle gs-0 gy-4">
                <thead>
                    <tr className='fs-7 fw-bold border-0 text-gray-500'>
                        <th className='w-10px'>No</th>
                        <th>Judul</th>
                        <th>Kategori</th>
                        <th>Penulis</th>
                        <th>Tahun Terbit</th>
                        <th>Total Pinjam</th>
                        <th>Cari Rekomendasi</th>
                    </tr>
                </thead>
                <tbody>
                    {ResultData.map((v, index) => (
                        <tr key={index}>
                            <td>{index + 1}</td>
                            <td>{v.judul}</td>
                            <td>{v.kategori}</td>
                            <td>{v.penulis}</td>
                            <td>{v.tahun_terbit}</td>
                            <td>{v.total_peminjam}</td>
                            <td>
                                <button className="btn btn-icon btn-sm btn-light" type="button" onClick={()=>HandlerSelectedBook(v)}>
                                    <i className="bi bi-search"></i>
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            {totalItems > 0 ? (
                <div className="footer">
                    <PaginationComponent
                        total={totalItems}
                        itemsPerPage={ITEMS_PER_PAGE}
                        currentPage={currentPage}
                        onPageChange={(page) => setCurrentPage(page)}
                    />
                </div>
            ) : ""}
        </div>
    )
}
