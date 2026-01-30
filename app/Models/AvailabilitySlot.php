<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class AvailabilitySlot extends Model
{
    use HasFactory;

    protected $fillable = [
        'service_id',
        'available_date',
        'start_time',
        'end_time',
        'is_booked',
    ];

    protected $casts = [
        'available_date' => 'date',
        'is_booked' => 'boolean',
    ];

    public function service()
    {
        return $this->belongsTo(Service::class);
    }
}
