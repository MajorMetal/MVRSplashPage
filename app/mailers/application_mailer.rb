class ApplicationMailer < ActionMailer::Base
  layout "mailer"

  default to: ENV["DEFAULT_EMAIL"]
end
