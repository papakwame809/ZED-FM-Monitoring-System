<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use App\Models\Notification;
use Illuminate\Http\Request;

class IncidentController extends Controller
{

    /**
     * Display all incidents.
     */
    public function index()
    {
        return response()->json(
            Incident::with('asset')
                ->latest()
                ->get()
        );
    }


    /**
     * Store a new incident.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([

            'asset_id' => [
                'required',
                'exists:assets,id'
            ],

            'title' => [
                'required',
                'string'
            ],

            'description' => [
                'nullable',
                'string'
            ],

            'severity' => [
                'required',
                'string'
            ],

        ]);


        $incident = Incident::create([

            ...$validated,

            'status' => 'Open',

            'incident_date' => now(),

        ]);



        Notification::create([

            'title' => 'New Incident Reported',

            'message' =>
                "{$incident->title} requires attention.",

        ]);



        return response()->json([

            'message' =>
                'Incident created successfully',

            'incident' =>
                $incident->load('asset')

        ], 201);

    }



    /**
     * Display one incident.
     */
    public function show(string $id)
    {

        return response()->json(

            Incident::with('asset')
                ->findOrFail($id)

        );

    }



    /**
     * Update incident.
     */
    public function update(
        Request $request,
        string $id
    )
    {

        $incident = Incident::findOrFail($id);



        $validated = $request->validate([

            'asset_id' => [
                'sometimes',
                'exists:assets,id'
            ],

            'title' => [
                'sometimes',
                'string'
            ],

            'description' => [
                'nullable',
                'string'
            ],

            'severity' => [
                'sometimes',
                'string'
            ],

            'status' => [
                'sometimes',
                'string'
            ],

            'incident_date' => [
                'sometimes',
                'date'
            ],

        ]);



        $incident->update($validated);



        return response()->json([

            'message' =>
                'Incident updated successfully',

            'incident' =>
                $incident
                    ->fresh()
                    ->load('asset')

        ]);

    }



    /**
     * Delete incident.
     */
    public function destroy(string $id)
    {

        $incident = Incident::findOrFail($id);


        $incident->delete();



        return response()->json([

            'message' =>
                'Incident deleted successfully'

        ]);

    }

}
