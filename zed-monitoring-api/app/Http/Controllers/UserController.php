<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\Request;

class UserController extends Controller
{
    // GET /api/users
    public function index()
    {
        return response()->json(User::all());
    }

    // GET /api/users/{id}
    public function show(User $user)
    {
        return response()->json($user);
    }

    // PUT /api/users/{id}
    public function update(Request $request, User $user)
    {
        $validated = $request->validate([
            'name'  => 'sometimes|string|max:255',
            'email' => 'sometimes|email|unique:users,email,' . $user->id,
            'role'  => 'sometimes|string|in:admin,technician,viewer',
        ]);

        $user->update($validated);

        return response()->json([
            'message' => 'User updated successfully',
            'user'    => $user,
        ]);
    }

    // DELETE /api/users/{id}
    public function destroy(User $user)
    {
        $user->delete();

        return response()->json(['message' => 'User deleted successfully']);
    }
}
