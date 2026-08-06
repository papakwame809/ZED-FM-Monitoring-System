<?php

namespace App\Http\Controllers;

use App\Models\Incident;
use Illuminate\Http\Request;


class IncidentController extends Controller
{

    /**
     * Display all incidents.
     */
    public function index()
    {

        return Incident::with('asset')
            ->get();

    }




    /**
     * Store a new incident.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([

            'asset_id' => 'required|exists:assets,id',

            'title' => 'required|string',

            'description' => 'nullable|string',

            'status' => 'required|string',

            'reported_date' => 'required|date',

        ]);



        $incident = Incident::create(
            $validated
        );



        return response()->json(
            $incident,
            201
        );

    }





    /**
     * Display one incident.
     */
    public function show(string $id)
    {

        return Incident::with('asset')
            ->findOrFail($id);

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

            'title' => 'sometimes|string',

            'description' => 'nullable|string',

            'status' => 'sometimes|string',

            'reported_date' => 'sometimes|date',

        ]);



        $incident->update(
            $validated
        );



        return $incident;

    }







    /**
     * Delete incident.
     */
    public function destroy(string $id)
    {

        $incident = Incident::findOrFail($id);



        $incident->delete();



        return response()->json([

            'message' => 'Incident deleted successfully'

        ]);

    }

}
