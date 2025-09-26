import { Link } from "react-router-dom"

import { FaSquare } from "react-icons/fa6"
import Card from "../../components/Card"
import ChartAreaSpline from "../../components/ChartAreaSpline"
import FilterInput from "./components/FilterInput"
import { CardInfoBeginningBalance, CardInfoIncome, CardInfoExpense, CardInfoCurrentBalance } from "./components/CardInfoFinance"
import CardTotalTransaction from "./components/CardTotalTransaction"
import CardTotalIncome from "./components/CardTotalIncome"
import CardLatestActivity from "./components/CardLatestActivity"
import ChartColumn from "../../components/ChartColumn"

import useFilterInput from './hooks/useFilterInput'
import useCategoryData from './hooks/useCategoryData'
import useTransactionDetailData from './hooks/useTransactionDetailData'

export default function DashboardPage() {
    const { filters, filterOptions, handleChangeFilters } = useFilterInput();
    const { categories } = useCategoryData();
    const { dataInfoFinance, dataLatestActivity, dataChartPerMonth, dataCurrentBalance, dataChartTopCategory } = useTransactionDetailData(filters, categories);

    return (
        <div className="d-flex flex-column h-main-page">
            <div className="row mx-0">
                <div className="col-12">
                    <div className="d-flex flex-row justify-content-between" style={{ height: "60px" }}>
                        <h3 className="mt-1 mb-0">Dashboard</h3>
                        <div>
                            <FilterInput
                                type="periode"
                                filters={filters}
                                options={filterOptions}
                                handleChange={handleChangeFilters}
                            />
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-100">
                <div className="row mx-0">
                    <div className="col-lg-8">
                        <div className="d-block d-lg-none mb-2">
                            <CardInfoCurrentBalance data={dataCurrentBalance} />
                        </div>

                        <div className="row">
                            <div className="col-lg-4 pe-lg-0">
                                <CardInfoBeginningBalance data={dataInfoFinance.balance} />
                            </div>
                            <div className="col-lg-4 mt-2 mt-lg-0">
                                <CardInfoIncome data={dataInfoFinance.income} />
                            </div>
                            <div className="col-lg-4 ps-lg-0 mt-2 mt-lg-0">
                                <CardInfoExpense data={dataInfoFinance.expense} />
                            </div>
                        </div>

                        <div className="row mx-0 mt-3">
                            <div className="col-xl-6 px-0 px-xl-2">
                                <Card className="text-bg-white h-100">
                                    <div className="d-flex flex-column justify-content-between h-100">
                                        <div className="d-flex">
                                            <FaSquare size={20} className="text-primary" />
                                            <h6 className="ms-1">Total Transaksi</h6>
                                        </div>
                                        <hr className="my-2" />
                                        <CardTotalTransaction data={dataInfoFinance} />
                                    </div>
                                </Card>
                            </div>
                            <div className="col-xl-6 mt-2 mt-xl-0 px-0 px-xl-2">
                                <Card className="text-bg-white h-100">
                                    <div className="d-flex">
                                        <FaSquare size={20} className="text-primary" />
                                        <h6 className="ms-1">Total Pendapatan</h6>
                                    </div>
                                    <hr className="my-2" />
                                    <CardTotalIncome data={dataInfoFinance} />
                                </Card>
                            </div>
                        </div>

                        <div className="mt-3">
                            <div className="row mx-0">
                                <div className="col-12 p-0">
                                    <Card className="bg-white">
                                        <div className="d-flex justify-content-between">
                                            <div>
                                                <FaSquare size={20} className="text-primary" />
                                                <h6 className="ms-1 d-inline-block">Grafik Transaksi</h6>
                                            </div>
                                            <FilterInput
                                                type="type"
                                                filters={filters}
                                                options={filterOptions}
                                                handleChange={handleChangeFilters}
                                            />
                                        </div>
                                        <hr className="my-2" />
                                        <ChartAreaSpline data={dataChartPerMonth} type="day" />
                                    </Card>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-lg-4 pe-3 mt-2 mt-lg-0">
                        <div className="d-none d-lg-block">
                            <CardInfoCurrentBalance data={dataCurrentBalance} />
                        </div>

                        <Card className="text-bg-white mt-3">
                            <div className="d-flex">
                                <FaSquare size={20} className="text-primary" />
                                <h6 className="ms-1">Aktivitas Terakhir</h6>
                            </div>
                            <hr className="my-2" />
                            <CardLatestActivity data={dataLatestActivity} />
                            <hr className="my-2" />
                            <Link to="/form" className="btn btn-primary w-100 rounded-4 mt-1">Tambah Transaksi</Link>
                        </Card>

                        <Card className="text-bg-white mt-3">
                            <div className="d-flex">
                                <FaSquare size={20} className="text-primary" />
                                <h6 className="ms-1">Kategori Teratas</h6>
                            </div>
                            <hr className="my-2" />
                            <ChartColumn data={dataChartTopCategory} />
                        </Card>

                    </div>
                </div>
            </div>
        </div>
    )
}