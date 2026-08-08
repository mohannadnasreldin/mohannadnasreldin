const tween = {
  kill() {},
  scrollTrigger: { kill() {} },
};

const timeline = {
  kill() {},
  scrollTrigger: { kill() {} },
  fromTo() {
    return this;
  },
  to() {
    return this;
  },
  from() {
    return this;
  },
};

const gsap = {
  registerPlugin() {},
  ticker: {
    add() {},
    remove() {},
    lagSmoothing() {},
  },
  to() {
    return tween;
  },
  fromTo() {
    return tween;
  },
  from() {
    return tween;
  },
  timeline() {
    return timeline;
  },
};

module.exports = gsap;
module.exports.default = gsap;
module.exports.gsap = gsap;
