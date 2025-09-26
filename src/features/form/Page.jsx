import { Link } from "react-router-dom"
import { FaSquare, FaX } from "react-icons/fa6"

import Card from "../../components/Card"
import FilterInput from "./components/FilterInput"
import CardViewTransaction from "./components/CardViewTransaction"
import TableViewDetail from "../../components/TableViewDetail"
import FormInput from "./components/FormInput"

import useFilterInput from './hooks/useFilterInput'
import useCategoryData from './hooks/useCategoryData'
import useTransactionDetailData from './hooks/useTransactionDetailData'
import useFormInput from './hooks/useFormInput'

export default function FormPage() {
    const { categories } = useCategoryData();
    const { filters, filterOptions, handleChangeFilters } = useFilterInput(categories);
    const { transactions, details, transactionDetailsFiltered, loadDataTransaction } = useTransactionDetailData(filters, categories);
    const { form, inputOptions, alertBorderInput, handleChangeForm, handleSubmitForm, handleEdit, handleCloseEdit, handleDelete } = useFormInput(transactions, details, categories, loadDataTransaction);

    return (
        <div className="d-flex flex-column h-main-page">
            <div className="row mx-0">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <h2 className="card-title">Tambah Transaksi</h2>
                        <Link to="/dashboard" className="btn btn-primary rounded-4 px-4">Dashboard</Link>
                    </div>
                </div>
            </div>

            <div className="row mx-0 mt-3">
                <div className="col-xl-6">
                    <Card className="text-bg-white">
                        <div className="d-flex">
                            <FaSquare size={20} className="text-primary" />
                            <h6 className="ms-1">Detail Transaksi</h6>
                        </div>
                        <hr />
                        <FilterInput
                            filters={filters}
                            options={filterOptions}
                            handleChange={handleChangeFilters}
                        />
                        <div className={`mt-3 ${filters.type === 'transaction' && 'overflow-auto'}`} style={{ maxHeight: 'calc(100vh - 285px)' }}>
                            {
                                filters.type === 'transaction' ? (
                                    <CardViewTransaction data={transactionDetailsFiltered} handleEdit={handleEdit} handleDelete={handleDelete} />
                                ) : (
                                    <TableViewDetail data={transactionDetailsFiltered} action={true} classHeight="h-table-detail" handleEdit={handleEdit} handleDelete={handleDelete} />
                                )
                            }
                        </div>
                    </Card>
                </div>

                <div className="col-xl-6 mt-3 mt-xl-0">
                    <Card className="text-bg-white">
                        <div className="d-flex justify-content-between">
                            <div>
                                <FaSquare size={20} className="text-primary" />
                                <h6 className="ms-1 d-inline-block">{form.idEdit ? `Form Edit ${form.idEdit}` : "Form Tambah"}</h6>
                            </div>
                            <div className={form.idEdit ? "d-block" : "d-none"}>
                                <button type="button" className="btn btn-sm btn-danger rounded-3" onClick={handleCloseEdit}>
                                    <FaX size={12} />
                                </button>
                            </div>
                        </div>
                        <hr />
                        <FormInput
                            form={form}
                            inputOptions={inputOptions}
                            alertBorderInput={alertBorderInput}
                            handleChangeForm={handleChangeForm}
                            handleSubmitForm={handleSubmitForm}
                        />
                    </Card>
                </div>
            </div>
        </div>
    )
}