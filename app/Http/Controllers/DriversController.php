<?php

namespace App\Http\Controllers;


use App\Http\Requests\DriverRequest;
use App\Http\Requests\UpdateDriverRequest;
use App\Models\Driver;
use App\Models\Policy;
use App\View\Model\PolicyViewModel;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Routing\Redirector;
use Inertia\Inertia;
use Inertia\Response;

class DriversController extends Controller
{
    /**
     * Show form for adding driver
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Drivers/Create', [
            'component_data' => new PolicyViewModel(auth()->user()->getPolicy()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param DriverRequest $request
     * @param Policy $policy
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function store(DriverRequest $request, Policy $policy): Application|Redirector|RedirectResponse
    {
        $validated = $request->validated();

        Driver::create([
            Driver::POLICY_ID       => $policy->id,
            Driver::FIRST_NAME      => $validated['name'],
            Driver::LAST_NAME       => $validated['surname'],
            Driver::AGE             => $validated['age'],
            Driver::GENDER          => $validated['gender'],
            Driver::MARITAL_STATUS  => $validated['marital_status'],
            Driver::LICENSE_NUMBER  => $validated['license_number'],
            Driver::LICENSE_STATUS  => $validated['license_status'],
            Driver::LICENSE_STATE   => $validated['license_state'],
            Driver::LICENSE_CLASS   => $validated['license_class'],
            Driver::EFFECTIVE_DATE  => $validated['effective_date'],
            Driver::EXPIRATION_DATE => $validated['expiration_date'],
        ]);

        return redirect(route('edit-policy', $policy));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $driver_id
     *
     * @return Response
     */
    public function edit(int $driver_id): Response
    {
        $driver = Driver::query()->findOrFail($driver_id);
        $policy = $driver->getPolicy();

        return Inertia::render('Drivers/Edit', [
            'component_data' => new PolicyViewModel($policy, null, null, $driver),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdateDriverRequest $request
     * @param Driver $driver
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function update(UpdateDriverRequest $request, Driver $driver): Application|Redirector|RedirectResponse
    {
        $validated = $request->validated();

        $driver->update([
            Driver::FIRST_NAME      => $validated['name'],
            Driver::LAST_NAME       => $validated['surname'],
            Driver::AGE             => $validated['age'],
            Driver::GENDER          => $validated['gender'],
            Driver::MARITAL_STATUS  => $validated['marital_status'],
            Driver::LICENSE_NUMBER  => $validated['license_number'],
            Driver::LICENSE_STATUS  => $validated['license_status'],
            Driver::LICENSE_STATE   => $validated['license_state'],
            Driver::LICENSE_CLASS   => $validated['license_class'],
            Driver::EFFECTIVE_DATE  => $validated['effective_date'],
            Driver::EXPIRATION_DATE => $validated['expiration_date'],
        ]);

        return redirect(route('edit-policy', $driver->getPolicy()));
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param int $id
     *
     * @return void
     */
    public function destroy(int $id): void
    {
        Driver::destroy($id);
    }
}
