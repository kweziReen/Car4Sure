export default function SelectInput({
    name,
    label,
    value,
    options,
    onChange,
    required = false,
    error = "",
}) {
    return (
        <div className="mt-4">
            {label && (
                <label
                    htmlFor={name}
                    className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                    {label}
                </label>
            )}
            <select
                id={name}
                name={name}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                required={required}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
                <option value="" disabled>
                    Select an option
                </option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>
                        {option.name}
                    </option>
                ))}
            </select>
            {error && <p className="mt-2 text-sm text-red-600">{error}</p>}
        </div>
    );
}
