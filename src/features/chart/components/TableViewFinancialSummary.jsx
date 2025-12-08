import { memo } from 'react'
import { convertRupiahFormat } from "../../../utils/global"
import Table from "../../../components/Table"

const TableViewFinancialSummary = memo(({ data, classHeight }) => {
    const columnsArr = [
        {
            title: 'Bulan',
            className: '',
            width: '12%',
        },
        {
            title: 'Saldo Awal',
            className: 'text-end',
            width: '22%',
        },
        {
            title: 'Pemasukkan',
            className: 'text-end',
            width: '22%',
        },
        {
            title: 'Pengeluaran',
            className: 'text-end',
            width: '22%',
        },
        {
            title: 'Total',
            className: 'text-end',
            width: '22%',
        },
    ];

    return (
        <Table columns={columnsArr} classHeight={classHeight}>
            {
                data.length ? (
                    data.map((row) => (
                        <tr key={row.id}>
                            <td style={{ width: '12%' }}>{row.month}</td>
                            <td style={{ width: '22%' }} className="text-end">{convertRupiahFormat(row.balance)}</td>
                            <td style={{ width: '22%' }} className="text-end">{convertRupiahFormat(row.income)}</td>
                            <td style={{ width: '22%' }} className="text-end">{convertRupiahFormat(row.expense)}</td>
                            <td style={{ width: '22%' }} className={`text-end ${row.total < 0 ? "text-danger" : "text-success"}`}>{convertRupiahFormat(row.total)}</td>
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
});

export default TableViewFinancialSummary;