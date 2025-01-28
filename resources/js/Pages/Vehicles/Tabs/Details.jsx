import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import {useForm} from '@inertiajs/react';
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function UpdateVehicleDetails({component_data, className = ''}) {

    const { data, setData, patch, errors, processing } =
        useForm({
            year: component_data.vehicle.year || '',
            make: component_data.vehicle.make || '',
            model: component_data.vehicle.model || '',
            vin: component_data.vehicle.vin || '',
            usage: component_data.vehicle.usage || '',
            primary_use: component_data.vehicle.primary_use || '',
            annual_mileage: component_data.vehicle.annual_mileage || '',
            ownership: component_data.vehicle.ownership || '',
        });


    const submit = (e) => {
        e.preventDefault();

        patch(route('update-vehicle', component_data.vehicle));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Policy Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your policy details.
                </p>
            </header>

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
                            Update Vehicle
                        </PrimaryButton>
                    </div>
                </form>
        </section>
    );
}
