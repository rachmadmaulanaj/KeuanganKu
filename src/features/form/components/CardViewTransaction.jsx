import { memo } from 'react'
import { convertDateFormat, convertRupiahFormat } from "../../../utils/global"

import Card from "../../../components/Card"
import CollapseCard from "../../../components/CollapseCard"

const CardViewTransaction = memo(({ data, handleEdit, handleDelete }) => {
    return (
        <div children="overflow-auto">
            {
                data.length ? (
                    data.map((transaction) => (
                        <Card className="bg-white mb-3" key={transaction.id}>
                            <div className="d-flex justify-content-between">
                                <span className={`${transaction.type === 'add' ? 'text-success' : 'text-danger'}`}>
                                    {transaction.type === 'add' ? '(+)' : '(-)'} {convertRupiahFormat(transaction.value)} {transaction.description}
                                </span>
                                <span className={`${transaction.type === 'add' ? 'text-success' : 'text-danger'}`}>{convertDateFormat(transaction.date)}</span>
                            </div>
                            <CollapseCard detail={transaction.details} handleEdit={handleEdit} handleDelete={handleDelete} />
                        </Card>
                    ))
                ) : (
                    <div className="text-center p-3">Tidak ada data</div>
                )
            }
        </div>
    )
})

export default CardViewTransaction;