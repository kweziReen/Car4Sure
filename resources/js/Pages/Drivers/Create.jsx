import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import {Head, useForm} from '@inertiajs/react';
import DateInput from "@/Components/DateInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";

export default function AddDrivers({component_data, className = ''}) {

    const { data, setData, post, errors, processing } =
        useForm({
            name: '',
            surname: '',
            age: '',
            gender: '',
            marital_status: '',
            license_number: '',
            license_state: '',
            license_status: '',
            effective_date: new Date(),
            expiration_date: new Date(),
            license_class: ''
        });


    const submit = (e) => {
        e.preventDefault();

        post(route('add-driver', component_data.policy));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Policy Details
                </h2>
            }
        >
            <Head title="Add Driver"/>
            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">

                        <form onSubmit={submit}>
                            <div className="row grid grid-cols-2 gap-4">
                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="name" value="Name"/>
                                    <TextInput
                                        id="name"
                                        name="name"
                                        value={data.name}
                                        className="mt-1 block w-full"
                                        autoComplete="name"
                                        isFocused={true}
                                        onChange={(e) => setData('name', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.name} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="surname" value="Surname"/>
                                    <TextInput
                                        id="surname"
                                        name="surname"
                                        value={data.surname}
                                        className="mt-1 block w-full"
                                        autoComplete="surname"
                                        isFocused={true}
                                        onChange={(e) => setData('surname', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.surname} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="age" value="Age"/>
                                    <TextInput
                                        id="age"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.age}
                                        onChange={(e) => setData('age', e.target.value)}
                                        required
                                        autoComplete="age"
                                    />
                                    <InputError className="mt-2" message={errors.age}/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="gender"
                                        label="Gender"
                                        value={data.gender}
                                        options={component_data.genderSelect}
                                        onChange={(value) => setData("gender", value)}
                                        required
                                    />
                                    <InputError message={errors.gender} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="marital_status"
                                        label="Marital Status"
                                        value={data.marital_status}
                                        options={component_data.maritalStatuses}
                                        onChange={(value) => setData("marital_status", value)}
                                        required
                                    />
                                    <InputError message={errors.marital_status} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="license_number" value="License Number"/>
                                    <TextInput
                                        id="license_number"
                                        type="number"
                                        className="mt-1 block w-full"
                                        value={data.license_number}
                                        onChange={(e) => setData('license_number', e.target.value)}
                                        required
                                        autoComplete="license_number"
                                    />
                                    <InputError className="mt-2" message={errors.license_number}/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="license_state"
                                        label="License State"
                                        value={data.license_state}
                                        options={component_data.stateSelect}
                                        onChange={(value) => setData("license_state", value)}
                                        required
                                    />
                                    <InputError message={errors.license_state} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-0">
                                    <SelectInput
                                        name="license_status"
                                        label="License Status"
                                        value={data.license_status}
                                        options={component_data.licenceStatuses}
                                        onChange={(value) => setData("license_status", value)}
                                        required
                                    />
                                    <InputError message={errors.license_status} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="effective_date" value="Effective Date"/>
                                    <DateInput
                                        id="effective_date"
                                        name="effective_date"
                                        value={data.effective_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('effective_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.effective_date} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <InputLabel htmlFor="expiration_date" value="Expiration Date"/>
                                    <DateInput
                                        id="expiration_date"
                                        name="expiration_date"
                                        value={data.expiration_date}
                                        className="mt-1 block w-full"
                                        onChange={(e) => setData('expiration_date', e.target.value)}
                                        required
                                    />
                                    <InputError message={errors.expiration_date} className="mt-2"/>
                                </div>

                                <div className="col-span-1 mt-4">
                                    <SelectInput
                                        name="license_class"
                                        label="License Class"
                                        value={data.license_class}
                                        options={component_data.licenceClasses}
                                        onChange={(value) => setData("license_class", value)}
                                        required
                                    />
                                    <InputError message={errors.license_class} className="mt-2"/>
                                </div>
                            </div>

                            <div className="mt-6 flex items-center justify-end">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Add Driver
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
