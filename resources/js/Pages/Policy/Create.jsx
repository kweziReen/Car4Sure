import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout.jsx";
import { Head, Link, useForm} from "@inertiajs/react";

import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import DateInput from "@/Components/DateInput.jsx";
import SelectInput from "@/Components/SelectInput.jsx";

export default function Create({component_data }) {

    const { data, setData, post, processing, errors, reset } = useForm({
        type: '',
        effective_date: new Date(),
        expiration_date: new Date(),
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('store-policy'));
    };

    return (
        <AuthenticatedLayout
            header={
                <h2 className="text-xl font-semibold leading-tight text-gray-800 dark:text-gray-200">
                    Add Policy
                </h2>
            }
        >
            <Head title="Add Policy"/>

            <div className="py-12">
                <div className="mx-auto max-w-7xl space-y-6 sm:px-6 lg:px-8">
                    <div className="bg-white p-4 shadow sm:rounded-lg sm:p-8 dark:bg-gray-800">
                        <div className="flex justify-start gap-4">
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
                            <div className="mt-4">
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

                            <div>
                                <InputLabel htmlFor="effective_date" value="Effectvie Date"/>

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

                            <div>
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

                            <div className="mt-4 flex items-center justify-end">
                                <PrimaryButton className="ms-4" disabled={processing}>
                                    Add Policy
                                </PrimaryButton>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
