$(window).on('beforeunload', function() {
  $('body').hide();
  $(window).scrollTop(0);
  document.body.style.overflow = "hidden";
});

// IMPORTANT!!!
// ffmpeg -i input.mp4 -vf scale=960:-1 -movflags faststart -vcodec libx264 -crf 20 -g 1 -pix_fmt yuv420p -r 60 output_960_60fps.mp4

const video = document.querySelector(".video-background");
let src = video.currentSrc || video.src;

function once(el, event, fn, opts) {
  var onceFn = function (e) {
    el.removeEventListener(event, onceFn);
    fn.apply(this, arguments);
  };
  el.addEventListener(event, onceFn, opts);
  return onceFn;
}

once(document.documentElement, "touchstart", function (e) {
  video.play();
  video.pause();
});

gsap.registerPlugin(ScrollTrigger);

let tl = gsap.timeline({
  defaults: { duration: 1, ease: "none" },
  scrollTrigger: {
    trigger: "#video",
    start: "top top",
    end: "bottom bottom",
    scrub: 0.1,
  },
});

function initializeVideo() {
  video.playbackRate = 0.1;

  tl.fromTo(
    video,
    {
      currentTime: 0,
    },
    {
      currentTime: video.duration || 1,
      ease: "linear",
      onUpdate: () => {
        if (video.buffered.length === 0) return;
        const bufferedEnd = video.buffered.end(video.buffered.length - 1);
        if (video.currentTime > bufferedEnd) {
          video.currentTime = bufferedEnd;
        }
      },
    }
  );
}

function loadVideo() {
  return fetch(src)
    .then((response) => response.blob())
    .then((blob) => {
      const blobURL = URL.createObjectURL(blob);
      video.src = blobURL;
      return new Promise((resolve) => {
        video.onloadedmetadata = () => {
          video.currentTime = 0;
          resolve();
        };
      });
    });
}

loadVideo().then(() => {
  initializeVideo();
  ScrollTrigger.refresh();
});

window.addEventListener(
  "scroll",
  () => {
    if (!video.buffered.length) return;
    const videoSection = document.getElementById("video");
    const videoRect = videoSection.getBoundingClientRect();
    const videoStart = videoRect.top;
    const videoEnd = videoRect.bottom;
    const windowHeight = window.innerHeight;

    if (videoStart <= 0 && videoEnd >= 0) {
      const scrollFraction =
        Math.abs(videoStart) / (videoRect.height - windowHeight);
      const targetTime = video.duration * scrollFraction;
      video.currentTime = Math.min(
        targetTime,
        video.buffered.end(video.buffered.length - 1)
      );
    }
  },
  { passive: true }
);

function smoothScroll(target, duration) {
  var targetElement = document.querySelector(target);
  var targetPosition = targetElement.getBoundingClientRect().top;
  var startPosition = window.pageYOffset;
  var distance = targetPosition - startPosition;
  var startTime = null;

  function animation(currentTime) {
    if (startTime === null) startTime = currentTime;
    var timeElapsed = currentTime - startTime;
    var run = ease(timeElapsed, startPosition, distance, duration);
    window.scrollTo(0, run);
    if (timeElapsed < duration) requestAnimationFrame(animation);
  }

  function ease(t, b, c, d) {
    t /= d / 2;
    if (t < 1) return c / 2 * t * t + b;
    t--;
    return -c / 2 * (t * (t - 2) - 1) + b;
  }

  requestAnimationFrame(animation);
}

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    smoothScroll(this.getAttribute('href'), 10000);
  });
});