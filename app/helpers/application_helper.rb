module ApplicationHelper

  # Public: Renders Google analytics script if production environment.
  #
  # Returns analytics script tag or nothing.
  def analytics_include_tag
    render "layouts/analytics" if Rails.env.production?
  end

end
