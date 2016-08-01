Rails.application.routes.draw do

  root 'main#home'
  post :contact, to: 'main#contact'

end
