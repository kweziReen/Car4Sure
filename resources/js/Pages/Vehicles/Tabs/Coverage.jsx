import PrimaryButton from '@/Components/PrimaryButton';
import {Link, useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";

export default function UpdateVehicleCoverage({component_data, className = ''}) {

    const { data, setData, patch, errors, processing } =
        useForm({
            coverage: '',
        });


    const submit = (e) => {
        e.preventDefault();

        patch(route('update-vehicle-coverage', component_data.vehicle));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Vehicle Coverage details
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your vehicle coverage details.
                </p>
            </header>
            <form onSubmit={submit}>
                <div className="row grid grid-cols-2 gap-4">
                    <div className="col-span-2 mt-1">
                        <SelectInput
                            name="coverage"
                            label="Coverage"
                            value={data.coverage}
                            options={component_data.coverageSelect}
                            onChange={(value) => setData("coverage", value)}
                            required
                        />
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4 " disabled={processing}>
                        Update Vehicle Coverage
                    </PrimaryButton>
                </div>
            </form>

            <div className="mt-4 border-t-2 border-t-white"></div>

            <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                Coverage.
            </p>

            <table className="table-fixed w-full">
                <thead>
                <tr className="border border-gray-900 bg-gray-900 text-white">
                    <th scope="col">#</th>
                    <th scope="col">Type</th>
                    <th scope="col">Limit</th>
                    <th scope="col">Deductible</th>
                    <th></th>
                </tr>
                </thead>
                <tbody>
                {component_data.coverageSelected.map(({id, type, limit, deductible}) => (
                    <tr key={id} className="border border-gray-900 text-center text-white">
                        <td className="justify-center">{id}</td>
                        <td>{type}</td>
                        <td>{limit}</td>
                        <td>{deductible}</td>
                        <td>
                            <Link
                                href={route('delete-coverage', [component_data.vehicle, {id}])}
                                method="get"
                                as="a"
                                className="px-4 py-0 ml-4 text-white bg-red-600 rounded-lg hover:bg-red-400"
                            >
                                Remove Coverage
                            </Link>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
        </section>
    );
}
