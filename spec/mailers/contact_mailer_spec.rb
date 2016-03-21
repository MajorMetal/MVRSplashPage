require 'rails_helper'

RSpec.describe ContactMailer do
  describe 'send_mail' do
    let(:mail) {ContactMailer.send_mail('Sam', 'sam@test.com', 'message')}

    it 'renders the sender email' do
      expect(mail.from).to eql(['sam@test.com'])
    end

    it 'renders the receiver email' do
      expect(mail.to).to eql([ENV['SAM_EMAIL']])
    end

    it 'renders the subject' do
      expect(mail.subject).to eql('New email from MonsterVR.com')
    end

    it 'assigns @name' do
      expect(mail.body.encoded).to match('Sam')
    end

    it 'assigns @email' do
      expect(mail.body.encoded).to match('sam@test.com')
    end

    it 'assigns @message' do
      expect(mail.body.encoded).to match('message')
    end
  end

end
