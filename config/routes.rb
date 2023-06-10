Rails.application.routes.draw do
  root to: 'static_pages#root'
  namespace :api, defaults: { format: :json } do
    resource :session, only: [ :create, :destroy ]
    resources :users, only: [ :index, :show, :create, :destroy, :update ]
    resources :posts, only: [ :index, :show, :create, :destroy, :update ]
    resources :likes, only: [ :index, :show, :create, :destroy ]
    resources :comments, only: [ :index, :create, :update, :destroy]
    resources :follows, only: [ :index, :show, :create, :destroy ]
  end 
end
