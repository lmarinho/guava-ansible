module PathHelpers
  def current_language
    path = current_page.path.split('.').first
    path_elements = path.split('/')
    path_elements.size > 1 ? path_elements.first : I18n.default_locale.to_s
  end

  def page_name
    path = current_page.path.split('.').first
    page_name = path.split('/').last.gsub('index', 'landing')
  end

  def lang_page_class
    if current_language == I18n.default_locale
      page_name
    else
      "#{current_language}-#{page_name}"
    end
  end

  def i18n_current_path(target_language)
    url = current_page.url

    if target_language == 'en'
      url.gsub! '/pt', ''
      url == '/' ? '../' : url
    else
      "/pt#{url}"
    end
  end
end
