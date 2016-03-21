class MainController < ApplicationController

  def contact
    send_mailer if valid_info
    redirect_to root_path
  end

  private
    def valid_info
      ValidateInfo.new({
        name: params[:name],
        email: params[:email],
        message: params[:message]
      }).valid?
    end

    def send_mailer
      ContactMailer.send_mail(params[:name], params[:email], params[:message]).deliver_now
    end

end
