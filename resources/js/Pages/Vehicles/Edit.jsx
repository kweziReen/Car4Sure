import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import UpdateVehicleDetails from "./Tabs/Details";
import UpdateGarageDetails from "./Tabs/Garage";
import UpdateVehicleCoverage from "./Tabs/Coverage";

export default function EditVehicle({ component_data }) {
    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Update Vehicle Details
                </h2>
            }
        >
            <Head title="Update Vehicle"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="flex justify-end gap-4 m-2">
                            <Link
                                href={route('policy-details')}
                                method="get"
                                as="a"
                                className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-400"
                            >
                                Back
                            </Link>
                        </div>
                        <UpdateVehicleDetails
                            component_data={component_data}
                            className="w-full"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateGarageDetails
                            component_data={component_data}
                            className="w-full"
                        />
                    </div>

                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <UpdateVehicleCoverage
                            component_data={component_data}
                            className="w-full"
                        />
                    </div>
                </div>
            </div>

        </AuthenticatedLayout>
    );
}
