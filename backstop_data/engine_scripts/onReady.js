module.exports = function (engine, scenario, vp) {
  if (vp.label === 'desktop') {
    engine.evaluate(function () {
      document.querySelector('.section.hero').style.height = 'auto';
    });
  }
};
