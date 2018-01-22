const css = require('./app.scss');
require('font-awesome/css/font-awesome.css');
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });  
});

$('#myTab').tabCollapse();