import { useState } from "react";

const CardCollapse = (props) => {
    const [isOpen, setIsOpen] = useState(false);

    const toggleCollapse = () => { setIsOpen(!isOpen); };

    return (
        <div className="w-full my-3 sm:text-base text-sm">
            <div className="bg-white rounded-lg overflow-hidden">
                <div className="p-2">
                    <div className="flex justify-between">
                        {
                            props.detail ? (
                                <h5 className={`${props.transaction.type === 'add' ? 'text-green-400' : 'text-red-400'}`}>
                                    {props.transaction.desc_v}
                                </h5>
                            ) : (
                                <div>
                                    <h5 className={`${props.transaction.type === 'add' ? 'text-green-400' : 'text-red-400'}`}>
                                        {props.transaction.type === 'add' ? '(+)' : '(-)'} {props.transaction.value_v}
                                    </h5>
                                    <h6>{props.transaction.desc}</h6>
                                </div>
                            )
                        }
                        <h6 className="text-right text-neutral-900">{props.transaction.date_v}</h6>
                    </div>
                    {
                        props.detail ? (
                            <>
                                <span onClick={toggleCollapse} className={`pb-1 cursor-pointer text-sky-300 hover:text-sky-400 ${isOpen ? 'border-b-4 border-sky-500' : ''}`}>Lihat Detail</span>
                                <div className={`px-2 bg-gray-200 rounded-md overflow-hidden transition-all ease-in-out duration-300 ${isOpen ? 'mt-3 py-2' : 'max-h-0'
                                    }`}>
                                    {
                                        props.detail && props.detail.length > 0 ? (
                                            <table width="100%">
                                                <tbody>
                                                    {
                                                        props.detail.reverse().map((val) => {
                                                            return (
                                                                <tr key={val.id}>
                                                                    <td className="px-2 text-left text-nowrap align-top">{val.date_v}</td>
                                                                    <td className="px-2 text-left align-top">{val.desc}</td>
                                                                    <td className="px-2 text-right text-nowrap align-top">{val.value_v}</td>
                                                                </tr>
                                                            )
                                                        })
                                                    }
                                                </tbody>
                                                <tfoot>
                                                    <tr>
                                                        <th className="px-2 text-right"></th>
                                                        <th className="px-2 text-right">Total :</th>
                                                        <th className="px-2 text-right text-nowrap">{props.total_value_detail}</th>
                                                    </tr>
                                                </tfoot>
                                            </table>
                                        ) : (
                                            <p className="text-center">Tidak ada data</p>
                                        )
                                    }
                                </div>
                            </>
                        ) : ''
                    }
                </div>
            </div>
        </div>
    )
}

export default CardCollapse;