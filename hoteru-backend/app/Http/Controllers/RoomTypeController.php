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
        return RoomType::all();
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $roomType = new RoomType;
        $roomType->type  = $request->type;

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
    public function destroy(string $id)
    {
        //
    }
}
