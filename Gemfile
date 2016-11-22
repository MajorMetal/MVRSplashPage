source 'https://rubygems.org'


# ==============================
# Core
# ==============================
ruby '2.3.1'
gem 'rails', '~> 5.0', '>= 5.0.0.1'
gem 'pg', '~> 0.18.4'
gem 'puma', '~> 3.6'
# gem 'turbolinks', '~> 5.0', '>= 5.0.1'
# gem 'redis', '~> 3.3', '>= 3.3.1'


# ==============================
# Javascript
# ==============================
gem 'therubyracer', '~> 0.12.2', platforms: :ruby
gem 'uglifier', '~> 3.0', '>= 3.0.2'
gem 'jquery-rails', '~> 4.2', '>= 4.2.1'


# ==============================
# CSS
# ==============================
gem 'sass-rails', '~> 5.0', '>= 5.0.6'
gem 'font-awesome-rails', '~> 4.6', '>= 4.6.3.1'


# ==============================
# HTML
# ==============================
gem 'haml-rails', '~> 0.9.0'


# ==============================
# Utility
# ==============================
gem 'active_device', '~> 1.2'
gem 'figaro', '~> 1.1', '>= 1.1.1'
gem 'route_downcaser', '~> 1.2'


# ==============================
# Enviroment Specific
# ==============================
group :development do
  gem 'byebug', '~> 9.0', '>= 9.0.5'
  gem 'web-console', '~> 3.3', '>= 3.3.1'
  gem 'listen', '~> 3.1', '>= 3.1.5'
  gem 'spring', '~> 1.7', '>= 1.7.2'
  gem 'spring-watcher-listen', '~> 2.0'
end

group :test do
  gem 'rspec-rails', '~> 3.5', '>= 3.5.2'
  gem 'factory_girl_rails', '~> 4.7'
  gem 'simplecov', '~> 0.11.2', require: false
end

group :production do
  gem 'rails_12factor', '~> 0.0.3'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem 'tzinfo-data', platforms: [:mingw, :mswin, :x64_mingw, :jruby]
