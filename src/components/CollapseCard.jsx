import { memo, useRef, useEffect, Fragment } from 'react'
import Collapse from 'bootstrap/js/dist/collapse'
import { convertDateFormat, convertRupiahFormat } from "../utils/global"

import { FaPencil, FaTrash } from "react-icons/fa6"
import IconCategory from "../components/IconCategory"
import TooltipC from "../components/TooltipC"

const CollapseCard = memo(({ detail, handleEdit, handleDelete }) => {
    const collapseRef = useRef(null);
    const bsCollapseRef = useRef(null);

    const handleToggle = () => {
        if (bsCollapseRef.current) {
            bsCollapseRef.current.toggle();
        }
    };

    useEffect(() => {
        if (collapseRef.current) {
            bsCollapseRef.current = new Collapse(collapseRef.current, {
                toggle: false,
            });
        }
    }, []);

    return (
        <>
            <button className="btn btn-link ps-0" onClick={handleToggle}>Detail</button>
            <div className="collapse mt-3" ref={collapseRef}>
                <div className="card card-body bg-light shadow-sm rounded-4 border-0 px-2">
                    <table className="w-100">
                        <tbody>
                            {
                                detail.length ? (
                                    detail.map((item, index) => (
                                        <Fragment key={index}>
                                            {/* Desktop View */}
                                            <tr className="d-none d-md-table-row">
                                                <td style={{ width: '5%' }} className="p-1 align-top">
                                                    <TooltipC title={item.category}>
                                                        <IconCategory icon={item.category_icon} size={30} type={item.type_trans} />
                                                    </TooltipC>
                                                </td>
                                                <td style={{ width: '25%' }} className="p-1 align-top">{convertDateFormat(item.date)}</td>
                                                <td style={{ width: '40%' }} className="p-1 align-top">{item.description}</td>
                                                <td style={{ width: '20%' }} className="p-1 text-end text-nowrap align-top">{convertRupiahFormat(item.value)}</td>
                                                <td style={{ width: '10%' }} className="p-1 text-end align-top">
                                                    <div className="input-group flex-nowrap">
                                                        <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item.id)}>
                                                            <TooltipC title="Edit">
                                                                <FaPencil />
                                                            </TooltipC>
                                                        </button>
                                                        <button className="btn btn-sm btn-warning" onClick={() => handleDelete(item.id)}>
                                                            <TooltipC title="Hapus">
                                                                <FaTrash />
                                                            </TooltipC>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>

                                            {/* Mobile View */}
                                            <tr className="d-table-row d-md-none">
                                                <td rowSpan={3} className="pe-2 align-top">
                                                    <TooltipC title={item.category}>
                                                        <IconCategory idCategory={item.category_id} size={40} type={item.type_trans} />
                                                    </TooltipC>
                                                </td>
                                                <td className="w-100">{convertDateFormat(item.date)}</td>
                                                <td rowSpan={3} className="align-top">
                                                    <div className="d-flex flex-column flex-md-row flex-nowrap">
                                                        <button className="btn btn-sm btn-primary" onClick={() => handleEdit(item.id)}>
                                                            <TooltipC title="Edit">
                                                                <FaPencil />
                                                            </TooltipC>
                                                        </button>
                                                        <button className="btn btn-sm btn-warning mt-1 mt-md-0" onClick={() => handleDelete(item.id)}>
                                                            <TooltipC title="Hapus">
                                                                <FaTrash />
                                                            </TooltipC>
                                                        </button>
                                                    </div>
                                                </td>
                                            </tr>
                                            <tr className="d-table-row d-md-none">
                                                <td className="">{item.description}</td>
                                            </tr>
                                            <tr className="d-table-row d-md-none">
                                                <td className="">{convertRupiahFormat(item.value)}</td>
                                            </tr>
                                        </Fragment>
                                    ))
                                ) : (
                                    <tr>
                                        <td className="text-center" colSpan="5">Tidak ada data</td>
                                    </tr>
                                )
                            }
                        </tbody>
                        <tfoot>
                            <tr style={{ height: '10px' }}></tr>
                            <tr>
                                <th colSpan="3" className="border-top border-secondary text-end">Total : </th>
                                <th className="border-top border-secondary text-end">
                                    {convertRupiahFormat(detail.reduce((total, item) => total + item.value, 0))}
                                </th>
                                <th className="border-top border-secondary"></th>
                            </tr>
                        </tfoot>
                    </table>
                </div>
            </div>
        </>
    )
});

export default CollapseCard;