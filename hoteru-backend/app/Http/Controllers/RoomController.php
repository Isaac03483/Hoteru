<?php

namespace App\Http\Controllers;

use App\Models\Room;
use App\Models\RoomType;
use Illuminate\Http\Request;

class RoomController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $rooms = Room::all();
        $roomsResponse = [];

        foreach ($rooms as $room) {
            $type = RoomType::query()->select()
                ->where('id',$room->room_type_id)->first();

            $r = new Room;
            $r->id = $room->id;
            $r->state = $room->state;
            $r->type = $type->type;
            $r->cost = $type->cost_per_day;

            $roomsResponse[] = $r;
        }

        return $roomsResponse;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $room = new Room;
        $room->room_type_id = $request->room_type_id;
        $room->state = 'disponible';

        $room->save();
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
