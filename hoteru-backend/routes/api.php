<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\EmployeeController;
use \App\Http\Controllers\EmployeeTypeController;
use \App\Http\Controllers\AuthController;
use \App\Http\Controllers\RoomTypeController;

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
Route::post('employees', [EmployeeController::class, 'store']);

Route::get('employee-types', [EmployeeTypeController::class, 'index']);
Route::get('employee-types/{id}', [EmployeeTypeController::class, 'show']);
Route::post('employee-types', [EmployeeTypeController::class, 'store']);

Route::get('auth/{username}/{password}', [AuthController::class, 'show']);

Route::get('room-types', [RoomTypeController::class, 'index']);
Route::post('room-types', [RoomTypeController::class, 'store']);
