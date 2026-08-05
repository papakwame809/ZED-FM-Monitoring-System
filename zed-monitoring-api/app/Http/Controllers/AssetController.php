<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;


class AssetController extends Controller
{

    /**
     * Display all assets.
     */
    public function index()
    {
        return response()->json(
            Asset::all()
        );
    }





    /**
     * Store a new asset.
     */
    public function store(Request $request)
    {

        $validated = $request->validate([

            'name' => 'required|string',

            'type' => 'required|string',

            'location' => 'required|string',

            'status' => 'required|string',

            'serial_number' => 'required|string|unique:assets,serial_number',

            'purchase_date' => 'nullable|date',

            'last_service' => 'nullable|string',

            'warranty' => 'nullable|string',

        ]);



        $asset = Asset::create($validated);



        return response()->json(

            $asset,

            201

        );

    }







    /**
     * Display a single asset.
     */
    public function show(string $id)
    {

        $asset = Asset::findOrFail($id);



        return response()->json(

            $asset

        );

    }







    /**
     * Update an asset.
     */
    public function update(Request $request, string $id)
    {

        $asset = Asset::findOrFail($id);



        $validated = $request->validate([

            'name' => 'sometimes|string',

            'type' => 'sometimes|string',

            'location' => 'sometimes|string',

            'status' => 'sometimes|string',

            'serial_number' => 'sometimes|string|unique:assets,serial_number,' . $id,

            'purchase_date' => 'nullable|date',

            'last_service' => 'nullable|string',

            'warranty' => 'nullable|string',

        ]);

        $asset->update($validated);

        return response()->json(

            $asset

        );

    }
    public function destroy(string $id)
    {

        $asset = Asset::findOrFail($id);

        $asset->delete();

        return response()->json([

            'message' => 'Asset deleted successfully'

        ]);

    }

}
