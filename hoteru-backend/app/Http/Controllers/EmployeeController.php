<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeType;
use Illuminate\Http\Request;

class EmployeeController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $employees = Employee::all();
        $employees_response = [];

        foreach ($employees as $employee) {
            $type = EmployeeType::query()->select('type')
                ->where('id',$employee->employee_type_id)->first();

            $e = new Employee;
            $e->id = $employee->id;
            $e->username = $employee->username;
            $e->name = $employee->name;
            $e->password = $employee->password;
            $e->type = $type->type;

            array_push($employees_response, $e);
        }

        return $employees_response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $validate = $request->validate([
            'username' => 'required',
            'password' => 'required',
            'name' => 'required',
            'employee_type_id' => 'required'
        ]);

        $employee = new Employee;

        $employee->username = $request->username;
        $employee->password = $request->password;
        $employee->name = $request->name;
        $employee->employee_type_id = $request->employee_type_id;

        $employee->save();
    }

    /**
     * Display the specified resource.
     */
    public function show($username, $password)
    {
        //

    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, int $id)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
    }
}
