<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class AssetController extends Controller
{
    /**
     * Display all assets.
     * GET /api/assets
     */
    public function index()
    {
        return response()->json(Asset::latest()->get());
    }

    /**
     * Store a new asset.
     * POST /api/assets
     */
    public function store(Request $request)
    {
        // Convert empty string dates to null before validation
        if ($request->has('purchase_date') && empty($request->purchase_date)) {
            $request->merge(['purchase_date' => null]);
        }

        $validated = $request->validate([
            'name'          => 'required|string|max:255',
            'type'          => 'required|string|max:255',
            'location'      => 'required|string|max:255',
            'status'        => 'required|string|max:255',
            'serial_number' => 'nullable|string|max:255|unique:assets,serial_number',
            'purchase_date' => 'nullable|date',
            'last_service'  => 'nullable|string|max:255',
            'warranty'      => 'nullable|string|max:255',
        ]);

        $asset = Asset::create($validated);

        return response()->json($asset, 201);
    }

    /**
     * Display a single asset.
     * GET /api/assets/{asset}
     */
    public function show(Asset $asset)
    {
        return response()->json($asset);
    }

    /**
     * Update an asset.
     * PUT/PATCH /api/assets/{asset}
     */
    public function update(Request $request, Asset $asset)
    {
        // Convert empty string dates to null before validation
        if ($request->has('purchase_date') && empty($request->purchase_date)) {
            $request->merge(['purchase_date' => null]);
        }

        $validated = $request->validate([
            'name'          => 'sometimes|required|string|max:255',
            'type'          => 'sometimes|required|string|max:255',
            'location'      => 'sometimes|required|string|max:255',
            'status'        => 'sometimes|required|string|max:255',
            'serial_number' => [
                'nullable',
                'string',
                'max:255',
                Rule::unique('assets', 'serial_number')->ignore($asset->id),
            ],
            'purchase_date' => 'nullable|date',
            'last_service'  => 'nullable|string|max:255',
            'warranty'      => 'nullable|string|max:255',
        ]);

        $asset->update($validated);

        return response()->json($asset);
    }

    /**
     * Delete an asset.
     * DELETE /api/assets/{asset}
     */
    public function destroy(Asset $asset)
    {
        $asset->delete();

        return response()->json([
            'message' => 'Asset deleted successfully'
        ]);
    }
}
