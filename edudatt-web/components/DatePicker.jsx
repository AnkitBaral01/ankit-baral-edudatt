const DatePicker = ({
    label,
    value,
    onChange,
    error,
    required = false,
    className = ''
}) => {
    const handleChange = (e) => {
        const date = new Date(e.target.value);
        const formattedDate = date.toDateString();
        onChange(formattedDate);
    };

    const formatForInput = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        return date.toISOString().split('T')[0];
    };

    return (
        <div className={`${className}`}>
            <label className={`text-sm font-medium text-gray-700 mb-1 flex items-center`}>
                {label} {required && <span className="text-red ml-1">*</span>}
            </label>
            <input
                type="date"
                value={formatForInput(value)}
                onChange={handleChange}
                className={`w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-primary outline-none transition bg-white`}
            />
            {error && <p className="text-xs font-semibold text-red mt-1">{error}</p>}
        </div>
    );
};

export default DatePicker;