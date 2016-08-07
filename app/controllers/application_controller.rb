class ApplicationController < ActionController::Base
  # Internal: Includes necessary modules.
  include ActiveDevice
  # Internal: Rails controller security.
  protect_from_forgery with: :exception
  # Internal: Ignores ActiveDevice gem default formatting.
  skip_before_filter :set_mobile_format


  # Public: Checks if user deivce is a mobile device.
  #
  # Returns nothing.
  def check_for_mobile
    prepare_for_mobile # if is_mobile_device?
  end


  private

  # Internal: Prepares view for mobile devices.
  #
  # Returns nothing.
  def prepare_for_mobile
    prepend_view_path "#{Rails.root}/app/views_mobile"
  end

end
