module.exports = function (chromy, scenario, vp) {
  require('./clickAndHoverHelper')(chromy, scenario);

  if (vp.label === 'desktop') {
    chromy.evaluate(function () {
      document.querySelector('.section.hero').style.height = 'auto';
    });
  }
};
