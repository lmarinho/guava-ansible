selector = '.hasnt-widow'   # selector for text blocks that can't have widow words
nWords = 2                  # number of words to group

removeWidows = (selector, nWords) ->
  elements = $(selector)
  $.each elements, (i, element) ->
    words = element.innerText.split(" ")
    lastWords = words.splice(-nWords, nWords)
    finalText = words.join(" ") + " " + lastWords.join("&nbsp;")
    $(element).html finalText
    return
  return

$(window).ready ->
  removeWidows selector, nWords
