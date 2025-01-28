import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, Link, useForm} from '@inertiajs/react';
import DateInput from "@/Components/DateInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function AddVehicle({component_data, className = ''}) {

    const { data, setData, post, errors, processing } =
        useForm({
            year: '',
            make: '',
            model: '',
            vin: '',
            usage: '',
            primary_use: '',
            annual_mileage: '',
            ownership: '',
        });


    const submit = (e) => {
        e.preventDefault();

        post(route('add-vehicle', component_data.policy));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Policy Details
                </h2>
            }
        >
            <Head title="Add Vehicle"/>
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
                        <form onSubmit={submit}>
                            <div className="row grid grid-cols-2 gap-4">
                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="year" value="Year"/>
                                    <TextInput
                                        id="year"
                                        name="year"
                                        type="number"
                                        value={data.year}
                                        className="mt-1 block w-full"
                                        autoComplete="year"
                                        isFocused={true}
                                        onChange={(e) => setData('year', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.year} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="make" value="Make"/>
                                    <TextInput
                                        id="make"
                                        name="make"
                                        value={data.make}
                                        className="mt-1 block w-full"
                                        autoComplete="make"
                                        isFocused={true}
                                        onChange={(e) => setData('make', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.make} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="model" value="Model"/>
                                    <TextInput
                                        id="model"
                                        className="mt-1 block w-full"
                                        value={data.model}
                                        onChange={(e) => setData('model', e.target.value)}
                                        required
                                        autoComplete="model"
                                    />
                                    <InputError className="mt-2" message={errors.model}/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="vin" value="Vin no."/>
                                    <TextInput
                                        id="vin"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.vin}
                                        onChange={(e) => setData('vin', e.target.value)}
                                        required
                                        autoComplete="vin"
                                    />
                                    <InputError className="mt-2" message={errors.vin}/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="usage"
                                        label="Usage"
                                        value={data.usage}
                                        options={component_data.usageSelect}
                                        onChange={(value) => setData("usage", value)}
                                        required
                                    />
                                    <InputError message={errors.usage} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="primary_use"
                                        label="Primary Use"
                                        value={data.primary_use}
                                        options={component_data.primaryUseSelect}
                                        onChange={(value) => setData("primary_use", value)}
                                        required
                                    />
                                    <InputError message={errors.primary_use} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="annual_mileage" value="Annual Mileage"/>
                                    <TextInput
                                        id="annual_mileage"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.annual_mileage}
                                        onChange={(e) => setData('annual_mileage', e.target.value)}
                                        required
                                        autoComplete="vin"
                                    />
                                    <InputError className="mt-2" message={errors.annual_mileage}/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="ownership"
                                        label="Ownership"
                                        value={data.ownership}
                                        options={component_data.ownershipSelect}
                                        onChange={(value) => setData("ownership", value)}
                                        required
                                    />
                                    <InputError message={errors.ownership} className="mt-2"/>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Add Vehicle
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
