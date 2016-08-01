require "rails_helper"

RSpec.describe MainController do
  describe "GET #home" do
    it "renders the home template" do
      get :home
      expect(response).to have_http_status(200)
      expect(response).to render_template(:home)
    end

    it "assigns the email object" do
      get :home
      expect(assigns(:email)).to be_a_new(ContactEmail)
    end
  end


  describe "POST #contact" do
    context "with invalid attributes" do
      let(:params) {
        { email: {
          name: "Example",
          email: "example@test",
          message: "message",
        }}
      }

      it "does not send an email" do
        expect{ post :contact, params }
          .to change{ ActionMailer::Base.deliveries.count }.by(0)
      end

      it "renders form" do
        post :contact, params
        expect(response).to render_template(:home)
      end
    end

    context "with valid attributes" do
      let(:params) {
        { email: {
          name: "Example",
          email: "example@test.com",
          message: "message",
        }}
      }

      it "sends an email" do
        expect{ post :contact, params }
          .to change{ ActionMailer::Base.deliveries.count }.by(1)
      end

      it "redirects to home page" do
        post :contact, params
        expect(response).to redirect_to(root_path)
      end
    end
  end
end
