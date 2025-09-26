import React from "react"
import ChartBar from "../../../components/ChartBar"

const CardTotalTransaction = React.memo(({ data }) => {
    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="p-3 m-auto">
                <h2 className="fw-semibold mb-0 d-inline-block d-md-block">{data.income.total + data.expense.total}</h2>
                <h6 className="text-muted d-inline-block d-md-block ms-2 ms-md-0">transaksi</h6>
            </div>
            <div className="w-100 flex-grow-1">
                <ChartBar data={data} />
            </div>
        </div>
    )
});

export default CardTotalTransaction;