$(function() {
  var add_marker, parse_assert;
  parse_assert = function(input) {
    return $.map(input.split(':'), function(i) {
      return [
        $.map(i.split(','),
        function(s) {
          return parseFloat(s);
        })
      ];
    });
  };
  add_marker = function(point) {
    var $marker;
    $marker = $('<div class="marker"></div>');
    $marker.css('top', point[1] - 5);
    $marker.css('left', point[0] - 5);
    $marker.attr('data-x', point[0]);
    $marker.attr('data-y', point[1]);
    return $('body').append($marker);
  };
  $('.referentiel').each(function() {
    var ref;
    ref = new Referentiel.default(this);
    return $('[data-assert]', this).each(function(assert) {
      var $assert, global, local, result;
      [global, local] = parse_assert($(this).data('assert'));
      result = ref.global_to_local(global);
      console.log(this, global, result, local);
      add_marker(global);
      $assert = $(this);
      $assert.css('left', result[0] - 3);
      $assert.css('top', result[1] - 3);
      $assert.attr('cx', result[0]);
      $assert.attr('cy', result[1]);
      $assert.data('x', result[0]);
      return $assert.data('y', result[1]);
    });
  });
  return $('body').on('click', function(e) {
    return $('.referentiel').each(function() {
      var $pointer, input, p, ref;
      ref = new Referentiel.default(this);
      input = [e.pageX, e.pageY];
      p = ref.global_to_local(input);
      if ($('.pointer', this).length === 0) {
        $pointer = $('<div class="pointer"></div>');
        $(this).append($pointer);
      }
      $pointer = $('.pointer', this);
      console.log('======');
      console.log(input, '->', p, new Referentiel.default(this).matrix(), this);
      $pointer.css('left', p[0] - 3);
      $pointer.css('top', p[1] - 3);
      $pointer.attr('cx', p[0]);
      return $pointer.attr('cy', p[1]);
    });
  });
});