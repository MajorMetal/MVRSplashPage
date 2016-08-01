# =========================
# Routes
# =========================
#    root GET  /                  main#home
# contact POST /contact(.:format) main#contact


class MainController < ApplicationController
  # Internal: Checks for mobile device.
  before_filter :check_for_mobile, only: [:home]
  # Internal: Builds contact email object.
  before_action :build_email


  # Public: Renders home page.
  #
  # Renders home page.
  def home
  end

  # Public: Sends contact email.
  #
  # Redirects to home page.
  def contact
    if @email.sent?
      redirect_to root_path, success: "Email sent"
    else
      render :home
    end
  end


  private

  # Internal: Builds new contact email object.
  #
  # Returns worker.
  def build_email
    @email = ContactEmail.new(params[:email])
  end

end
