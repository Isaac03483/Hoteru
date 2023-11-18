<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Client extends Model
{
    protected $primaryKey = 'nit';
    public $incrementing = false;

    use HasFactory;
    protected $fillable = ['nit', 'name'];
    public $timestamps = false;
}
