<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use \App\Http\Controllers\EmployeeController;
use \App\Http\Controllers\EmployeeTypeController;
use \App\Http\Controllers\AuthController;

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
//Route::get('employees/{username}/{password}', [EmployeeController::class, 'show']);

Route::get('employee-type', [EmployeeTypeController::class, 'index']);
Route::get('employee-type/{id}', [EmployeeTypeController::class, 'show']);

Route::get('auth/{username}/{password}', [AuthController::class, 'show']);
