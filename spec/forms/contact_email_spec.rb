require "rails_helper"


RSpec.describe ContactEmail do
  let(:blank_details) { ContactEmail.new }
  let(:invalid_details) {
    ContactEmail.new({
      name: "Example",
      email: "example@test",
      message: "message",
    })
  }
  let(:valid_details) {
    ContactEmail.new({
      name: "Example",
      email: "example@test.com",
      message: "message",
    })
  }


  describe "validate attributes" do
    it "is invalid without a name" do
      blank_details.should_not be_valid
    end

    it "is invalid without a message" do
      blank_details.should_not be_valid
    end

    it "is invalid without an email" do
      blank_details.should_not be_valid
    end

    it "is invalid with an invalid email" do
      invalid_details.should_not be_valid
    end

    it "is valid with a name" do
      valid_details.should be_valid
    end

    it "is valid with a message" do
      valid_details.should be_valid
    end

    it "is valid with a valid email" do
      valid_details.should be_valid
    end

  end


  describe "sent?" do
    context "with invalid attributes" do
      it "returns false" do
        expect(blank_details.sent?).to eq(false)
        expect(invalid_details.sent?).to eq(false)
      end

      it "does not send an email" do
        expect { blank_details.sent? }
          .to change { ActionMailer::Base.deliveries.count }.by(0)

        expect { invalid_details.sent? }
          .to change { ActionMailer::Base.deliveries.count }.by(0)
      end
    end

    context "with valid attributes" do
      it "returns true" do
        expect(valid_details.sent?).to eq(true)
      end

      it "sends an email" do
        expect { valid_details.sent? }
          .to change { ActionMailer::Base.deliveries.count }.by(1)
      end
    end
  end
end
