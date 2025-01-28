<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Http\Requests\VehicleRequest;
use App\Models\Policy;
use App\Models\Vehicle;
use App\View\Model\PolicyViewModel;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Inertia\Inertia;
use Inertia\Response;

class VehiclesController extends Controller
{
    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Vehicles/Create', [
            'component_data' => new PolicyViewModel(auth()->user()->getPolicy()),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(VehicleRequest $request, Policy $policy)
    {
        $validated = $request->validated();

        Vehicle::create([
            Vehicle::POLICY_ID       => $policy->id,
            Vehicle::MAKE            => $validated['make'],
            Vehicle::MODEL           => $validated['model'],
            Vehicle::YEAR            => $validated['year'],
            Vehicle::VIN             => $validated['vin'],
            Vehicle::USAGE           => $validated['usage'],
            Vehicle::PRIMARY_USAGE   => $validated['primary_use'],
            Vehicle::ANNUAL_MILEAGE  => $validated['annual_mileage'],
            Vehicle::OWNERSHIP       => $validated['ownership'],
        ]);

        return redirect(route('edit-policy', $policy));
    }


    /**
     * Show the form for editing the specified resource.
     */
    public function edit(int $vehicle_id): Response
    {
        $vehicle = Vehicle::query()->findOrFail($vehicle_id);
        $policy = $vehicle->getPolicy();

        return Inertia::render('Vehicles/Edit', [
            'component_data' => new PolicyViewModel($policy, null, null, null, $vehicle),
        ]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(VehicleRequest $request, Vehicle $vehicle): Application|Redirector|RedirectResponse
    {
        $validated = $request->validated();

        $vehicle->update([
            Vehicle::MAKE            => $validated['make'],
            Vehicle::MODEL           => $validated['model'],
            Vehicle::YEAR            => $validated['year'],
            Vehicle::VIN             => $validated['vin'],
            Vehicle::USAGE           => $validated['usage'],
            Vehicle::PRIMARY_USAGE   => $validated['primary_use'],
            Vehicle::ANNUAL_MILEAGE  => $validated['annual_mileage'],
            Vehicle::OWNERSHIP       => $validated['ownership'],
        ]);

        return redirect(route('edit-policy', $vehicle->getPolicy()));
    }

    /**
     * Update vehicle garage details
     *
     * @param AddressRequest $request
     * @param Vehicle $vehicle
     *
     * @return RedirectResponse
     */
    public function updateVehicleGarage(AddressRequest $request, Vehicle $vehicle): RedirectResponse
    {
        $validated = $request->validated();

        $vehicle->relatedGarage()->updateOrCreate(
            ['vehicle_id' => $vehicle->id],
            [
                'street'   => $validated['street'],
                'city'     => $validated['city'],
                'state'    => $validated['state'],
                'zip' => $validated['zip'],
            ]
        );

        return redirect(route('edit-policy', $vehicle->getPolicy()));
    }

    public function updateVehicleCoverage(Request $request, Vehicle $vehicle): RedirectResponse
    {
        $vehicle->relatedCoverages()->syncWithoutDetaching($request->coverage);

        return redirect()->route('edit-vehicle', $vehicle);
    }

    public function detachCoverage(Vehicle $vehicle, int $coverage_id): RedirectResponse {
        $vehicle->relatedCoverages()->detach($coverage_id);

        return redirect()->route('edit-vehicle', $vehicle);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        Vehicle::destroy($id);
    }
}
