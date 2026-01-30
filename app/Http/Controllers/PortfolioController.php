<?php

namespace App\Http\Controllers;

use App\Models\Portfolio;
use Illuminate\Http\Request;

class PortfolioController extends Controller
{
    public function index()
    {
        $portfolios = Portfolio::where('is_featured', true)
            ->orderBy('display_order')
            ->get();
        
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $portfolios
            ]);
        }

        $categories = Portfolio::distinct()
            ->pluck('category')
            ->toArray();

        return view('portfolio.index', compact('portfolios', 'categories'));
    }

    public function show($id)
    {
        $portfolio = Portfolio::findOrFail($id);
        
        if (request()->wantsJson()) {
            return response()->json([
                'data' => $portfolio
            ]);
        }

        $relatedPortfolios = Portfolio::where('category', $portfolio->category)
            ->where('id', '!=', $id)
            ->limit(3)
            ->get();

        return view('portfolio.show', compact('portfolio', 'relatedPortfolios'));
    }

    public function byCategory($category)
    {
        $portfolios = Portfolio::where('category', $category)
            ->orderBy('display_order')
            ->get();

        if (request()->wantsJson()) {
            return response()->json([
                'data' => $portfolios
            ]);
        }

        $portfolios = $portfolios->paginate(12);
        return view('portfolio.category', compact('portfolios', 'category'));
    }
}
