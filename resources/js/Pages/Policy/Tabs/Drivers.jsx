import {Link} from "@inertiajs/react";

export default function DriversList({component_data, className = ''}) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Drivers Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Active drivers
                </p>
            </header>

            <div className="mt-4">
                <div className="flex justify-end gap-4 m-2">
                    <Link
                        href={route('create-driver')}
                        method="get"
                        as="a"
                        className="px-3 py-1.5 text-white bg-green-600 rounded-lg hover:bg-green-400"
                    >
                        Add Driver
                    </Link>
                </div>

                <table className="table-fixed w-full">
                    <thead>
                    <tr className="border border-gray-900 bg-gray-900 text-white">
                        <th scope="col">#</th>
                        <th scope="col">Name</th>
                        <th scope="col">Surname</th>
                        <th scope="col">License No.</th>
                        <th scope="col">License Status</th>
                        <th scope="col">License Class</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {component_data.drivers.map(({
                                                     id,
                                                     first_name,
                                                     last_name,
                                                     license_number,
                                                     license_status,
                                                     license_class
                                                 }) => (
                        <tr key={id} className="border border-gray-900 text-center text-white">
                            <td className="justify-center">{id}</td>
                            <td>{first_name}</td>
                            <td>{last_name}</td>
                            <td>{license_number}</td>
                            <td>{license_status}</td>
                            <td>{license_class}</td>
                            <td>
                                <Link
                                    href={route('edit-driver', {id})}
                                    method="get"
                                    as="a"
                                    className="px-4 py-0 text-white bg-green-600 rounded-lg hover:bg-green-400"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route('delete-driver', {id})}
                                    method="get"
                                    as="a"
                                    className="px-4 py-0 ml-4 text-white bg-red-600 rounded-lg hover:bg-red-400"
                                >
                                    Delete
                                </Link>
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </section>

    );
}
