  var current = 0;
  var time = 3000;
  function setCurrent(num) {
      if (num >= count || num < 0) return false;
      var left = num * 836;
      $(ul).animate(
          {marginLeft: -left},
          {
              queue: false,
              duration: 350
          }
      );
      current = num;
  }
  comma = function (str) {
      return str.replace(/\.[0-9]+$/, '').replace(/(\d)(?=(\d{3})+$)/g, '$1,');
  };
  initLog = function () {
      var $log, log_per_second, logs, redraw, timestamp;
      $log = $('.log__count');
      logs = parseInt($log.attr('data-logs'), 10);
      log_per_second = parseInt($log.attr('data-log-per-second'), 10);
      timestamp = new Date().valueOf();
      redraw = function () {
          var timestamp_diff, val;
          timestamp_diff = parseInt(new Date().valueOf() - timestamp, 10);
          val = logs + parseInt(log_per_second * timestamp_diff / 1000, 10);
          return $log.text(comma(String(val)));
      };
      return setInterval(redraw, 50);
  };
  initLog();