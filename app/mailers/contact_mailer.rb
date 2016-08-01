class ContactMailer < ApplicationMailer

  # Public: Builds contact email.
  #
  # Returns nothing.
  def build(details)
    @details = details

    mail(from: details.email, subject: "New email from MonsterVR.com") do |format|
      format.html
    end
  end

end
