<?php

namespace App\Http\Controllers;

use App\Models\MaintenanceRecord;
use Illuminate\Http\Request;


class MaintenanceRecordController extends Controller
{

    /**
     * Display all maintenance records.
     */
    public function index(Request $request)
    {

        $query = MaintenanceRecord::with('asset');



        if($request->has('asset_id')){

            $query->where(
                'asset_id',
                $request->asset_id
            );

        }



        return response()->json(
            $query->get()
        );

    }





    /**
     * Store a new maintenance record.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([

            'asset_id' => 'required|exists:assets,id',

            'task' => 'required|string',

            'technician' => 'required|string',

            'maintenance_date' => 'required|date',

            'status' => 'required|string',

            'notes' => 'nullable|string',

        ]);



        $maintenance = MaintenanceRecord::create(
            $validated
        );



        return response()->json(

            $maintenance,

            201

        );

    }





    /**
     * Display a single maintenance record.
     */
    public function show(string $id)
    {

        $maintenance = MaintenanceRecord::with('asset')
            ->findOrFail($id);



        return response()->json(
            $maintenance
        );

    }





    /**
     * Update maintenance record.
     */
    public function update(
        Request $request,
        string $id
    )
    {

        $maintenance =
            MaintenanceRecord::findOrFail($id);



        $validated = $request->validate([

            'task' => 'sometimes|string',

            'technician' => 'sometimes|string',

            'maintenance_date' => 'sometimes|date',

            'status' => 'sometimes|string',

            'notes' => 'nullable|string',

        ]);



        $maintenance->update(
            $validated
        );



        return response()->json(
            $maintenance
        );

    }





    /**
     * Delete maintenance record.
     */
    public function destroy(string $id)
    {

        $maintenance =
            MaintenanceRecord::findOrFail($id);



        $maintenance->delete();



        return response()->json([

            'message' =>
            'Maintenance record deleted successfully'

        ]);

    }

    public function asset()
{
    return $this->belongsTo(Asset::class);
}

}
