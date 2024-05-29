import Select from 'react-select';

const Header = (props) => {
    const handleChange = (opt) => {
        props.handleChangeFilter(opt);
    }

    return (
        <div className="grid grid-rows-1 px-5">
            <div className="sm:flex sm:justify-between">
                <h1 className="text-4xl font-bold">Dashboard</h1>
                <div>
                    <label htmlFor="select" className="text-lg font-bold text-neutral-900">Periode : </label>
                    <div className="relative mt-1 inline-block">
                        <Select
                            name="month"
                            onChange={handleChange}
                            value={props.filterPeriod}
                            className="block min-w-max border rounded-md"
                            options={props.filterPeriodOption}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Header;