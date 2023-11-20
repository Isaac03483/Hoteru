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
                $t->employee = $employee->name ?? 'sin nombre';
            } else {
                $t->employee = 'sin nombre';
            }

            $task_response[] = $t;
        }

        return $task_response;
    }

    public function findEmployeeTypeTasks(int $type)
    {

        $tasks = Task::query()->select()->where('employee_type_id', $type)
            ->where('date', date('Y-m-d'))
            ->where('state', 'pendiente')->get();
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

                $t->employee = $employee->name ?? 'sin nombre';
            } else {
                $t->employee = 'sin nombre';
            }

            $task_response[] = $t;
        }

        return $task_response;
    }

    public function findEmployeeTasks(int $id)
    {
        $tasks = Task::query()->select()->where('employee_id', $id)
            ->where('date', date('Y-m-d'))->get();
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

                $t->employee = $employee->name ?? 'sin nombre';

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
    public function update(Request $request)
    {
        //

        $task = new Task;
        $task->id = $request->id;
        $task->name = $request->name;
        $task->description = $request->description;

        return Task::query()->where('id', $task->id)
            ->update(['name' => $task->name, 'description' => $task->description]);

    }

    public function updateTaskState(Request $request)
    {
        $task = new Task;
        $task->id = $request->id;
        $task->employee = $request->employee;
        $task->state = $request->state;

        return Task::query()->where('id',$task->id)
            ->update(['employee_id' => $task->employee, 'state' => $task->state]);
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(int $id)
    {
        //
        return Task::destroy($id);
    }
}
