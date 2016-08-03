jQuery(document).ready(function($) {
  // Function variables.
  var elementInViewport;
  var translateTimeline;
  var getTranslateValue;
  var updateTimelinePosition;
  var updateOlderEvents;
  var updateVisibleContent;
  var updateFilling;
  var showNewContent;
  var setTransformValue;
  var updateSlide;
  var setTimelineWidth;
  var setDatePosition;
  var dayDiff;
  var minLapse;
  var parseDate;
  var initialize;

  // jQuery variables.
  var timelines = $('.timeline');

  // Regular variables.
  var minDistance = 60;
  var maxDistance = 120;


  /*
    How to tell if a DOM element is visible in the current viewport?
    http://stackoverflow.com/questions/123999/how-to-tell-if-a-dom-element-is-visible-in-the-current-viewport
  */
  elementInViewport = function elementInViewport(element) {
    var top     = element.offsetTop;
    var left    = element.offsetLeft;
    var width   = element.offsetWidth;
    var height  = element.offsetHeight;

    while (element.offsetParent) {
      element = element.offsetParent;
      top    += element.offsetTop;
      left   += element.offsetLeft;
    };

    return top < (window.pageYOffset + window.innerHeight) &&
           left < (window.pageXOffset + window.innerWidth) &&
           (top + height) > window.pageYOffset &&
           (left + width) > window.pageXOffset;
  };

  translateTimeline = function translateTimeline(components, value, totalWidth) {
    var eventsCont = components.eventsList.get(0);

    // Only negative translate value.
    value = value > 0 ? 0 : value;
    // Do not translate more than timeline width.
    value = (!(typeof totalWidth === 'undefined') &&  value < totalWidth) ? totalWidth : value;

    setTransformValue(eventsCont, 'translateX', value + 'px');

    // Update navigation arrows visibility.
    if (!value) {
      components.navigation.find('.prev').addClass('inactive');
    } else {
      components.navigation.find('.prev').removeClass('inactive');
    };

    if (value == totalWidth) {
      components.navigation.find('.next').addClass('inactive');
    } else {
      components.navigation.find('.next').removeClass('inactive');
    };
  };

  getTranslateValue = function getTranslateValue(timeline) {
    var timelineStyle     = window.getComputedStyle(timeline.get(0), null);
    var timelineTranslate = timelineStyle.getPropertyValue('-webkit-transform') ||
                            timelineStyle.getPropertyValue('-moz-transform') ||
                            timelineStyle.getPropertyValue('-ms-transform') ||
                            timelineStyle.getPropertyValue('-o-transform') ||
                            timelineStyle.getPropertyValue('transform');
    var translateValue;

    if(timelineTranslate.indexOf('(') >= 0) {
      timelineTranslate = timelineTranslate.split('(')[1];
      timelineTranslate = timelineTranslate.split(')')[0];
      timelineTranslate = timelineTranslate.split(',');
      translateValue    = timelineTranslate[4];
    } else {
      translateValue = 0;
    };

    return Number(translateValue);
  };

  updateTimelinePosition = function updateTimelinePosition(string, event, components) {
    // Translate timeline to the left/right according to the position of the selected event.
    var eventStyle        = window.getComputedStyle(event.get(0), null);
    var eventLeft         = Number(eventStyle.getPropertyValue("left").replace('px', ''));
    var timelineWidth     = Number(components.eventsContainer.css('width').replace('px', ''));
    var timelineTotWidth  = Number(components.eventsList.css('width').replace('px', ''));
    var timelineTranslate = getTranslateValue(components.eventsList);

    if((string === 'next' && eventLeft > (timelineWidth - timelineTranslate)) ||
       (string === 'prev' && eventLeft < (- timelineTranslate))) {

      translateTimeline(
        components,
        (- eventLeft) + timelineWidth / 2,
        timelineWidth - timelineTotWidth
      );
    };
  };

  updateOlderEvents = function updateOlderEvents(event) {
    event.parent('li')
      .prevAll('li')
      .children('a')
      .addClass('older-event')
      .end()
      .end()
      .nextAll('li')
      .children('a')
      .removeClass('older-event');
  };

  updateVisibleContent = function updateVisibleContent(event, eventsContent) {
    var eventDate             = event.data('date');
    var visibleContent        = eventsContent.find('.selected');
    var selectedContent       = eventsContent.find("[data-date='" + eventDate + "']");
    var selectedContentHeight = selectedContent.height();
    var classEnetering;
    var classLeaving;

    if (selectedContent.index() > visibleContent.index()) {
      classEnetering  = 'selected enter-right';
      classLeaving    = 'leave-left';
    } else {
      classEnetering  = 'selected enter-left';
      classLeaving    = 'leave-right';
    };

    selectedContent.attr('class', classEnetering);

    visibleContent.attr('class', classLeaving).one('webkitAnimationEnd oanimationend msAnimationEnd animationend', function() {
      visibleContent.removeClass('leave-right leave-left');
      selectedContent.removeClass('enter-left enter-right');
    });

    eventsContent.css('height', selectedContentHeight + 'px');
  };

  updateFilling = function updateFilling(selectedEvent, filling, totalWidth) {
    // Change .filling-line length according to the selected event.
    var eventStyle    = window.getComputedStyle(selectedEvent.get(0), null);
    var eventLeft     = eventStyle.getPropertyValue('left');
    var eventWidth    = eventStyle.getPropertyValue('width');
    var eventLeftCalc = Number(eventLeft.replace('px', '')) + Number(eventWidth.replace('px', '')) / 2;
    var scaleValue    = eventLeftCalc / totalWidth;

    setTransformValue(filling.get(0), 'scaleX', scaleValue);
  };

  showNewContent = function showNewContent(components, timelineTotWidth, string) {
    // Go from one event to the next/previous one.
    var visibleContent  = components.content.find('.selected');
    var newContent      = string === 'next' ? visibleContent.next() : visibleContent.prev();

    // If there's a next/prev event - show it.
    if (newContent.length) {
      var selectedDate  = components.eventsList.find('.selected');
      var newEvent;

      if (string === 'next') {
        selectedDate.parent('li').next('li').children('a');
      } else {
        selectedDate.parent('li').prev('li').children('a');
      };

      updateFilling(newEvent, components.fillingLine, timelineTotWidth);
      updateVisibleContent(newEvent, components.content);

      newEvent.addClass('selected');
      selectedDate.removeClass('selected');

      updateOlderEvents(newEvent);
      updateTimelinePosition(string, newEvent, components);
    }
  };

  checkMQ = function checkMQ() {
    // Check if mobile or desktop device.
    return window.getComputedStyle(
      document.querySelector('.timeline'),
      ':before'
    ).getPropertyValue('content').replace(/('|")/g, '');
  };

  setTransformValue = function setTransformValue(element, property, value) {
    element.style['-webkit-transform']  = property + '(' + value + ')';
    element.style['-moz-transform']     = property + '(' + value + ')';
    element.style['-ms-transform']      = property + '(' + value + ')';
    element.style['-o-transform']       = property + '(' + value + ')';
    element.style['transform']          = property + '(' + value + ')';
  };

  updateSlide = function updateSlide(components, timelineTotalWidth, string) {
    // Retrieve translateX value of components.eventsList.
    var translateValue  = getTranslateValue(components.eventsList);
    var wrapperWidth    = Number(components.eventsContainer.css('width').replace('px', ''));

    // Translate the timeline to the left('next')/right('prev') .
    if (string === 'next') {
      translateTimeline(
        components,
        translateValue - wrapperWidth,
        wrapperWidth - timelineTotalWidth
      );
    } else {
      translateTimeline(components, translateValue + wrapperWidth);
    };
  };

  setTimelineWidth = function setTimelineWidth(components) {
    var events      = components.events;
    var width       = events.eq(events.length - 1).css('left').replace('px', '');
    var totalWidth  = parseInt(width) + (minDistance * 2);

    components.eventsList.css('width', totalWidth + 'px');
    updateFilling(components.eventsList.find('a.selected'), components.fillingLine, totalWidth);
    updateTimelinePosition('next', components.eventsList.find('a.selected'), components);

    return totalWidth;
  };

  setDatePosition = function setDatePosition(components) {
    var previous = 2;
    var distance;
    var distanceNorm;
    var distanceCalc;

    for (i = 0; i < components.dates.length; i++) {
      distance      = i ? dayDiff(components.dates[i - 1], components.dates[i]) : 0;
      distanceNorm  = Math.round(distance / components.minLapse);
      distanceCalc  = Math.min(Math.max(distanceNorm, minDistance), maxDistance) + previous;
      previous      = distanceCalc;

      components.events.eq(i).css('left', distanceCalc + 'px');
    };
  };

  dayDiff = function dayDiff(first, second) {
    return Math.round(second - first);
  };

  minLapse = function minLapse(dates) {
    // Determine the minimum distance among events.
    var dateDistances = [];

    for (i = 1; i < dates.length; i++) {
      var distance = dayDiff(dates[i - 1], dates[i]);

      dateDistances.push(distance);
    };

    return Math.min.apply(null, dateDistances);
  };

  // Based on http://stackoverflow.com/questions/542938/how-do-i-get-the-number-of-days-between-two-dates-in-javascript.
  parseDate = function parseDate(events) {
    var dateArrays = [];

    events.each(function() {
      var singleDate  = $(this);
      var dateComp    = singleDate.data('date').split('T');
      var dayComp;
      var timeComp;
      var newDate;

      // Both DD/MM/YEAR and time are provided.
      if (dateComp.length > 1) {
        dayComp   = dateComp[0].split('/');
        timeComp  = dateComp[1].split(':');

      // Only time is provide.
      } else if (dateComp[0].indexOf(':') >= 0) {
        dayComp   = ['2000', '0', '0'];
        timeComp  = dateComp[0].split(':');

      // Only DD/MM/YEAR.
      } else {
        dayComp   = dateComp[0].split('/');
        timeComp  = ['0', '0'];
      };

      newDate = new Date(
        dayComp[2],
        dayComp[1] - 1,
        dayComp[0],
        timeComp[0],
        timeComp[1]
      );

      dateArrays.push(newDate);
    });

    return dateArrays;
  };

  initialize = function initialize(timelines) {
    timelines.each(function(){
      var timeline    = $(this);
      var components  = {};
      var timelineTotalWidth;

      // Cache timeline components.
      components.eventsContainer  = timeline.find('.events__container');
      components.eventsList       = components.eventsContainer.children('.events__list');
      components.fillingLine      = components.eventsList.children('.filling-line');
      components.events           = components.eventsList.find('a');
      components.dates            = parseDate(components.events);
      components.minLapse         = minLapse(components.dates);
      components.navigation       = timeline.find('.events__navigation');
      components.content          = timeline.find('.events__content');

      // Detect click on the next arrow.
      components.navigation.on('click', '.next', function(event) {
        event.preventDefault();

        updateSlide(components, timelineTotalWidth, 'next');
      });

      // Detect click on the prev arrow.
      components.navigation.on('click', '.prev', function(event) {
        event.preventDefault();

        updateSlide(components, timelineTotalWidth, 'prev');
      });

      // Detect click on the a single event - show new event content.
      components.eventsList.on('click', 'a', function(event) {
        event.preventDefault();

        var $this = $(this);

        components.events.removeClass('selected');
        $this.addClass('selected');

        updateOlderEvents($this);
        updateFilling($this, components.fillingLine, timelineTotalWidth);
        updateVisibleContent($this, components.content);
      });

      // On swipe, show next/prev event content.
      components.content.on('swipeleft', function() {
        var mq = checkMQ();

        mq === 'mobile' && showNewContent(components, timelineTotalWidth, 'next');
      });

      components.content.on('swiperight', function() {
        var mq = checkMQ();

        mq === 'mobile' && showNewContent(components, timelineTotalWidth, 'prev');
      });

      // Keyboard navigation.
      $(document).keyup(function(event) {
        if (event.which == '37' && elementInViewport(timeline.get(0))) {
          showNewContent(components, timelineTotalWidth, 'prev');
        } else if (event.which == '39' && elementInViewport(timeline.get(0))) {
          showNewContent(components, timelineTotalWidth, 'next');
        };
      });

      // Assign a left postion to the single events along the timeline.
      setDatePosition(components);
      // Assign a width to the timeline.
      timelineTotalWidth = setTimelineWidth(components);
      // The timeline has been initialize - show it.
      timeline.addClass('loaded');
    });
  };

  if (timelines.length) initialize(timelines);
});
