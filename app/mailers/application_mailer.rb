class ApplicationMailer < ActionMailer::Base
  default from: ENV['MONSTERVR_EMAIL']
  layout 'mailer'

end
