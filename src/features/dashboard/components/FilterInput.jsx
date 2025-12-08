import { memo } from 'react'

const FilterInput = memo(({ type, filters, options, handleChange }) => {
    return (
        <>
            {
                type === "periode" ? (
                    <div className="d-flex justify-content-between">
                        <div className="input-group w-auto">
                            <select name="month" className="form-select" value={filters.month} onChange={handleChange}>
                                {
                                    options.month.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))
                                }
                            </select>
                            <select name="year" className="form-select" value={filters.year} onChange={handleChange}>
                                {
                                    options.year.map((option) => (
                                        <option key={option.value} value={option.value}>{option.label}</option>
                                    ))
                                }
                            </select>
                        </div>
                    </div>
                ) : (
                    <div>
                        <select name="type" className="form-select" value={filters.type} onChange={handleChange}>
                            {
                                options.type.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                    </div>
                )
            }
        </>
    )
});

export default FilterInput;