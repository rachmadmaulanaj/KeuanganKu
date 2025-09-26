import React from "react"
import { convertDateFormat, convertRupiahFormat } from "../../../utils/global"

import IconCategory from "../../../components/IconCategory"
import TooltipC from "../../../components/TooltipC"

const CardLatestActivity = React.memo(({ data }) => {
    return (
        <>
            {
                data.map((item, index) => (
                    <div className="d-flex align-items-center" key={index}>
                        <TooltipC title={item.category}>
                            <IconCategory icon={item.category_icon} size={40} type={item.type_trans} />
                        </TooltipC>
                        <div className="w-100 p-2">
                            <h6 className="mb-0">{item.description}</h6>
                            <div className="d-flex justify-content-between">
                                <small>{convertDateFormat(item.date)}</small>
                                <small>{convertRupiahFormat(item.value)}</small>
                            </div>
                        </div>
                    </div>
                ))
            }
        </>
    )
});

export default CardLatestActivity;