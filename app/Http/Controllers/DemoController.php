<?php

namespace App\Http\Controllers;

use Helper;
use App\Post;
use Illuminate\Http\Request;


class DemoController extends Controller
{
    public function viewReactInfiniteScroll() 
    {    
        return view('demo.reactInfiniteScroll');  
    }
    public function getReactInfiniteScroll(Request $request) 
    {
        $posts = Post::limit(20)->offset($request->offset)->get();
        return $posts; 
    }
}
