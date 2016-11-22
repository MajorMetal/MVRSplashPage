Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html

  root 'main#home'
  post :contact, to: 'main#contact'
  get 'hacknhaunt', to: redirect('http://vrhacknhaunt.devpost.com')
end
