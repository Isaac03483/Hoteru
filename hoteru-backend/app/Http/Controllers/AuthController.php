<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeType;
use Illuminate\Http\Request;

class AuthController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //

    }

    /**
     * Display the specified resource.
     */
    public function show($username, $password)
    {
        //
        $employee = Employee::query()->select('id','username','name','employee_type_id')
            ->where('username',$username)->where('password',$password)->firstOrFail();

        $employeeType = EmployeeType::query()->select()
            ->where('id', $employee->employee_type_id)->first();

        $response = new Employee;

        $response->username = $employee->username;
        $response->name = $employee->name;
        $response->type = $employeeType->type;
        return $response;
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
