require 'rails_helper'

RSpec.describe MainController do
  # =========================
  #     Home Page Tests
  # =========================
  describe 'GET #home' do
    it 'renders the home template' do
      get :home
      expect(response).to have_http_status(200)
      expect(response).to render_template(:home)
    end
  end


  # =========================
  #    Contact Page Tests
  # =========================
  describe 'POST #contact' do
    let(:params) {{name: 'Sam', email: 'sam@test.com', message: 'message'}}

    context 'with valid attributes' do
      it 'sends an email' do
        expect{post :contact, params}.to change{ActionMailer::Base.deliveries.count}.by(1)
      end
    end

    context 'with invalid attributes' do
      it 'does not send an email' do
        expect{post :contact}.to change{ActionMailer::Base.deliveries.count}.by(0)
      end
    end

    it 'redirects to home page' do
      post :contact
      expect(response).to redirect_to(root_path)
    end

  end
end
