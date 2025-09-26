export default function LoaderOverlay() {
    return (
        <div
            className="position-fixed top-0 start-0 w-100 h-100 bg-dark bg-opacity-50 d-flex justify-content-center align-items-center"
            style={{ zIndex: 1050 }}
        >
            <div className="spinner-border text-primary" role="status" style={{ width: '7rem', height: '7rem', borderWidth: '10px' }}>
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>
    )
}