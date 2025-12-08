import { memo } from 'react'

const FilterInput = memo(({ filters, options, handleChange }) => {
    return (
        <div className="d-flex flex-column flex-md-row justify-content-between">
            <div className="input-group w-auto">
                <select name="type" className="form-select" value={filters.type} onChange={handleChange}>
                    {
                        options.type.map((option) => (
                            <option key={option.value} value={option.value}>{option.label}</option>
                        ))
                    }
                </select>
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
            <div className="mt-1 mt-md-0">
                <div className="d-flex">
                    <div className="input-group">
                        <select name="category" className="form-select" value={filters.category} onChange={handleChange}>
                            {
                                options.category.map((option) => (
                                    <option key={option.value} value={option.value}>{option.label}</option>
                                ))
                            }
                        </select>
                        <input type="text" name="search" className="form-control" placeholder="Pencarian" value={filters.search} onChange={handleChange} />
                    </div>
                </div>
            </div>
        </div>
    )
});

export default FilterInput;