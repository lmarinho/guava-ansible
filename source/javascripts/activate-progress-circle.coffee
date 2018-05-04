$ ->
  $target = $("a[href='#{location.hash}']")
  return unless $target.length

  setTimeout(->
    $target.addClass('active')
  , 500)
