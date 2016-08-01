class ContactEmail
  # Internal: Includes ActiveModel Validation callbacks.
  include ActiveModel::Validations

  # Public: Instantiates class attributes.
  attr_accessor :name
  attr_accessor :email
  attr_accessor :message

  # Internal: Defines validations for attributes.
  validates :name, presence: true
  validates :email, email: true
  validates :message, presence: true


  # Public: Initialize Service.
  #
  # params - Parameters by which to create email.
  def initialize(params = {})
    params = params.nil? ? {} : params

    @name = params[:name]
    @email = params[:email]
    @message = params[:message]
  end

  # Public: Validates email before sending.
  #
  # Returns whether email is valid.
  def sent?
    if valid?
      deliver
      true
    else
      false
    end
  end

  # Public: Method used in testing!!!
  #
  # Returns true.
  def new_record?
    true
  end


  private

  # Internal: Sends email.
  #
  # Returns nothing.
  def deliver
    ContactMailer.build(self).deliver_now
  end

end
