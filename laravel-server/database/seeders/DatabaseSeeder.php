<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use App\Models\Category;
class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        // \App\Models\User::factory(10)->create();
        DB::table('users')->insert([
            'id' => 1,
            'name' => 'admin',
            'email' => 'admin@gmail.com',
            'role_id' => 1,
            'phone_number' => 0,
            'password' => Hash::make('admin123'),
        ]);
        DB::table('users')->insert([
            'id' =>2,
            'name' => 'user1',
            'email' => 'user1@gmail.com',
            'role_id' => 2,
            'phone_number' => 0,
            'password' => Hash::make('admin123'),
        ]);

        $categories = ['Clothes','Electronics','Tools','Kitchenware','Furniture'];
        foreach($categories as $category){
            DB::table('Categories')->insert([
                'name' => $category,
                'image' => $category,
            ]);
        }
        $items = ['clothes','Sports shoe','T-Shirt','Jogging pants'];
        $desc = ['','Purple shoes with nice shoelace','Black t-Shirt with a good style','Very comfy blu jogging pants'];
        $price = ['',200,150,320];
        for($i = 1 ; $i<count($items);$i++){
            $categ_id = Category::where('name',$items[0])->value('id');
            DB::table('Items')->insert([
                'name' => $items[$i],
                'description' => $desc[$i],
                'price' => $price[$i],
                'category_id' => $categ_id,
                'image' => $items[$i],
            ]);
        }



    }
}
