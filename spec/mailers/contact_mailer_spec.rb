require "rails_helper"


RSpec.describe ContactMailer do
  describe "build" do
    let(:details) {
      ContactEmail.new({
        name: "Example",
        email: "example@test.com",
        message: "message",
      })
    }
    let(:mail) { ContactMailer.build(details) }


    it "renders the sender email" do
      expect(mail.from).to eql([details.email])
    end

    it "renders the receiver email" do
      expect(mail.to).to eql([ENV["DEFAULT_EMAIL"]])
    end

    it "renders the subject" do
      expect(mail.subject).to eql("New email from MonsterVR.com")
    end

    it "renders name" do
      expect(mail.body.encoded).to match(details.name)
    end

    it "renders email" do
      expect(mail.body.encoded).to match(details.email)
    end

    it "renders message" do
      expect(mail.body.encoded).to match(details.message)
    end

  end
end
