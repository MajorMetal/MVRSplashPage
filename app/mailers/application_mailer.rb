class ApplicationMailer < ActionMailer::Base
  layout "mailer"
  default to: ENV.fetch("DEFAULT_EMAIL")
end
