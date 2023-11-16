<?php

namespace App\Http\Controllers;

use App\Models\Employee;
use App\Models\EmployeeType;
use App\Models\Task;
use Illuminate\Http\Request;

class TaskController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        //
        $tasks = Task::all();
        $task_response = [];

        foreach ($tasks as $task) {
            $type = EmployeeType::query()->select('type')
                ->where('id', $task->employee_type_id)->first();



            $t = new Task;
            $t->id = $task->id;
            $t->name = $task->name;
            $t->description = $task->description;
            $t->date = $task->date;
            $t->type = $type->type;
            $t->state = $task->state;

            if($task->employee_id !== 0) {
                $employee = Employee::query()->select('name')
                    ->where('id', $task->employee_id)->first();
                $t->employee = $employee->name;
            } else {
                $t->employee = 'sin nombre';
            }

            $task_response[] = $t;
        }

        return $task_response;
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
        $task = new Task;
        $task->name = $request->name;
        $task->description = $request->description;
        $task->date = date('Y-m-d');
        $task->employee_type_id = $request->employee_type_id;
        $task->state = 'pendiente';

        $task->save();
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
