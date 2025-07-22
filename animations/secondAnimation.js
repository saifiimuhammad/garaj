const secondPhoneImages = [
  "./assets/images/mobile.svg",
  "./assets/images/mobile.svg",
  "./assets/images/mobile.svg",
  "./assets/images/mobile.svg",
];

let secondAnimationStarted = false;
let secondLoopRunning = false;
let secondStopLoop = false;
let secondIndex = 0;
let secondLoopTimeout = null;
let secondIntroTimeline = null;

const ORDER = [
  "secondBoxLeftTop",
  "secondBoxLeftBottom",
  "secondBoxRightTop",
  "secondBoxRightBottom",
];

const qs = (id) => document.getElementById(id);

/* ---------- Reset ---------- */
function resetSecondAnimation() {
  const path = qs("second-connector-path");
  const boxes = document.querySelectorAll(".second-boxes");
  const phoneImg = qs("secondPhoneImg");
  const phoneRect = qs("secondPhoneBorderRect");

  if (secondIntroTimeline) {
    secondIntroTimeline.kill();
    secondIntroTimeline = null;
  }
  if (secondLoopTimeout) clearTimeout(secondLoopTimeout);

  secondLoopTimeout = null;
  secondIndex = 0;
  secondLoopRunning = false;
  secondStopLoop = false;

  if (path) {
    gsap.killTweensOf(path);
    gsap.set(path, { opacity: 0, strokeDasharray: 0, strokeDashoffset: 0 });
    path.setAttribute("d", "");
  }

  boxes.forEach((b) => {
    const d = b.querySelector(".icon-default");
    const c = b.querySelector(".icon-colored");
    gsap.set(b, { scale: 1, boxShadow: "none", backgroundColor: "#f6f9fd" });
    if (d) gsap.set(d, { opacity: 1 });
  });

  if (phoneImg) {
    gsap.killTweensOf(phoneImg);
    gsap.set(phoneImg, {
      opacity: 0,
      scale: 0.95, // smoother from 95%
      y: 0,
      transformOrigin: "center center", // make this consistent
    });
  }
  if (phoneRect) {
    const len = phoneRect.getTotalLength();
    gsap.killTweensOf(phoneRect);
    gsap.set(phoneRect, {
      opacity: 1,
      strokeDasharray: len,
      strokeDashoffset: len,
      visibility: "visible",
    });
  }
}

/* ---------- Box highlight ---------- */
function highlightBox(box, on = true) {
  if (!box) return;
  const d = box.querySelector(".icon-default");
  const c = box.querySelector(".icon-colored");
  if (on) {
    gsap.to(d, { opacity: 0, duration: 0.25 });
    gsap.to(c, { opacity: 1, scale: 1.05, duration: 0.4, ease: "power2.out" });
    gsap.to(box, {
      scale: 1.05,
      boxShadow: "0 4px 14px rgba(0,0,0,0.12)",
      backgroundColor: "#fff",
      duration: 0.35,
    });
  } else {
    gsap.to(c, { opacity: 0, scale: 0.9, duration: 0.3 });
    gsap.to(d, { opacity: 1, duration: 0.3 });
    gsap.to(box, {
      scale: 1,
      boxShadow: "none",
      backgroundColor: "#f6f9fd",
      duration: 0.35,
    });
  }
}

/* ---------- Path geometry (offset based => ignores CSS scale) ---------- */
function buildLPathForBox(boxEl) {
  const root = qs("secondMain");
  const borderRectEl = qs("secondPhoneBorderRect");
  if (!boxEl || !root || !borderRectEl) return "";

  const rootRect = root.getBoundingClientRect();
  const borderSvgRect = borderRectEl.getBoundingClientRect();
  const boxRect = boxEl.getBoundingClientRect();

  const isLeft = boxEl.id.includes("Left");
  const isTop = boxEl.id.includes("Top");

  const sibTopRect = (
    isLeft ? qs("secondBoxLeftTop") : qs("secondBoxRightTop")
  ).getBoundingClientRect();
  const sibBottomRect = (
    isLeft ? qs("secondBoxLeftBottom") : qs("secondBoxRightBottom")
  ).getBoundingClientRect();

  const topAnchorY = sibTopRect.bottom - rootRect.top;
  const bottomAnchorY = sibBottomRect.top - rootRect.top;
  const busY = (topAnchorY + bottomAnchorY) / 2;

  const startX = boxRect.left + boxRect.width / 2 - rootRect.left;
  const startY = isTop
    ? boxRect.bottom - rootRect.top
    : boxRect.top - rootRect.top;

  const BORDER_STROKE = 4;
  const OVERLAP = 2; // existing slight overlap
  const H_INSET = 10; // <— extra horizontal penetration inside phone

  // Base edge (just touching stroke)
  let phoneEdgeX = isLeft
    ? borderSvgRect.left - rootRect.left + BORDER_STROKE / 2 - OVERLAP
    : borderSvgRect.right - rootRect.left - BORDER_STROKE / 2 + OVERLAP;

  // Push further *inside* phone by H_INSET
  phoneEdgeX += isLeft ? H_INSET : -H_INSET;

  // return `M ${startX} ${startY} L ${startX} ${busY} L ${phoneEdgeX} ${busY}`;
  const radius = 12; // Adjust roundness here

  const verticalEndY = busY - (startY < busY ? radius : -radius);
  const horizontalStartX = startX + (phoneEdgeX < startX ? -radius : radius);

  const d = `
  M ${startX} ${startY}
  L ${startX} ${verticalEndY}
  Q ${startX} ${busY} ${horizontalStartX} ${busY}
  L ${phoneEdgeX} ${busY}
`.trim();

  return d;
}

