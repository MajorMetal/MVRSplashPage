class ContactMailer < ApplicationMailer

  def send_mail(name, email, message)
    @name     = name
    @email    = email
    @message  = message

    mail(from: email, to: ENV['SAM_EMAIL'], subject: 'New email from MonsterVR.com') do |format|
      format.html
    end

  end
end
