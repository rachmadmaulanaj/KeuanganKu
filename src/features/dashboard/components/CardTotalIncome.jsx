import React from "react"
import { convertRupiahFormat, convertThousandFormat } from "../../../utils/global"
import { FaArrowTrendUp, FaArrowTrendDown } from "react-icons/fa6"

const CardTotalIncome = React.memo(({ data }) => {
    const incomeExpenseTotal = data.income.value - data.expense.value;
    const incomeConvert = data.income.value < 1 ? 1 : data.income.value;
    const incomeExpensePercent = (incomeExpenseTotal / incomeConvert) * 100;

    return (
        <div className="d-flex flex-column flex-md-row">
            <div className="p-3 m-auto">
                {
                    incomeExpenseTotal < 0 ?
                        <FaArrowTrendDown size={100} className="text-danger d-block m-auto" />
                        :
                        <FaArrowTrendUp size={100} className="text-success d-block m-auto" />
                }
                <small className={incomeExpenseTotal < 0 ? "text-danger" : "text-success"}>{convertThousandFormat(incomeExpensePercent)}% dari pemasukkan</small>
            </div>
            <div className="fw-bold flex-grow-1 text-end m-auto" style={{ fontSize: "2.5em", width: "fit-content" }}>
                <div>{convertRupiahFormat(incomeExpenseTotal)}</div>
            </div>
        </div>
    )
});

export default CardTotalIncome;