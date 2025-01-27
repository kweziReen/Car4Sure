import {useForm} from "@inertiajs/react";
import InputLabel from "@/Components/InputLabel.jsx";
import TextInput from "@/Components/TextInput.jsx";
import InputError from "@/Components/InputError.jsx";
import PrimaryButton from "@/Components/PrimaryButton.jsx";

export default function UpdateAccountHolderDetails({component_data, className = ''}) {

    const { data, setData, patch, errors, processing, recentlySuccessful } =
        useForm({
            name: component_data.policyHolder.name || '',
            surname: component_data.policyHolder.surname || '',
        });


    const submit = (e) => {
        e.preventDefault();

        patch(route('update-policy-holder', component_data.policy));
    };

    return (
        <section className={className}>
            <header>
                <h2 className="text-lg font-medium text-gray-900 dark:text-gray-100">
                    Policy Holder Information Information
                </h2>

                <p className="mt-1 text-sm text-gray-600 dark:text-gray-400">
                    Update your policy details.
                </p>
            </header>
            <form onSubmit={submit}>
                <div className="mt-4">
                    <InputLabel htmlFor="name" value="Name"/>

                    <TextInput
                        id="name"
                        className="mt-1 block w-full"
                        value={data.name}
                        onChange={(e) => setData('name', e.target.value)}
                        required
                        isFocused
                        autoComplete="policy_no"
                    />

                    <InputError className="mt-2" message={errors.name}/>
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="surname" value="Surname"/>

                    <TextInput
                        id="surname"
                        className="mt-1 block w-full"
                        value={data.surname}
                        onChange={(e) => setData('surname', e.target.value)}
                        required
                        isFocused
                        autoComplete="surname"
                    />

                    <InputError className="mt-2" message={errors.surname}/>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    <PrimaryButton className="ms-4" disabled={processing}>
                        Update Policy Holder
                    </PrimaryButton>
                </div>
            </form>
        </section>
    );
}
