<?php

namespace App\Http\Controllers;

use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomTypeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $roomTypes = RoomType::all();
        $typesResponse = [];

        foreach ($roomTypes as $roomType) {
            $r = new RoomType;
            $r->id = $roomType->id;
            $r->type = $roomType->type;
            $r->cost = $roomType->cost_per_day;

            $typesResponse[] = $r;
        }

        return $typesResponse;

    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $roomType = new RoomType;
        $roomType->type  = $request->type;
        $roomType->cost_per_day = $request->cost_per_day;

        $roomType->save();
    }

    /**
     * Display the specified resource.
     */
    public function show(string $id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, string $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        RoomType::destroy($id);
    }
}
