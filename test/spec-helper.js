
beforeAll(function() {

  // Created a fixture
  this.createFixture = function createFixture(markup) {
      const parent = document.createElement('div');
      parent.innerHTML = markup;
      return parent.firstChild;
  };

  // Creates a KeyboardEvent
  this.createKeyboardEvent = function createKeyboardEvent(keyCode) {
      const event = document.createEvent('Event');
      event.keyCode = keyCode;
      event.initEvent('keydown', true, true);
      return event;
  };

  // Creates a MouseEvent
  this.createMouseEvent = function createMouseEvent() {
      const event = document.createEvent('Event');
      event.initEvent('click', true, true);
      return event;
  };

});
