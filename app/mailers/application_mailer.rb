class ApplicationMailer < ActionMailer::Base
  default from: ENV.fetch('DEFAULT_EMAIL')
  default to: ENV.fetch('DEFAULT_EMAIL')

  layout 'mailer'
end
