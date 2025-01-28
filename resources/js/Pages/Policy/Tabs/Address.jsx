import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function UpdateAccountHolderAddress({component_data, className = ''}) {

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            street: component_data.address.street || '',
            city: component_data.address.city || '',
            state: component_data.address.state || '',
            zip: component_data.address.zip || '',
        });


    const submit = (e) => {
        e.preventDefault();

        patch(route('update-policy-address', component_data.policy));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Policy Holder Address
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your policy details.
                </p>
            </header>
            <form onSubmit={submit}>
                <div className="row grid grid-cols-2 gap-4">
                    <div className="col-span-1 mt-4">
                        <InputLabel htmlFor="street" value="Street"/>

                        <TextInput
                            id="street"
                            className="mt-1 block w-full"
                            value={data.street}
                            onChange={(e) => setData('street', e.target.value)}
                            required
                            isFocused
                            autoComplete="street"
                        />

                        <InputError className="mt-2" message={errors.street}/>
                    </div>

                    <div className="col-span-1 mt-4">
                        <InputLabel htmlFor="city" value="City"/>

                        <TextInput
                            id="city"
                            className="mt-1 block w-full"
                            value={data.city}
                            onChange={(e) => setData('city', e.target.value)}
                            required
                            isFocused
                            autoComplete="city"
                        />

                        <InputError className="mt-2" message={errors.city}/>
                    </div>

                    <div className="col-span-1 mt-1">
                        <SelectInput
                            name="state"
                            label="State"
                            value={data.state}
                            options={component_data.stateSelect}
                            onChange={(value) => setData("state", value)}
                            required
                        />
                        <InputError message={errors.state} className="mt-2"/>
                    </div>

                    <div className="col-span-1 mt-4">
                        <InputLabel htmlFor="zip" value="Zipcode"/>

                        <TextInput
                            id="zip"
                            type="number"
                            className="mt-1 block w-1/3"
                            value={data.zip}
                            onChange={(e) => setData('zip', e.target.value)}
                            required
                            isFocused
                            autoComplete="zip"
                        />

                        <InputError className="mt-2" message={errors.zip}/>
                    </div>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Update Address
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
