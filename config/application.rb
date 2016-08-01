require File.expand_path('../boot', __FILE__)

require 'rails/all'

Bundler.require(*Rails.groups)

module MonsterVr
  class Application < Rails::Application
    config.time_zone = 'Pacific Time (US & Canada)'
    config.active_record.raise_in_transactional_callbacks = true

    Dir["#{config.root}/app/**/"].each do |path|
      config.autoload_paths += [path]
    end
  end
end
