<?php

namespace App\Http\Controllers;

use App\Models\Reservation;
use App\Models\Task;
use Illuminate\Support\Facades\DB;

class ReportController extends Controller
{
    //
    public function countTodayTasks($currentDate)
    {

        $today = new \DateTime($currentDate);
        $tasks = Task::query()->where('date', $today)
            ->select('state as name', DB::raw('COUNT(*) AS value'))
            ->groupBy('state')->get();

        return $tasks;
    }

    public function earnings($init, $end)
    {

        $initDate = new \DateTime($init);
        $endDate = new \DateTime($end);

        $reservations = Reservation::query()->whereBetween('date', [$initDate,$endDate])
            ->select('date', DB::raw('SUM(total) AS total'))
            ->groupBy('date')->get();

        $total = 0;

        foreach ($reservations as $reservation) {
            $total = $total + $reservation->total;
        }


        $r = new Reservation;
        $r->earnings = $reservations;
        $r->total = $total;

        return $r;

    }

    public function bestRoomTypes()
    {
        return DB::table('room_types')
            ->join(DB::raw('(SELECT rooms.id, rooms.room_type_id FROM reservations JOIN rooms ON reservations.room_id = rooms.id) AS rooms'), function ($join) {
                $join->on('room_types.id', '=', 'rooms.room_type_id');
            })
            ->select('room_types.type as name', DB::raw('COUNT(*) AS value'))
            ->groupBy('room_types.type')
            ->get();
    }

    public function bestClients()
    {
        return DB::table('reservations')
            ->join('clients', 'reservations.nit','=','clients.nit')
            ->select('clients.nit', 'clients.name',
                DB::raw('COUNT(*) AS count'),
                DB::raw('SUM(reservations.total) AS total'))
            ->groupBy('clients.nit')
            ->get();
    }
}
