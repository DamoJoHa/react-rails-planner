Rails.application.routes.draw do
  resources :entries, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :diaries, only: [:show, :update]
      resources :workouts, only: [:show, :update]
    end
  end

  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "entries#index"
end
