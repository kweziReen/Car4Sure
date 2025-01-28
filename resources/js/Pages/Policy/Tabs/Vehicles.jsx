import {Link} from "@inertiajs/react";

export default function VehicleList({component_data, className = ''}) {
    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Vehicles List
                </h2>
            </header>

            <div className="mt-4">
                <div className="flex justify-end gap-4 m-2">
                    <Link
                        href={route('create-vehicle')}
                        method="get"
                        as="a"
                        className="px-3 py-1.5 text-white bg-green-600 rounded-lg hover:bg-green-400"
                    >
                        Add Vehicle
                    </Link>
                </div>

                <table className="table-fixed w-full">
                    <thead>
                    <tr className="border border-gray-900 bg-gray-900 text-white">
                        <th scope="col">#</th>
                        <th scope="col">Year</th>
                        <th scope="col">Make</th>
                        <th scope="col">Model</th>
                        <th scope="col">Vin</th>
                        <th scope="col">Ownership</th>
                        <th></th>
                    </tr>
                    </thead>
                    <tbody>
                    {component_data.vehicles.map(({
                                                     id,
                                                     year,
                                                     make,
                                                     model,
                                                     vin,
                                                      ownership
                                                 }) => (
                        <tr key={id} className="border border-gray-900 text-center text-white">
                            <td className="justify-center">{id}</td>
                            <td>{year}</td>
                            <td>{make}</td>
                            <td>{model}</td>
                            <td>{vin}</td>
                            <td>{ownership}</td>
                            <td>
                                <Link
                                    href={route('edit-vehicle', {id})}
                                    method="get"
                                    as="a"
                                    className="px-4 py-0 text-white bg-green-600 rounded-lg hover:bg-green-400"
                                >
                                    Edit
                                </Link>
                                <Link
                                    href={route('delete-vehicle', {id})}
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
