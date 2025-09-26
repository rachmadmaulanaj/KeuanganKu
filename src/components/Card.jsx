export default function Card({ className, children }) {
    return (
        <div className={`card rounded-4 bg-gradient border-0 shadow ${className}`}>
            <div className="card-body">
                {children}
            </div>
        </div>
    )
}