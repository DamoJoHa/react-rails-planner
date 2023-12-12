Rails.application.routes.draw do
  resources :entries, only: [:index]
  resources :diaries, only: [:update]

  devise_for :users
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  root "entries#index"
end
