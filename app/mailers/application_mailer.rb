class ApplicationMailer < ActionMailer::Base
  default from: ENV['DEFAULT_EMAIL']
  default to:   ENV['DEFAULT_EMAIL']

  layout 'mailer'
end
