class ValidateInfo
  include ActiveModel::Validations

  validates :name, presence: true
  validates :email, format: /\A[\w\d._-]+@[\w\d.-]+\.[\w\d.]+\z/
  validates :message, presence: true
  
  def initialize params
    @name = params[:name]
    @email = params[:email]
    @message = params[:message]
  end

  private
    attr_reader :name, :email, :message

end
