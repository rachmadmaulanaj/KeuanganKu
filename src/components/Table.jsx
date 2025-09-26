import React, { useState } from 'react'
import { FaSortUp, FaSortDown } from "react-icons/fa6"
import { convertRupiahFormat } from "../utils/global"

export default function Table({ columns, children, classHeight }) {
    const [sorter, setSorter] = useState({ column: 'Tanggal', direction: 'desc' });

    const handleSort = (columnKey) => {
        setSorter((prev) => {
            if (prev.column === columnKey) {
                return {
                    column: columnKey,
                    direction: prev.direction === 'asc' ? 'desc' : 'asc',
                };
            } else {
                return { column: columnKey, direction: 'asc' };
            }
        });
    };

    return (
        <>
            <table className="table table-primary table-hover w-100">
                <thead>
                    <tr>
                        {
                            columns.map((column, index) => {
                                const isFirst = index === 0;
                                const isLast = index === columns.length - 1;

                                return (
                                    <th
                                        key={index}
                                        style={{ width: column.width, cursor: 'pointer' }}
                                        className={`${column.className ?? ''} ${isFirst ? 'rounded-start' : ''} ${isLast ? 'rounded-end' : ''}`}
                                        onClick={() => handleSort(column.title)}
                                    >
                                        {column.title}
                                        {
                                            sorter.column === column.title && (sorter.direction === 'asc' ? <FaSortUp className="ms-2" /> : <FaSortDown className="ms-2" />)
                                        }
                                    </th>
                                )
                            })
                        }
                    </tr>
                </thead>
            </table>
            <div className={`overflow-auto ${classHeight}`}>
                <table className="table table-hover">
                    <tbody>
                        {/* React.Children.map(children, child => {
                            if (React.isValidElement(child)) {
                                return React.cloneElement(child, { sorter, setSorter });
                            }
                            return child;
                        }) */}
                        {children}
                    </tbody>
                </table>
            </div>
        </>
    )
}