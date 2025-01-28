import AuthenticatedLayout from '@/Layouts/AuthenticatedLayout';
import {Head, Link} from '@inertiajs/react';
import UpdateDetails from './Tabs/Details';
import UpdateAccountHolderDetails from './Tabs/Holder';
import UpdateAccountHolderAddress from './Tabs/Address';
import DriversList from "@/Pages/Policy/Tabs/Drivers.jsx";
import VehicleList from "@/Pages/Policy/Tabs/Vehicles.jsx";
import jsPDF from "jspdf";

export default function Edit({ component_data }) {

    const downloadPolicyAsPDF = () => {
        const doc = new jsPDF();

        doc.setFontSize(18);
        doc.text("Policy Details", 10, 10);

        doc.setFontSize(12);
        doc.text("Policy Number: " + component_data.policy.policy_no, 10, 30);
        doc.text("Policy Type: " + component_data.policy.policy_type, 100, 30);
        doc.text("Policy Status: " + component_data.policy.policy_status, 10, 35);
        doc.text("Expiration Date: " + component_data.policy.expiration_date, 100, 35);
        doc.text("Policy Holder Name: " + component_data.policyHolder.name, 10, 40);
        doc.text("Policy Holder Surname: " + component_data.policyHolder.surname, 100, 40);
        doc.text("Policy Holder Address: " + component_data.address.street + ", " + component_data.address.city
            + ", " + component_data.address.state + ", " + component_data.address.zip, 10, 45);

        // Drivers Information
        const drivers = component_data.drivers;
        let yPosition = 55; // Start position for drivers

        if (drivers && drivers.length > 0) {
            doc.text("Drivers:", 10, yPosition);
            yPosition += 5;
            drivers.forEach((driver, index) => {
                doc.text(`Driver: ${driver.first_name} ${driver.last_name}`, 10, yPosition);
                yPosition += 10;
            });
        } else {
            doc.text("No drivers available", 10, yPosition);
            yPosition += 10;
        }

        // Vehicles Information
        const vehicles = component_data.vehicles;

        if (vehicles && vehicles.length > 0) {
            doc.text("Vehicles:", 10, yPosition);
            yPosition += 5;
            vehicles.forEach((vehicle, index) => {
                doc.text(`Vehicle: ${vehicle.year} ${vehicle.make} ${vehicle.model}`, 10, yPosition);
                yPosition += 10;
            });
        } else {
            doc.text("No vehicles available", 10, yPosition);
            yPosition += 10;
        }

        doc.save("PolicyDetails.pdf");
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Policy Details
                </h2>
            }
        >
        <Head title="Update Policy"/>

        <div className="py-12">
            <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <div className="flex justify-end gap-4 m-2">
                        <Link
                            onClick={downloadPolicyAsPDF}
                            as="button"
                            className="px-4 py-2 text-white bg-blue-900 rounded-lg hover:bg-blue-500"
                        >
                            Download
                        </Link>
                        <Link
                            href={route('policy-details')}
                            method="get"
                            as="a"
                            className="px-4 py-2 text-white bg-green-600 rounded-lg hover:bg-green-400"
                        >
                            Back
                        </Link>
                    </div>
                    <UpdateDetails
                        component_data={component_data}
                        className="w-full"
                    />
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <UpdateAccountHolderDetails
                        component_data={component_data}
                        className="w-full"
                    />
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <UpdateAccountHolderAddress
                        component_data={component_data}
                        className="w-full"
                    />
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <DriversList
                        component_data={component_data}
                        className="w-full"
                    />
                </div>

                <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                    <VehicleList
                        component_data={component_data}
                        className="w-full"
                    />
                </div>
            </div>
        </div>

</AuthenticatedLayout>
)
    ;
}
