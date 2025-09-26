import React from 'react'

export const FilterInputPeriode = React.memo(({ filterYear, filterMonth, optionYear, optionMonth, handleChange }) => {
    return (
        <div className="d-flex justify-content-between">
            <div className="input-group w-auto">
                <select name="month" className="form-select" value={filterMonth} onChange={handleChange}>
                    {
                        optionMonth.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
                <select name="year" className="form-select" value={filterYear} onChange={handleChange}>
                    {
                        optionYear.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
});

export const FilterInputSearchCategory = React.memo(({ filterSearch, filterCategory, optionCategory, handleChange }) => {
    return (
        <div>
            <div className="input-group">
                <select name="category" className="form-select" style={{ minWidth: "150px" }} value={filterCategory} onChange={handleChange}>
                    {
                        optionCategory.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
                <input type="text" name="search" className="form-control" style={{ minWidth: "150px" }} placeholder="Pencarian" value={filterSearch} onChange={handleChange} />
            </div>
        </div>
    )
});

export const FilterInputType = React.memo(({ filter, option, handleChange }) => {
    return (
        <div>
            <div className="input-group">
                <select name="type" className="form-select" style={{ minWidth: "150px" }} value={filter} onChange={handleChange}>
                    {
                        option.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
            </div>
        </div>
    )
});