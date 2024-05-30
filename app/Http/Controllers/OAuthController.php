<?php

namespace App\Http\Controllers;

use App\Models\User;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Laravel\Socialite\Facades\Socialite;

class OAuthController extends Controller
{
    public function redirect(string $provider): RedirectResponse
    {
        return Socialite::driver($provider)->redirect();
    }

    public function callback(string $provider): RedirectResponse
    {
        $oauth_user = Socialite::driver($provider)->user();

        // TODO: Either break up functions for each provider, or allow user to have many providers
        $user = User::updateOrCreate([
            'github_id' => $oauth_user->getId(),
        ], [
            'username' => $oauth_user->getNickname(),
            'avatar' => $oauth_user->getAvatar(),
            'github_id' => $oauth_user->getId(),
            'github_token' => $oauth_user->token,
            'email' => $oauth_user->getEmail()
        ]);

        Auth::login($user);

        return redirect(route('overview'));
    }
}
