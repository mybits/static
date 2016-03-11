(function (root) {
  'use strict';
  var GOVUK = root.GOVUK || {};
  var $ = root.$;
  var $window = $(root);

  var self;
  var govukFixedAnchor = self = {
    _hasResized: true,
    _hasScrolled: true,
    _initialised: false,
    _interval: 50,
    _isDesktop: true,
    _windowVerticalPosition: 0,

    init: function () {
      var $els = $('.js-govuk-fixed-anchor');

      if ($els.length > 0) {
        self.$els = $els;

        var isUnintialised = !self._initialised;
        if (isUnintialised) {
          self.initialise();
        }
        self.checkResize();
        self.checkScroll();
      }
    },

    initialise: function () {
      $window.resize(self.onResize);
      $window.scroll(self.onScroll);
      setInterval(self.checkResize, self._interval);
      setInterval(self.checkScroll, self._interval);
      self._initialised = true;
    },

    onResize: function () {
      self._hasResized = true;
    },

    onScroll: function () {
      self._hasScrolled = true;
    },

    checkResize: function () {
      if (self._hasResized) {
        self._hasResized = false;

        self._isDesktop = $window.width() > 768;

        var isMobile = !self._isDesktop;
        if (isMobile) {
          self.unstickAll();
        }
      }
    },

    checkScroll: function () {
      if (self._hasScrolled) {
        self._hasScrolled = false;

        self._windowVerticalPosition = $window.scrollTop();

        self.$els.each(self.setPosition);
      }
    },

    setPosition: function (_, el) {
      var $el = $(el);
      var $parent = $el.parent();

      // TODO: Cache these values, since they only change onResize.
      var start = $parent.offset().top;
      var stop = $parent.offset().top + $parent.height() - $window.height();

      var isMobile = !self._isDesktop;
      var isPastStart = start < self._windowVerticalPosition;
      if (isMobile || isPastStart) {
        self.show($el);
      } else {
        self.hide($el);
      }

      var isPastEnd = stop < self._windowVerticalPosition;
      if (isMobile || isPastEnd) {
        self.unstick($el);
      } else {
        self.stick($el);
      }
    },

    stick: function ($el) {
      $el.addClass('govuk-fixed-anchor--stuck');
      $el.removeClass('govuk-fixed-anchor--unstuck');
    },

    unstickAll: function () {
      self.$els.each(function (_, el) { self.unstick($(el)); });
    },

    unstick: function ($el) {
      $el.addClass('govuk-fixed-anchor--unstuck');
      $el.removeClass('govuk-fixed-anchor--stuck');
    },

    show: function ($el) {
      $el.addClass('govuk-fixed-anchor--visible');
      $el.removeClass('govuk-fixed-anchor--hidden');
    },

    hide: function ($el) {
      $el.addClass('govuk-fixed-anchor--hidden');
      $el.removeClass('govuk-fixed-anchor--visible');
    }
  };

  GOVUK.govukFixedAnchor = govukFixedAnchor;

  $(function () {
    GOVUK.govukFixedAnchor.init();
  });
})(window);
