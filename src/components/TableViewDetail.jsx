import { memo } from 'react'
import { convertDateFormat, convertRupiahFormat } from "../utils/global"

import { FaPencil, FaTrash } from "react-icons/fa6"
import Table from "../components/Table"
import IconCategory from "../components/IconCategory"
import TooltipC from "../components/TooltipC"

const TableViewDetail = memo(({ data, action, classHeight, handleEdit, handleDelete }) => {
    const dataDetails = data.flatMap(transaction => transaction.details);
    const columnsArr = [
        { title: '', className: '', width: '5%' },
        { title: 'Tanggal', className: '', width: '25%' },
        { title: 'Deskripsi', className: '', width: '40%' },
        { title: 'Nominal', className: 'text-end', width: '20%' },
    ];
    if (action) columnsArr.push({ title: 'Aksi', className: 'text-end', width: '10%' });

    return (
        <Table columns={columnsArr} classHeight={classHeight}>
            {
                data.length ? (
                    dataDetails.map((detail) => (
                        <tr key={detail.id}>
                            <td style={{ width: '5%' }} className="p-1 align-top">
                                <TooltipC title={detail.category}>
                                    <IconCategory icon={detail.category_icon} size={30} type={detail.type_trans} />
                                </TooltipC>
                            </td>
                            <td style={{ width: '25%' }} className="p-1 align-top">{convertDateFormat(detail.date)}</td>
                            <td style={{ width: '40%' }} className="p-1 align-top">{detail.description}</td>
                            <td style={{ width: '20%' }} className="p-1 text-end text-nowrap align-top">{convertRupiahFormat(detail.value)}</td>
                            <td style={{ width: '10%' }} className={`p-1 align-top ${action ? '' : 'd-none'}`}>
                                <div className="input-group flex-nowrap justify-content-end">
                                    <button className="btn btn-sm btn-primary" onClick={() => handleEdit(detail.id)}>
                                        <TooltipC title="Edit">
                                            <FaPencil />
                                        </TooltipC>
                                    </button>
                                    <button className="btn btn-sm btn-warning" onClick={() => handleDelete(detail.id)}>
                                        <TooltipC title="Hapus">
                                            <FaTrash />
                                        </TooltipC>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="text-center" colSpan={5}>Tidak ada data</td>
                    </tr>
                )
            }
        </Table>
    )
})

export default TableViewDetail;