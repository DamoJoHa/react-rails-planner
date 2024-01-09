Rails.application.routes.draw do
  resources :entries, only: [:index]
  namespace :api do
    namespace :v1 do
      resources :diaries, only: [:show, :update]
      resources :workouts, only: [:show, :update]
      resources :tasks, only: [:create, :index, :update]
      # The route below only flip-flops completedness, and takes an empty body
      patch "tasks/:id/complete", to: "tasks#mark_complete"
    end
  end

  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "entries#index"
end
