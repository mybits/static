describe('A toggle module', function() {
  "use strict";

  var toggle,
      element;

  beforeEach(function() {
    toggle = new GOVUK.Modules.Toggle();
  });

  describe('when starting', function() {
    var element = $('\
      <div>\
        <a href="#" class="js-toggle">Toggle</a>\
        <div id="target-with-id" class="with-id js-toggle-target">Target</div>\
        <div class="no-id js-toggle-target">No ID</div>\
        <div class="hidden js-toggle-target">Starts hidden</div>\
      </div>');

    it('adds ids to targets without an id', function() {
      expect(element.find('.no-id').is('[id]')).toBe(false);
      toggle.start(element);
      expect(element.find('.no-id').attr('id')).toMatch('target-');
      expect(element.find('.with-id').attr('id')).toBe('target-with-id');
    });

    it('adds aria-controls to toggles based on target ids', function() {
      toggle.start(element);

      var $toggle = element.find('.js-toggle'),
          ariaControls = $toggle.attr('aria-controls').split(' ');

      // eg <a href="#" aria-controls="target-with-id target-123456">Toggle</a>
      expect($toggle.is('[aria-controls]')).toBe(true);
      expect(ariaControls[0]).toBe('target-with-id');
      expect(ariaControls[1]).toMatch('target-');
    });

    it('adds a button role to toggles', function() {
      toggle.start(element);
      expect(element.find('.js-toggle').attr('role')).toBe('button');
    });

    it('adds aria-expanded to targets based on hidden state', function() {
      toggle.start(element);
      expect(element.find('.with-id').attr('aria-expanded')).toBe('true');
      expect(element.find('.hidden').attr('aria-expanded')).toBe('false');
    });

    describe('and the element has multiple toggles', function() {
      var element = $('\
        <div>\
          <a href="#" class="js-toggle">Toggle</a>\
          <a href="#" class="js-toggle">Toggle</a>\
          <div id="target-with-id" class="js-toggle-target">Target</div>\
        </div>');

      it('adds an aria-controls to each', function() {
        toggle.start(element);
        expect(element.find('[aria-controls]').length).toBe(2);
      });
    });
  });

  describe('when clicking a toggle', function() {
    var element = $('\
      <div>\
        <a href="#" class="js-toggle">Toggle</a>\
        <div class="starts-visible js-toggle-target">Target</div>\
        <div class="starts-hidden hidden js-toggle-target">Another target</div>\
      </div>');

    beforeEach(function() {
      toggle.start(element);
      element.find('.js-toggle').trigger('click');
    });

    it('toggles the display of all targets', function() {
      expect(element.find('.starts-visible').is('.hidden')).toBe(true);
      expect(element.find('.starts-hidden').is('.hidden')).toBe(false);
    });

    it('toggles the aria-expanded attribute of all targets', function() {
      expect(element.find('.starts-visible').attr('aria-expanded')).toBe('false');
      expect(element.find('.starts-hidden').attr('aria-expanded')).toBe('true');
    });
  });
});
