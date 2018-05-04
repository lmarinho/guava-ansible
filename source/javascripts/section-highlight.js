$(function() {
  var menuSelector = '.menu';
  var anchorSelector = '.is-menu-sublink';
  var didScroll = false;
  var validIds = getSectionsAnchors();
  var sectionsDimensions = getSectionsDimensions(validIds);
  var activeClass = 'is-active';
  var sectionOffset = 350;

  $(window).on('scroll.sectionHighlight', function() {
      return didScroll = true;
    });

  setInterval((function() {
      if (!didScroll) return;
      didScroll = false;
      getSectionsDimensions(validIds);
      return updateActiveSection();
    }), 100);

  function getSectionsAnchors() {
    var $menu = $(menuSelector);
    var menuAnchors = $menu.find(anchorSelector);

    return extractValidIds(menuAnchors);
  }

  function extractValidIds(anchors) {
    var ids = [];
    for (var i = 0, current, id; i < anchors.length; i++) {
      current = anchors[i];
      id = current.href.split('/').pop();
      if ($(id).length) ids.push(id);
    }

    return ids;
  }

  function getSectionsDimensions(ids) {
    var sectionsDimensions = {};
    for (var i = 0, $section, id, limit; i < ids.length; i++) {
      id = ids[i];
      $section = $(id);
      limits = {
        begin: $section.offset().top,
        end: $section.offset().top + $section.outerHeight(),
      }
      sectionsDimensions[id] = limits;
    }

    return sectionsDimensions;
  }

  function clearAllActiveSublinks() {
    var sublinks = $('.menu .is-menu-sublink.is-active');
    for (var i = 0; i < sublinks.length; i++) {
      $(sublinks[i]).removeClass(activeClass);
    }
  }

  function toggleActiveSublink(id) {
    clearAllActiveSublinks();
    var sublinks = $('.menu .is-menu-sublink[href$="'+ id + '"]');
    for (var i = 0, current; i < sublinks.length; i++) {
      $(sublinks[i]).addClass(activeClass);
    }
  }

  function updateActiveSection() {
    var yPosition = window.pageYOffset + sectionOffset;
    var has_active = false;
    $.each(sectionsDimensions, function(sectionId, limits) {
      if (yPosition >= limits.begin && yPosition <= limits.end) {
        toggleActiveSublink(sectionId);
        has_active = true;
        return;
      }
    });
    if (!has_active) clearAllActiveSublinks();
  }
});
