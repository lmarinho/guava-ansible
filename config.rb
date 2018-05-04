require 'source/lib/image_helpers'
require 'source/lib/path_helpers'

###
# Page options, layouts, aliases and proxies
###

# Per-page layout changes:
#
# With no layout
page '/*.xml', layout: false
page '/*.json', layout: false
page '/*.txt', layout: false

# Pretty URLs
activate :directory_indexes

# Localization (i18n)
activate :i18n, :mount_at_root => :en, :langs => [:en, :pt]

# Sprockets
activate :sprockets

if defined? RailsAssets
  RailsAssets.load_paths.each do |path|
    sprockets.append_path path
  end
end

# With alternative layout
# page "/path/to/file.html", layout: :otherlayout

# Proxy pages (http://middlemanapp.com/basics/dynamic-pages/)
# proxy "/this-page-has-no-template.html", "/template-file.html", locals: {
#  which_fake_page: "Rendering a fake page with a local variable" }

# General configuration

###
# Helpers
###

helpers ImageHelpers
helpers PathHelpers

# Methods defined in the helpers block are available in templates
# helpers do
#   def some_helper
#     "Helping"
#   end
# end

# Build-specific configuration
configure :build do
  # Minify CSS on build
  # activate :minify_css

  # Minify Javascript on build
  # activate :minify_javascript

  sentinel_font_dir = '/fonts/595055'
  ignore "#{sentinel_font_dir}/*"
  after_build do
    system("mkdir #{config[:build_dir]}#{sentinel_font_dir}")
    system("cp ./source#{sentinel_font_dir}/* #{config[:build_dir]}#{sentinel_font_dir}")
  end
end

activate :s3_sync do |s3_sync|
  s3_sync.bucket                     = 'guava.com.br'
  s3_sync.region                     = 'us-east-1'
  s3_sync.delete                     = true
  s3_sync.after_build                = false
  s3_sync.prefer_gzip                = true
  s3_sync.path_style                 = true
  s3_sync.reduced_redundancy_storage = false
  s3_sync.acl                        = 'public-read'
  s3_sync.encryption                 = false
end

activate :autoprefixer
