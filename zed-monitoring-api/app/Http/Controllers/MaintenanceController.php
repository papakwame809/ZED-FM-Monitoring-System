<?php

namespace App\Http\Controllers;

use App\Models\Maintenance; // Or App\Models\MaintenanceRecord depending on your model name
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class MaintenanceController extends Controller
{
    /**
     * Display a listing of maintenance records.
     * GET /api/maintenance
     */
    public function index()
    {
        // Eager load asset relationship if defined in your Model
        $records = Maintenance::with('asset')->latest()->get();

        return response()->json($records);
    }

    /**
     * Store a newly created maintenance record in storage.
     * POST /api/maintenance
     */
    public function store(Request $request)
    {
        $validated = $request->validate([
            'asset_id'         => 'required|exists:assets,id',
            'title'            => 'required|string|max:255',
            'description'      => 'nullable|string',
            'type'             => 'required|string',
            'status'           => 'nullable|string',
            'cost'             => 'nullable|numeric|min:0',
            'technician'       => 'nullable|string|max:255',
            'scheduled_date'   => 'nullable|date',
            'completed_date'   => 'nullable|date',
        ]);

        $maintenance = Maintenance::create($validated);

        return response()->json($maintenance, 201);
    }

    /**
     * Display the specified maintenance record.
     * GET /api/maintenance/{id}
     */
    public function show($id)
    {
        $maintenance = Maintenance::with('asset')->findOrFail($id);

        return response()->json($maintenance);
    }

    /**
     * Update the specified maintenance record in storage.
     * PUT/PATCH /api/maintenance/{id}
     */
    public function update(Request $request, $id)
    {
        $maintenance = Maintenance::findOrFail($id);

        $validated = $request->validate([
            'asset_id'         => 'sometimes|required|exists:assets,id',
            'title'            => 'sometimes|required|string|max:255',
            'description'      => 'nullable|string',
            'type'             => 'sometimes|required|string',
            'status'           => 'nullable|string',
            'cost'             => 'nullable|numeric|min:0',
            'technician'       => 'nullable|string|max:255',
            'scheduled_date'   => 'nullable|date',
            'completed_date'   => 'nullable|date',
        ]);

        $maintenance->update($validated);

        return response()->json($maintenance);
    }

    /**
     * Remove the specified maintenance record from storage.
     * DELETE /api/maintenance/{id}
     */
    public function destroy($id)
    {
        $maintenance = Maintenance::findOrFail($id);
        $maintenance->delete();

        return response()->json(['message' => 'Maintenance record deleted successfully']);
    }
}
