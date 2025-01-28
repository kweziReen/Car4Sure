<?php

namespace Database\Seeders;

use App\Models\Coverage;
use Carbon\Carbon;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class CoverageSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        $coverages = [
            [
                Coverage::TYPE => 'Liability',
                Coverage::LIMIT => '25000',
                Coverage::DEDUCTIBLE => '500',
                Coverage::CREATED_AT => Carbon::now(),
                Coverage::UPDATED_AT => Carbon::now(),
            ],
            [
                Coverage::TYPE => 'Collision',
                Coverage::LIMIT => '25000',
                Coverage::DEDUCTIBLE => '500',
                Coverage::CREATED_AT => Carbon::now(),
                Coverage::UPDATED_AT => Carbon::now(),
            ],
            [
                Coverage::TYPE => 'Comprehensive',
                Coverage::LIMIT => '25000',
                Coverage::DEDUCTIBLE => '500',
                Coverage::CREATED_AT => Carbon::now(),
                Coverage::UPDATED_AT => Carbon::now(),
            ]

        ];

        DB::table('coverages')->insert($coverages);
    }
}
