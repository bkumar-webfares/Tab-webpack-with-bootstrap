const css = require('./app.scss');
require('font-awesome/css/font-awesome.css');
import './bootstrap-tabcollapse.js';
$(document).ready(function () {
  $('[data-toggle="offcanvas"]').click(function () {
    $('.row-offcanvas').toggleClass('active')
  });  
});

$('#myTab').tabCollapse();