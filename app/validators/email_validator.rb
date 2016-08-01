class EmailValidator < ActiveModel::EachValidator

  def validate_each(record, attribute, value)
    if value.blank?
      record.errors[attribute] << "can't be blank"
    elsif (value =~ /\A[\w\d!#.-]+@[\w\d.-]+\.[\w\d.]+\z/).nil?
      record.errors[attribute] << "is invalid"
    end
  end

end
