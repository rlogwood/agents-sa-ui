Rails.application.routes.draw do
  get 'contact', to: 'site#contact'
  get 'analyze', to: 'site#analyze'
  get 'home', to: 'site#index'
  get 'home',  to: 'site#index'
  root to: 'site#index'
  get 'site/index'
  get 'site/analyze'
  get 'site/contact'
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Defines the root path route ("/")
  # root "articles#index"
end
