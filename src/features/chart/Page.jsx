import { FaSquare } from "react-icons/fa6"

import Card from "../../components/Card";
import { FilterInputPeriode, FilterInputSearchCategory, FilterInputType } from "./components/FilterInput"
import ChartDonut from "../../components/ChartDonut"
import ChartBarLine from "../../components/ChartBarLine"
import TableViewDetail from "../../components/TableViewDetail"
import TableViewFinancialSummary from "./components/TableViewFinancialSummary"
import ChartAreaSpline from "../../components/ChartAreaSpline"

import useFilterInput from './hooks/useFilterInput'
import useCategoryData from './hooks/useCategoryData'
import useTransactionDetailData from './hooks/useTransactionDetailData'

export default function ChartPage() {
    const { categories } = useCategoryData();
    const { filters, filterOptions, handleChangeFilters } = useFilterInput(categories);
    const { transactionDetailsFiltered, dataTableViewFinancialSummary, dataChartAreaSplineSummaryTransactionPerYear, dataChartBarLineSummaryTransactionPerYear, dataChartDonutTransactionPerCategory } = useTransactionDetailData(filters, categories);
    const monthName = filterOptions.month.find((month) => month.value == filters.month)?.label;

    return (
        <div className="d-flex flex-column" style={{ marginBottom: "60px" }}>
            <div className="row mx-0">
                <div className="col-12">
                    <div className="d-flex justify-content-between">
                        <h2 className="card-title">Grafik</h2>
                        <FilterInputPeriode
                            filterYear={filters.year}
                            filterMonth={filters.month}
                            optionYear={filterOptions.year}
                            optionMonth={filterOptions.month}
                            handleChange={handleChangeFilters}
                        />
                    </div>
                </div>
            </div>

            <div className="row mx-0 mt-3">
                <div className="col-lg-7">
                    <Card className="text-bg-white">
                        <div className="d-flex flex-column flex-xl-row justify-content-between">
                            <div className="mb-3 mb-xl-0">
                                <FaSquare size={20} className="text-primary" />
                                <h6 className="ms-1 d-inline-block">Transaksi Detail Bulan {monthName + " " + filters.year}</h6>
                            </div>
                            <FilterInputSearchCategory
                                filterSearch={filters.search}
                                filterCategory={filters.category}
                                optionCategory={filterOptions.category}
                                handleChange={handleChangeFilters}
                            />
                        </div>
                        <hr />
                        <TableViewDetail data={transactionDetailsFiltered} action={false} classHeight="h-300" />
                    </Card>
                </div>
                <div className="col-lg-5">
                    <Card className="text-bg-white">
                        <div className="d-flex flex-column flex-xl-row justify-content-between">
                            <div className="mb-3 mb-xl-0">
                                <FaSquare size={20} className="text-primary" />
                                <h6 className="ms-1 d-inline-block">Transaksi Per Kategori Bulan {monthName + " " + filters.year}</h6>
                            </div>
                            <FilterInputType
                                filter={filters.type}
                                option={filterOptions.type}
                                handleChange={handleChangeFilters}
                            />
                        </div>
                        <hr />
                        <ChartDonut data={dataChartDonutTransactionPerCategory} />
                    </Card>
                </div>
            </div>

            <div className="row mx-0 mt-3">
                <div className="col-lg-12">
                    <Card className="text-bg-white">
                        <div className="d-flex">
                            <FaSquare size={20} className="text-primary" />
                            <h6 className="ms-1">Grafik Rekap Keuangan Tahun {filters.year}</h6>
                        </div>
                        <hr />
                        <ChartAreaSpline data={dataChartAreaSplineSummaryTransactionPerYear} type="month" />
                    </Card>
                </div>
            </div>

            <div className="row mx-0 mt-3">
                <div className="col-lg-6">
                    <Card className="text-bg-white">
                        <div className="d-flex">
                            <FaSquare size={20} className="text-primary" />
                            <h6 className="ms-1">Tabel Rekap Keuangan Tahun {filters.year}</h6>
                        </div>
                        <hr />
                        <TableViewFinancialSummary data={dataTableViewFinancialSummary} classHeight="h-300" />
                    </Card>
                </div>
                <div className="col-lg-6">
                    <Card className="text-bg-white">
                        <div className="d-flex">
                            <FaSquare size={20} className="text-primary" />
                            <h6 className="ms-1">Rekap Keuangan Tahun {filters.year}</h6>
                        </div>
                        <hr />
                        <ChartBarLine data={dataChartBarLineSummaryTransactionPerYear} />
                    </Card>
                </div>
            </div>

        </div>
    )
}