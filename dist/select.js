/*!
 * @autofe/select v0.1.3
 * (c) 2018 Autohome Inc.
 * Released under the MIT License.
 */
(function (global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory(require('jquery')) :
	typeof define === 'function' && define.amd ? define(['jquery'], factory) :
	(global.AutoFE = global.AutoFE || {}, global.AutoFE.Select = factory(global.jQuery));
}(this, (function ($) { 'use strict';

$ = $ && $.hasOwnProperty('default') ? $['default'] : $;

/**
 * ------------------------------------------------------------------------
 * Constants
 * ------------------------------------------------------------------------
 */

var NAME = 'select';
var DATA_KEY = 'fe.select';
var EVENT_KEY = '.' + DATA_KEY;
var DATA_API_KEY = '.data-api';
var JQUERY_NO_CONFLICT = $.fn[NAME];
// const ESCAPE_KEYCODE = 27;

var Event = {
  INIT: 'init' + EVENT_KEY,
  SHOW: 'show' + EVENT_KEY,
  SHOWN: 'shown' + EVENT_KEY,
  HIDE: 'hide' + EVENT_KEY,
  HIDDEN: 'hidden' + EVENT_KEY,
  CHANGE: 'change' + EVENT_KEY,
  CLICK: 'click' + EVENT_KEY,
  CLICK_DISMISS: 'click.dismiss' + EVENT_KEY,
  CLICK_DATA_API: 'click' + EVENT_KEY + DATA_API_KEY
};

var Selector = {
  DATA_TOGGLE: '[data-toggle="select"]',
  DATA_VALUE: '[data-value]'
};

var Attr = {
  DATA_TEXT: 'data-text',
  DATA_VALUE: 'data-value'
};

/**
 * ------------------------------------------------------------------------
 * Class Definition
 * ------------------------------------------------------------------------
 */

function Select(elem, options) {
  this.options = $.extend({}, Select.Default, options);
  this.$elem = $(elem);
  this.$picker = $(this.options.selectPicker, this.$elem);
  this.$value = $(this.options.selectValue, this.$elem);
  this.$dropdown = $(this.options.selectDropdown, this.$elem);

  this.isActive = false;

  this._data = null;

  this._init();
}

Select.Default = {
  selectPicker: '[data-select-picker]',
  selectValue: '[data-select-value]',
  selectDropdown: '[data-select-dropdown]',
  selectedClass: 'selected',
  disabledClass: 'disabled',
  activeClass: 'active'
};

Select.prototype._init = function () {
  var that = this;

  that.$elem.trigger(Event.INIT, that);

  that.$picker.on(Event.CLICK, $.proxy(that.toggle, that));

  that.$dropdown.on(Event.CLICK, Selector.DATA_VALUE, function () {
    var $item = $(this);

    that.setValue({
      text: $item.attr(Attr.DATA_TEXT),
      value: $item.attr(Attr.DATA_VALUE)
    });

    that.hide();

    return false;
  });

  $(document).on(Event.CLICK_DISMISS, function (e) {
    var $parent = $(e.target).closest(that.$elem);
    if ($parent.length === 0 && that.isActive) {
      that.hide();
    }
  });
};

Select.prototype.setValue = function (data) {
  var selectedClass = this.options.selectedClass;
  var old = this.getValue() || {};

  if (old.value !== data.value) {
    var $list = this.$dropdown.find(Selector.DATA_VALUE);
    var $item = this.$dropdown.find('[data-value="' + String(data.value) + '"]');

    $list.removeClass(selectedClass);
    $item.addClass(selectedClass);

    this.$value.text(data.text);

    this._data = {
      text: data.text,
      value: data.value
    };

    this.$elem.trigger(Event.CHANGE, [data, $item]);
  }
};

Select.prototype.getValue = function () {
  return this._data;
};

Select.prototype.toggle = function () {
  if (this.isActive) {
    this.hide();
  } else {
    this.show();
  }
};

Select.prototype.show = function () {
  var activeClass = this.options.activeClass;
  var disabledClass = this.options.disabledClass;

  if (this.$elem.hasClass(disabledClass)) {
    return;
  }

  var showEvent = $.Event(Event.SHOW);

  this.$elem.trigger(showEvent, this);

  if (showEvent.isDefaultPrevented()) {
    return;
  }

  this.isActive = true;
  this.$elem.addClass(activeClass);
  this.$dropdown.show();
  this.$elem.trigger(Event.SHOWN, this);
};

Select.prototype.hide = function () {
  var activeClass = this.options.activeClass;

  var hideEvent = $.Event(Event.HIDE);

  this.$elem.trigger(hideEvent, this);

  if (hideEvent.isDefaultPrevented()) {
    return;
  }

  this.isActive = false;
  this.$elem.removeClass(activeClass);
  this.$dropdown.hide();
  this.$elem.trigger(Event.HIDDEN, this);
};

Select.prototype.disable = function () {
  var disabledClass = this.options.disabledClass;

  this.$elem.addClass(disabledClass);
};

Select.prototype.enable = function () {
  var disabledClass = this.options.disabledClass;

  this.$elem.removeClass(disabledClass);
};

/**
 * ------------------------------------------------------------------------
 * Plugin Definition
 * ------------------------------------------------------------------------
 */

function Plugin(config) {
  return this.each(function () {
    var $this = $(this);
    var data = $this.data(DATA_KEY);
    var _config = $.extend({}, Select.Default, $this.data(), typeof config === 'object' && config);

    if (!data) {
      data = new Select(this, _config);
      $this.data(DATA_KEY, data);
    }

    if (typeof config === 'string') {
      if (typeof data[config] === 'undefined') {
        throw new TypeError('No method named "' + config + '"');
      }
      data[config]();
    }
  });
}

/**
 * ------------------------------------------------------------------------
 * Data Api implementation
 * ------------------------------------------------------------------------
 */

// TODO
// $(document).on(Event.CLICK_DATA_API, Selector.DATA_TOGGLE, function (e) {
//   e.preventDefault();
//   e.stopPropagation();
//   Plugin.call($(this), 'toggle');
// });

$(function () {
  Plugin.call($(Selector.DATA_TOGGLE));
});

/**
 * ------------------------------------------------------------------------
 * jQuery
 * ------------------------------------------------------------------------
 */

$.fn[NAME] = Plugin;
$.fn[NAME].Constructor = Select;
$.fn[NAME].noConflict = function () {
  $.fn[NAME] = JQUERY_NO_CONFLICT;
  return Plugin;
};

return Select;

})));
