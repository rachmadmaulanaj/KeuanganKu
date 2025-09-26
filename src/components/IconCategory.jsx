import React, { Suspense } from 'react'
import { FaBan, FaHourglassHalf } from "react-icons/fa6"

const IconCategory = React.memo(({ icon, size = 40, type }) => {
    // Komponen fallback jika ikon tidak valid
    const InvalidIcon = () => <span style={{ color: 'white' }}><FaBan size={size * 0.6} className="text-white" /></span>;

    const IconComponent = React.lazy(() =>
        import('react-icons/fa6').then(module => {
            const SelectedIcon = module[icon];

            // ✅ Pastikan komponen valid
            if (typeof SelectedIcon === 'function') {
                return { default: SelectedIcon };
            } else {
                return { default: InvalidIcon }; // fallback jika tidak valid
            }
        })
    );

    return (
        <div
            className={`d-flex justify-content-center align-items-center rounded-3 bg-gradient ${type === 'minus' ? 'bg-danger' : 'bg-success'
                }`}
            style={{ width: size, height: size, cursor: 'pointer' }}
        >
            <Suspense fallback={<span style={{ color: 'white' }}><FaHourglassHalf size={size * 0.6} className="text-white" /></span>}>
                <IconComponent size={size * 0.6} className="text-white" />
            </Suspense>
        </div>
    );
});

export default IconCategory;