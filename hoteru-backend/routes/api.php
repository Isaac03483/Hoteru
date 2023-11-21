<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\EmployeeController;
use App\Http\Controllers\EmployeeTypeController;
use App\Http\Controllers\AuthController;
use App\Http\Controllers\RoomTypeController;
use App\Http\Controllers\RoomController;
use App\Http\Controllers\TaskController;
use App\Http\Controllers\ReservationController;
use App\Http\Controllers\ClientController;
use App\Http\Controllers\ReportController;

/*
|--------------------------------------------------------------------------
| API Routes
|--------------------------------------------------------------------------
|
| Here is where you can register API routes for your application. These
| routes are loaded by the RouteServiceProvider and all of them will
| be assigned to the "api" middleware group. Make something great!
|
*/

Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    return $request->user();
});


Route::get('employees', [EmployeeController::class, 'index']);
Route::get('employees/{id}', [EmployeeController::class, 'show']);
Route::post('employees', [EmployeeController::class, 'store']);
Route::put('employees', [EmployeeController::class, 'update']);
Route::delete('employees/{id}', [EmployeeController::class, 'destroy']);

Route::get('employee-types', [EmployeeTypeController::class, 'index']);
Route::get('employee-types/{id}', [EmployeeTypeController::class, 'show']);
Route::post('employee-types', [EmployeeTypeController::class, 'store']);
Route::delete('employee-types/{id}', [EmployeeTypeController::class, 'destroy']);

Route::get('auth/{username}/{password}', [AuthController::class, 'show']);

Route::get('room-types', [RoomTypeController::class, 'index']);
Route::post('room-types', [RoomTypeController::class, 'store']);
Route::delete('room-types/{id}', [RoomTypeController::class, 'destroy']);


Route::get('rooms', [RoomController::class, 'index']);
Route::post('rooms', [RoomController::class, 'store']);
Route::get('rooms/available', [RoomController::class, 'findAvailableRooms']);
Route::delete('rooms/{id}', [RoomController::class, 'destroy']);

Route::get('tasks',  [TaskController::class, 'index']);
Route::post('tasks', [TaskController::class, 'store']);
Route::put('tasks', [TaskController::class, 'update']);
Route::put('tasks/employees', [TaskController::class, 'updateTaskState']);
Route::get('tasks/undone/{type}', [TaskController::class, 'findEmployeeTypeTasks']);
Route::get('tasks/my-tasks/{id}', [TaskController::class, 'findEmployeeTasks']);
Route::delete('tasks/{id}', [TaskController::class, 'destroy']);

Route::get('clients/find/{nit}', [ClientController::class, 'show']);

Route::get('reservations', [ReservationController::class, 'index']);
Route::post('reservations', [ReservationController::class, 'store']);
Route::get('reservations/today', [ReservationController::class, 'todayReservations']);

Route::get('reports/today-tasks', [ReportController::class, 'countTodayTasks']);
Route::get('reports/earnings/{init}/{end}', [ReportController::class, 'earnings']);
Route::get('reports/best-room-types', [ReportController::class, 'bestRoomTypes']);
Route::get('reports/best-clients', [ReportController::class, 'bestClients']);
