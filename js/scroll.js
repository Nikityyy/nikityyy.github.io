gsap.registerPlugin(ScrollTrigger);
let panels = gsap.utils.toArray(".scroll");
panels.forEach(t => {
    let e = t.offsetHeight < window.innerHeight ? "top top" : "bottom bottom";
    ScrollTrigger.create({
        trigger: t,
        start: e,
        pin: !0,
        pinSpacing: !1
    })
});