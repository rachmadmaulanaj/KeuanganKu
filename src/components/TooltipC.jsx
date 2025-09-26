import React, { useEffect, useRef } from 'react'
import { Tooltip } from 'bootstrap'

const TooltipC = React.memo(({ title, children }) => {
    const wrapperRef = useRef(null);
    const tooltipInstance = useRef(null);

    useEffect(() => {
        if (wrapperRef.current) {
            tooltipInstance.current = new Tooltip(wrapperRef.current, {
                title: title || 'No title',
                placement: 'right',
                trigger: 'hover',
            });
        }

        return () => {
            if (tooltipInstance.current) {
                tooltipInstance.current.dispose();
            }
        };
    }, []);

    return (
        <div ref={wrapperRef}>
            {children}
        </div>
    )
});

export default TooltipC;