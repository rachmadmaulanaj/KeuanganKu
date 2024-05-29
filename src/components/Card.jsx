const Card = ({ color, children }) => {
    const bg_color = color === 'white' ? 'bg-white' : `bg-${color}-300`;
    const border_color = color === 'white' ? 'border-white' : `border-${color}-400`;
    return (
        <div className="w-full">
            <div className={`${bg_color} ${border_color} border-2 rounded-lg overflow-hidden`}>
                <div className="p-3">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Card;