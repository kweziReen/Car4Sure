<?php

namespace App\Http\Controllers;

use App\Http\Requests\AddressRequest;
use App\Http\Requests\PolicyRequest;
use App\Http\Requests\UpdatePolicyRequest;
use App\Models\Policy;
use App\View\Model\PolicyViewModel;
use Carbon\Carbon;
use Illuminate\Foundation\Application;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Redirector;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;

class PolicyController extends Controller
{
    /**
     * Show list of resources.
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function index(): Application|RedirectResponse|Redirector
    {
        $user = auth()->user();

        if (! is_null($user->getPolicy())) {
            return redirect(route('edit-policy', $user->getPolicy()));
        }

        return redirect(route('create-create'));
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create(): Response
    {
        return Inertia::render('Policy/Create', [
            'component_data' => new PolicyViewModel(),
        ]);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param PolicyRequest $request
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function store(PolicyRequest $request): Application|Redirector|RedirectResponse
    {
        $request->validated();

        $policy = Policy::create([
            Policy::USER_ID         => auth()->user()->id,
            Policy::POLICY_NO       => 'PL'.auth()->user()->id.strtoupper(Str::random(4)).Carbon::now()->format('Ymd'),
            Policy::POLICY_STATUS   => 'in-active',
            Policy::POLICY_TYPE     => $request->type,
            Policy::EFFECTIVE_DATE  => $request->effective_date,
            Policy::EXPIRATION_DATE => $request->expiration_date
        ]);

        return redirect(route('edit-policy', $policy));
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param Policy $policy
     *
     * @return Response
     */
    public function edit(Policy $policy): Response
    {
        return Inertia::render('Policy/Edit', [
            'component_data' => new PolicyViewModel($policy),
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param UpdatePolicyRequest $request
     * @param Policy $policy
     *
     * @return Application|Redirector|RedirectResponse
     */
    public function update(UpdatePolicyRequest $request, Policy $policy): Application|Redirector|RedirectResponse
    {
        $request->validated();

        $policy->update([
            Policy::POLICY_STATUS   => $request->status,
            Policy::POLICY_TYPE     => $request->type,
            Policy::EFFECTIVE_DATE  => $request->effective_date,
            Policy::EXPIRATION_DATE => $request->expiration_date
        ]);

        return redirect(route('edit-policy', $policy));
    }

    /**
     * Update policy holder details
     *
     * @param Request $request
     * @param Policy $policy
     *
     * @return RedirectResponse
     */
    public function updatePolicyHolder(Request $request, Policy $policy): RedirectResponse
    {
        $user = $policy->getUser();


        $user->update([
            'name' => $request->name,
            'surname' => $request->surname
        ]);

        return redirect(route('edit-policy', $policy));
    }

    /**
     * Update policy holder details
     *
     * @param AddressRequest $request
     * @param Policy $policy
     *
     * @return RedirectResponse
     */
    public function updatePolicyAddress(AddressRequest $request, Policy $policy): RedirectResponse
    {
        $validated = $request->validated();

        $holder = $policy->getUser();

        $holder->relatedAddress()->updateOrCreate(
            ['user_id' => $holder->id],
            [
                'street'   => $validated['street'],
                'city'     => $validated['city'],
                'state'    => $validated['state'],
                'zip' => $validated['zip'],
            ]
        );

        return redirect(route('edit-policy', $policy));
    }

    public function download(int $policy_id)
    {
        $policy = Policy::findOrFail($policy_id);
    }

}
