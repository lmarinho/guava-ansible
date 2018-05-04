module ImageHelpers
  def inline_svg(file_name, options = {})
    asset = "source/images/#{file_name}.svg"
    return error_svg(file_name) unless File.exists?(asset)

    file = File.open(asset, 'r') { |f| f.read }
    doc = Nokogiri::HTML::DocumentFragment.parse(file)

    if options[:class].present?
      svg = doc.at_css('svg')
      svg['class'] = options[:class]
    end

    doc
  end

  private

  def error_svg(file_name)
    %(
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 30"
        width="400px" height="30px"
      >
        <text font-size="16" x="8" y="20" fill="#cc0000">
          Error: '#{file_name}' could not be found.
        </text>
        <rect
          x="1" y="1" width="398" height="28" fill="none"
          stroke-width="1" stroke="#cc0000"
        />
      </svg>
    )
  end
end