/* ---------- Intro (first line starts, then image & outline appear, outline hides) ---------- */
function runSecondIntro() {
  const firstBox = qs(ORDER[0]);
  const pathEl = qs("second-connector-path");
  const phoneRect = qs("secondPhoneBorderRect");
  const phoneImg = qs("secondPhoneImg");

  if (!firstBox || !pathEl || !phoneRect || !phoneImg) {
    // Fallback: go straight to loop
    startSecondLoop();
    return;
  }

  phoneImg.src = secondPhoneImages[0]; // <— Set image

  // Build first path
  const d = buildLPathForBox(firstBox);
  pathEl.setAttribute("d", d);
  const len = pathEl.getTotalLength();
  gsap.set(pathEl, { opacity: 1, strokeDasharray: len, strokeDashoffset: len });

  highlightBox(firstBox, true);

  const borderLen = phoneRect.getTotalLength();

  secondIntroTimeline = gsap.timeline({
    onComplete: () => {
      highlightBox(firstBox, false);
      // Hide the drawn path
      gsap.to(pathEl, { opacity: 0, duration: 0.3 });
      // Start loop from box 2
      secondIndex = 1;
      gsap.to(pathEl, {
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
          startSecondLoop();
        },
      });
      // startSecondLoop();
    },
  });

  secondIntroTimeline
    .to(pathEl, {
      strokeDashoffset: 0,
      duration: 1.2,
      ease: "power2.inOut",
    })
    .addLabel("revealPhone", 0.25)
    .fromTo(
      phoneImg,
      { opacity: 0, scale: 0.95 },
      {
        opacity: 1,
        scale: 1,
        duration: 1.2,
        delay: 1,
        ease: "power2.out",
      },
      "revealPhone"
    )
    .to(
      phoneRect,
      {
        strokeDashoffset: 0,
        duration: 1.5,
        ease: "power2.out",
      },
      "revealPhone+=0.05"
    )
    .to(
      phoneRect,
      {
        opacity: 0,
        duration: 0.5,
        ease: "power1.out",
        onComplete: () => {
          phoneRect.style.visibility = "hidden";
        },
      },
      ">-0.1"
    );
}

/* ---------- Loop (boxes 2..end..repeat) ---------- */
function animateOneLine() {
  if (secondStopLoop) return;
  const pathEl = qs("second-connector-path");
  const boxId = ORDER[secondIndex];
  const box = qs(boxId);
  if (!pathEl || !box) return;

  const d = buildLPathForBox(box);
  pathEl.setAttribute("d", d);

  const len = pathEl.getTotalLength();
  pathEl.style.strokeDasharray = len;
  pathEl.style.strokeDashoffset = len;

  gsap.set(pathEl, { opacity: 1 });

  const phoneImg = qs("secondPhoneImg");
  if (phoneImg) {
    phoneImg.src = secondPhoneImages[secondIndex];
  }

  highlightBox(box, true);

  gsap.to(pathEl, {
    strokeDashoffset: 0,
    duration: 1.4,
    ease: "power2.inOut",
    onComplete: () => {
      gsap.to(pathEl, {
        opacity: 0,
        duration: 0.35,
        delay: 0.25,
        onComplete: () => {
          highlightBox(box, false);
          secondIndex = (secondIndex + 1) % ORDER.length;
          secondLoopTimeout = setTimeout(animateOneLine, 500);
        },
      });
    },
  });
}

function startSecondLoop() {
  if (secondLoopRunning) return;
  secondLoopRunning = true;
  secondStopLoop = false;
  animateOneLine();
}

function stopSecondLoop() {
  secondStopLoop = true;
  secondLoopRunning = false;
  if (secondLoopTimeout) clearTimeout(secondLoopTimeout);
}

/* ---------- Public start (with intro) ---------- */
function startSecondAnimation() {
  resetSecondAnimation();
  runSecondIntro();
}

/* ---------- Intersection Trigger ---------- */
const secondContainerEl = document.querySelector(".second-animation-container");
const secondObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((e) => {
      if (e.isIntersecting && !secondAnimationStarted) {
        secondAnimationStarted = true;
        startSecondAnimation();
      } else if (!e.isIntersecting && secondAnimationStarted) {
        secondAnimationStarted = false;
        stopSecondLoop();
        resetSecondAnimation();
      }
    });
  },
  { threshold: 0.25 }
);

if (secondContainerEl) secondObserver.observe(secondContainerEl);

/* Optional external API */
window.startSecondAnimation = startSecondAnimation;
window.resetSecondAnimation = resetSecondAnimation;
