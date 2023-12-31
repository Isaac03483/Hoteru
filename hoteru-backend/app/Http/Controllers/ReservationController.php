<?php

namespace App\Http\Controllers;

use App\Models\Client;
use App\Models\Reservation;
use App\Models\Room;
use App\Models\RoomType;
use DateTime;
use Illuminate\Http\Request;

class ReservationController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $reservations = Reservation::all();
        $r_response = [];

        foreach ($reservations as $reservation) {
            $r = new Reservation;
            $r->id = $reservation->id;
            $r->nit = $reservation->nit;
            $r->roomId = $reservation->room_id;
            $r->date = $reservation->date;
            $r->initDate = $reservation->init_date;
            $r->endDate = $reservation->end_date;
            $r->total = $reservation->total;

            $r_response[] = $r;

        }

        return $r_response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $reservation = new Reservation;
        $reservation->nit = $request->nit;
        $reservation->room_id = $request->room_id;
        $reservation->init_date = $request->init_date;
        $reservation->end_date = $request->end_date;
        $reservation->date = date('Y-m-d');

        $client = Client::updateOrCreate(['nit' => $reservation->nit], ['name' => $request->name]);

        $room = Room::query()->where('id', $reservation->room_id)->firstOrFail();

        $roomType = RoomType::query()->where('id', $room->room_type_id)->first();

        $init_date = new DateTime($reservation->init_date);
        $end_date = new DateTime($reservation->end_date);

        $findReservations = Reservation::query()->where('room_id', $reservation->room_id)
            ->whereBetween('init_date', [$init_date, $end_date])
            ->orWhere('room_id', $reservation->room_id)
            ->WhereBetween('end_date', [$init_date, $end_date])->first();

        if($findReservations !== null) {
            abort(400, 'La habitación se ha reservado en esas fechas.');
        }

        $days = $init_date->diff($end_date)->d + 1;

        $reservation->total = $days * $roomType->cost_per_day;

        $reservation->save();
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

    public function todayReservations()
    {
        $currentDate = date('Y-m-d');
        $reservations = Reservation::query()->where('init_date', $currentDate)->get();

        $r_response = [];

        foreach ($reservations as $reservation) {
            $r = new Reservation;
            $r->id = $reservation->id;
            $r->nit = $reservation->nit;
            $r->roomId = $reservation->room_id;
            $r->date = $reservation->date;
            $r->initDate = $reservation->init_date;
            $r->endDate = $reservation->end_date;
            $r->total = $reservation->total;

            $r_response[] = $r;

        }

        return $r_response;
    }
}
