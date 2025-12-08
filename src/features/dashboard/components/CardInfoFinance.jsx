import { memo } from 'react'
import { convertRupiahFormat } from "../../../utils/global"
import Card from "../../../components/Card"
import { FaWallet, FaMoneyBillTrendUp, FaCartArrowDown, FaSackDollar } from "react-icons/fa6"

export const CardInfoBeginningBalance = memo(({ data }) => {
    return (
        <Card className="text-bg-primary h-100">
            <h4 className="card-title">Saldo Awal</h4>
            <div className="d-flex justify-content-between align-items-end">
                <h4 className="card-text fw-bold">{convertRupiahFormat(data.value)}</h4>
                <FaWallet size={70} />
            </div>
        </Card>
    )
});

export const CardInfoIncome = memo(({ data }) => {
    return (
        <Card className="text-bg-success h-100">
            <h4 className="card-title">Pemasukkan</h4>
            <div className="d-flex justify-content-between align-items-end">
                <h4 className="card-text fw-bold">{convertRupiahFormat(data.value)}</h4>
                <FaMoneyBillTrendUp size={70} />
            </div>
        </Card>
    )
});

export const CardInfoExpense = memo(({ data }) => {
    return (
        <Card className="text-bg-danger h-100">
            <h4 className="card-title">Pengeluaran</h4>
            <div className="d-flex justify-content-between align-items-end">
                <h4 className="card-text fw-bold">{convertRupiahFormat(data.value)}</h4>
                <FaCartArrowDown size={70} />
            </div>
        </Card>
    )
});

export const CardInfoCurrentBalance = memo(({ data }) => {
    return (
        <Card className="text-bg-white">
            <h4 className="card-title">Saldo Saat Ini</h4>
            <div className="d-flex justify-content-between align-items-end">
                <h2 className="card-text fw-bold text-primary">{convertRupiahFormat(data)}</h2>
                <FaSackDollar size={70} className="text-primary" />
            </div>
        </Card>
    )
});