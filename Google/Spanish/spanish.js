  let bug = 0;

  function allFlags() {
      var flag = document.getElementById("flag");
      flag.style.display = "none";

      var nav = document.getElementById("navigation");

      nav.style.marginRight = "34px";

      //WTF IS DIESER BUG
      if (bug < 1) {
          var currentHeight = parseFloat(nav.style.height) || 0;
          nav.style.height = (currentHeight + 19.98) + "px";
      }
      bug++;

      var germany = document.getElementById('germany');

      germany.style.display = "flex";
      germany.style.position = "absolute";
      germany.style.top = "48px";
      germany.style.right = "8px";

      var england = document.getElementById('england');

      england.style.display = "flex";
      england.style.position = "absolute";
      england.style.top = "73px";
      england.style.right = "8px";

      var spain = document.getElementById('spain');

      spain.style.display = "flex";
      spain.style.position = "absolute";
      spain.style.top = "23px";
      spain.style.right = "8px";
  }

  function flagsBeGone(x, y) {
      var flag = document.getElementById("flag");
      var germany = document.getElementById('germany');
      var england = document.getElementById('england');
      var spain = document.getElementById('spain');
      var marginYea = document.getElementById("marginYea");
      var nav = document.getElementById("navigation");

      if (x < window.innerWidth - 60 || y > 120) {
          flag.style.display = "";
          germany.style.display = "none";
          england.style.display = "none";
          spain.style.display = "none";
          nav.style.marginRight = "0px";

      } else {
          allFlags();
          marginYea.style.marginRight = "0px";
          nav.style.marginRight = "34px";

      }
  }

  document.addEventListener('mousemove', function(event) {
      flagsBeGone(event.clientX, event.clientY);
  });