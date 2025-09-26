export default function Footer({ isSidebarOpen, isMobile }) {
    const style = {
        left: `${isMobile ? "0" : isSidebarOpen ? "250px" : "50px"}`,
        transition: 'left 0.5s ease',
        overflow: 'hidden'
    }

    return (
        <footer className="fixed-bottom p-2 p-md-3" style={style}>
            <div className="bg-primary text-white text-center ms-1 ms-md-4 me-1 py-1 rounded-3">
                <span className="fw-bold">KeuanganKu &copy; 2023</span>
            </div>
        </footer>
    )
}