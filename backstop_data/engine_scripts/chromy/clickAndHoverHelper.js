module.exports = function (chromy, scenario) {
  var hoverSelector = scenario.hoverSelector;
  var clickSelector = scenario.clickSelector;
  var postInteractionWait = scenario.postInteractionWait; // selector [str] | ms [int]

  if (hoverSelector) {
    if (!Array.isArray(hoverSelector)) {
      hoverSelector = [hoverSelector];
    }
    for (s of hoverSelector) {
      chromy
        .wait(s)
        .rect(s)
        .result(function (rect) {
          chromy.mouseMoved(rect.left, rect.top);
        });
      if (postInteractionWait) {
        chromy.wait(postInteractionWait);
      }
    }
  }

  if (clickSelector) {
    if (!Array.isArray(clickSelector)) {
      clickSelector = [clickSelector];
    }

    for (s of clickSelector) {
      chromy
        .wait(s)
        .click(s);
      if (postInteractionWait) {
        chromy.wait(postInteractionWait);
      }
    }
  } else if (postInteractionWait) {
    chromy.wait(postInteractionWait);
  }
};
