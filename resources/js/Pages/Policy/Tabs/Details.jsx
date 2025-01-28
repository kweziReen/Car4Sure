import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import { useForm, usePage } from '@inertiajs/react';
import DateInput from "@/Components/DateInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";
import TextInput from "@/Components/TextInput.jsx";

export default function UpdateDetails({component_data, className = ''}) {
    const user = usePage().props.auth.user;

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            policy_no: component_data.policy.policy_no || '',
            type: component_data.policy.policy_type || '',
            status: component_data.policy.policy_status || '',
            effective_date: component_data.policy.effective_date || new Date(),
            expiration_date: component_data.policy.expiration_date || new Date(),
        });


    const submit = (e) => {
        e.preventDefault();

        patch(route('update-policy', component_data.policy));
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
                    <div className="col-span-2">
                        <InputLabel htmlFor="policy_no" value="Policy Number"/>

                        <TextInput
                            id="policy_no"
                            className="mt-1 block w-full"
                            value={data.policy_no}
                            onChange={(e) => setData('policy_no', e.target.value)}
                            required
                            isFocused
                            autoComplete="policy_no"
                            disabled
                        />

                        <InputError className="mt-2" message={errors.policy_no}/>
                    </div>

                    <div className="col-span-1 mt-4">
                        <SelectInput
                            name="type"
                            label="Policy Type"
                            value={data.type}
                            options={component_data.policyTypes}
                            onChange={(value) => setData("type", value)}
                            required
                            error={errors.type}
                        />
                        <InputError message={errors.type} className="mt-2"/>
                    </div>

                    <div className="col-span-1 mt-4">
                        <SelectInput
                            name="status"
                            label="Policy Status"
                            value={data.status}
                            options={component_data.policyStatuses}
                            onChange={(value) => setData("status", value)}
                            required
                            error={errors.status}
                        />
                        <InputError message={errors.type} className="mt-2"/>
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
                            disabled
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
                </div>

                <div className="mt-6 flex items-center justify-end">
                        <PrimaryButton className="ms-4" disabled={processing}>
                            Update Policy
                        </PrimaryButton>
                    </div>
            </form>
        </section>
);
}
