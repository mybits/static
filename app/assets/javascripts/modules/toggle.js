/* Change visibility of target elements by clicking toggles */
(function(Modules) {
  //
  "use strict";

  Modules.Toggle = function() {
    this.start = function($el) {
      var $targets = $el.find('.js-toggle-target');

      setup();
      $el.on('click', '.js-toggle', toggle);

      function setup() {
        var targetIds = [];

        $targets.each(function() {
          var $target = $(this),
              isVisible = !$target.is('.hidden');

          $target.attr('aria-expanded', isVisible);

          if (!$target.is('[id]')) {
            generateIdFor($target);
          }

          targetIds.push($target.attr('id'));
        });

        addAriaControlsToToggles(targetIds);
      }

      function toggle(event) {
        $targets.each(function() {
          var $target = $(this),
              isVisible = !$target.is('.hidden');

          if (isVisible) {
            $target.addClass('hidden');
            $target.attr('aria-expanded', false);
          } else {
            $target.removeClass('hidden');
            $target.attr('aria-expanded', true);
          }
        });

        event.preventDefault();
      }

      function addAriaControlsToToggles(ids) {
        $el.find('.js-toggle').each(function() {
          var $toggle = $(this);
          $toggle.attr('aria-controls', ids.join(' '));
          $toggle.attr('role', 'button');
        });
      }

      function generateIdFor($target) {
        $target.attr('id', "target-" + Math.random().toString(16).slice(2));
      }
    };
  };

})(window.GOVUK.Modules);
