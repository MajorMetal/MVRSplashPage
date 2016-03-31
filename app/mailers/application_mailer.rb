class ApplicationMailer < ActionMailer::Base
  default from: ENV['MONSTERVR_EMAIL']
  default to:   ENV['MONSTERVR_EMAIL']

  layout 'mailer'

end
