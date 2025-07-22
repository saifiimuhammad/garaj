const thirdImages = [
  "./assets/images/3rd_animation_image.svg", // For box index 0
  "./assets/images/3rd_animation_image.svg", // For box index 1
  "./assets/images/3rd_animation_image.svg", // For box index 2
  "./assets/images/3rd_animation_image.svg", // For box index 3
];

// --- GLOBAL STATE ---
let thirdAnimationStarted = false;
let thirdIntroRunning = false;
let thirdLoopTimeout = null;
let thirdLoopRunning = false;
let thirdStopLoop = false;
let thirdIndex = 0;
let thirdIntroTimeline = null;

// --- RESET FUNCTION ---
// --- RESET FUNCTION ---
function resetThirdAnimation() {
  const boxes = document.querySelectorAll(".third-boxes");
  const mainPath = document.querySelector(".third-svg-main rect");
  const image = document.querySelector(".third-anim-img");
  const connectorPath = document.getElementById("third-connector-path");

  // --- Kill all GSAP tweens/timelines ---
  if (thirdIntroTimeline) {
    thirdIntroTimeline.kill();
    thirdIntroTimeline = null;
  }
  if (connectorPath) gsap.killTweensOf(connectorPath);
  if (mainPath) gsap.killTweensOf(mainPath);
  if (image) gsap.killTweensOf(image);
  boxes.forEach((box) => {
    gsap.killTweensOf(box);
    const defaultIcon = box.querySelector(".icon-outline");
    const coloredIcon = box.querySelector(".icon-colored");
    if (defaultIcon) gsap.killTweensOf(defaultIcon);
    if (coloredIcon) gsap.killTweensOf(coloredIcon);
  });

  // --- Reset connector line ---
  if (connectorPath) {
    connectorPath.setAttribute("d", "");
    connectorPath.style.opacity = 0;
    connectorPath.style.strokeDasharray = 0;
    connectorPath.style.strokeDashoffset = 0;
  }

  // --- Reset border svg ---
  if (mainPath) {
    const mainLength = mainPath.getTotalLength();
    gsap.set(mainPath, {
      opacity: 1,
      strokeDasharray: mainLength,
      strokeDashoffset: mainLength,
    });
  }

  // --- Hide image ---
  if (image) {
    gsap.set(image, { opacity: 0, scale: 0.95 });
  }

  // --- Reset all box icons ---
  boxes.forEach((box) => {
    const defaultIcon = box.querySelector(".icon-outline");
    const coloredIcon = box.querySelector(".icon-colored");
    gsap.set(box, {
      scale: 1,
      backgroundColor: "#f6f9fd",
      boxShadow: "none",
      border: "1px solid #ccc",
      opacity: 1,
    });
    gsap.set(defaultIcon, { opacity: 1, scale: 1 });
    gsap.set(coloredIcon, { opacity: 0, scale: 0.9 });
  });

  if (thirdLoopTimeout) clearTimeout(thirdLoopTimeout);
  thirdLoopTimeout = null;

  thirdIndex = 0;
  thirdLoopRunning = false;
  thirdStopLoop = false;
  thirdIntroRunning = false;
}

function drawThirdConnectorLine(boxEl, phoneEl) {
  const svg = document.querySelector(".third-connector-svg");
  const path = document.getElementById("third-connector-path");
  if (!svg || !path || !boxEl || !phoneEl) return;

  // --- STATIC PATH FOR FIRST BOX ---
  if (thirdIndex == 0) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = "M78.265 37.896 232.018 37.896 234.514 163.194";
    path.setAttribute("d", d);
    path.style.opacity = 1;
    path.style.transition = "none";
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

  console.log(thirdIndex);
  if (thirdIndex == 1) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = "M328.289 40.296 464.003 39.519 466.336 169.4";
    path.setAttribute("d", d);
    path.style.opacity = 1;
    path.style.transition = "none";
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

  if (thirdIndex == 2) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = "M487.64 554.7 387.676 555.99 385.096 399.916";
    path.setAttribute("d", d);
    path.style.opacity = 1;
    path.style.transition = "none";
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

  if (thirdIndex == 3) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = "M211.609 554.7 83.912 555.99 84.557 397.336";
    path.setAttribute("d", d);
    path.style.opacity = 1;
    path.style.transition = "none";
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

  // --- DYNAMIC PATH FOR OTHER BOXES ---
  const root = document.querySelector(".second-main");
  const boxRect = boxEl.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  const phoneRect = phoneEl.getBoundingClientRect();

  const dataPos = boxEl.getAttribute("data-pos");
  let start = { x: 0, y: 0 },
    end = { x: 0, y: 0 },
    tJunction = { x: 0, y: 0 };

  const phoneMargin = 10;
  const horizontalLength = 41;

  let targetY;
  if (dataPos && dataPos.includes("top")) {
    targetY = phoneRect.top - rootRect.top + phoneRect.height * 0.22;
  } else if (dataPos && dataPos.includes("bottom")) {
    targetY = phoneRect.top - rootRect.top + phoneRect.height * 0.74;
  } else {
    targetY = phoneRect.top - rootRect.top + phoneRect.height / 2;
  }

  if (dataPos && dataPos.startsWith("left")) {
    start.x = boxRect.right - rootRect.left;
    start.y = boxRect.top - rootRect.top + boxRect.height / 2;
    tJunction.x = start.x + horizontalLength;
    tJunction.y = start.y;
    end.x = phoneRect.left - rootRect.left + phoneMargin;
    end.y = targetY;
  } else if (dataPos && dataPos.startsWith("right")) {
    start.x = boxRect.left - rootRect.left;
    start.y = boxRect.top - rootRect.top + boxRect.height / 2;
    tJunction.x = start.x - horizontalLength;
    tJunction.y = start.y;
    end.x = phoneRect.right - rootRect.left - phoneMargin;
    end.y = targetY;
  } else {
    start.x = boxRect.left - rootRect.left + boxRect.width / 2;
    start.y = boxRect.top - rootRect.top + boxRect.height / 2;
    end.x = phoneRect.left - rootRect.left + phoneRect.width / 2;
    end.y = phoneRect.top - rootRect.top + phoneRect.height / 2;
    tJunction.x = (start.x + end.x) / 2;
    tJunction.y = (start.y + end.y) / 2;
  }

  const d = `
    M${start.x},${start.y}
    L${tJunction.x},${tJunction.y}
    L${tJunction.x},${end.y}
    L${end.x},${end.y}
  `.replace(/\s+/g, " ");

  path.setAttribute("d", d);
  path.style.opacity = 1;
  path.style.transition = "none";
  path.style.strokeDasharray = path.getTotalLength();
  path.style.strokeDashoffset = path.getTotalLength();
}

// --- MAIN ANIMATION LOOP ---

function animateThirdOnePath() {
  if (thirdStopLoop) return;
  const boxes = document.querySelectorAll(".third-boxes");
  const image = document.querySelector(".third-anim-img");
  if (!boxes.length || !image) return;

  const box = boxes[thirdIndex];

  // Draw the connector line
  drawThirdConnectorLine(box, image);

  const path = document.getElementById("third-connector-path");
  gsap.set(path, { opacity: 1, strokeDashoffset: path.getTotalLength() });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.5, // slower: draw line over 2.5s
    ease: "power2.inOut",
    onStart: () => {
      // highlight as before
      const defaultIcon = box.querySelector(".icon-outline");
      const coloredIcon = box.querySelector(".icon-colored");
      gsap.to(defaultIcon, { opacity: 0, duration: 0.2 });
      gsap.to(coloredIcon, { opacity: 1, scale: 1.05, duration: 0.6 });
      gsap.to(box, {
        scale: 1.07,
        boxShadow: "0px 4px 14px rgba(0,0,0,0.12)",
        backgroundColor: "white",
        border: "1px solid transparent",
        duration: 0.4,
      });

      image.src = thirdImages[thirdIndex];

      gsap.fromTo(
        image,
        { opacity: 1, scale: 1 },
        {
          opacity: 0.7,
          scale: 1.03,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        }
      );
    },
    onComplete: () => {
      // Hold line longer (1s), fade out slower (0.6s), wait 1s after fade before next line
      setTimeout(() => {
        gsap.to(path, {
          opacity: 0,
          duration: 0.6,
          onComplete: () => {
            // reset icons/box
            const defaultIcon = box.querySelector(".icon-outline");
            const coloredIcon = box.querySelector(".icon-colored");
            gsap.set(defaultIcon, { opacity: 1, scale: 1 });
            gsap.set(coloredIcon, { opacity: 0, scale: 0.9 });
            gsap.set(box, {
              scale: 1,
              boxShadow: "none",
              backgroundColor: "#f6f9fd",
              border: "1px solid #ccc",
            });
            // Pause before next line
            thirdIndex = (thirdIndex + 1) % boxes.length;
            thirdLoopTimeout = setTimeout(animateThirdOnePath, 1000); // wait 1s
          },
        });
      }, 1000); // hold line for 1s
    },
  });
}

// --- START/STOP LOOP ---
function startThirdTopPathLoop() {
  if (thirdLoopRunning) return;
  thirdLoopRunning = true;
  thirdStopLoop = false;
  animateThirdOnePath();
}
function stopThirdTopPathLoop() {
  thirdStopLoop = true;
  thirdLoopRunning = false;
  if (thirdLoopTimeout) clearTimeout(thirdLoopTimeout);
}

// --- ENTRANCE ANIMATION ---
function startThirdAnimation() {
  if (thirdIntroRunning) return;
  thirdIntroRunning = true;
  resetThirdAnimation();

  const boxes = document.querySelectorAll(".third-boxes");
  const mainPath = document.querySelector(".third-svg-main rect");
  const image = document.querySelector(".third-anim-img");
  if (!boxes.length || !mainPath || !image) {
    thirdIntroRunning = false;
    return;
  }

  image.src = thirdImages[0];
  const firstBox = boxes[0];
  const defaultIcon = firstBox.querySelector(".icon-outline");
  const coloredIcon = firstBox.querySelector(".icon-colored");
  const mainLength = mainPath.getTotalLength();

  // Prepare SVG border & image hidden
  gsap.set(mainPath, {
    opacity: 1,
    strokeDasharray: mainLength,
    strokeDashoffset: mainLength,
  });
  gsap.set(image, { opacity: 0, scale: 0.95 });

  // Prepare connector path at correct position, hidden
  drawThirdConnectorLine(firstBox, image);
  const connectorPath = document.getElementById("third-connector-path");
  const connectorLength = connectorPath.getTotalLength();
  gsap.set(connectorPath, {
    opacity: 1,
    strokeDasharray: connectorLength,
    strokeDashoffset: connectorLength,
  });

  thirdIntroTimeline = gsap
    .timeline({
      delay: 0,
      onComplete: () => {
        // Fade out SVG border and image AFTER intro finishes
        gsap.to([mainPath, image], { opacity: 0, duration: 0.4 });
        gsap.set(connectorPath, {
          opacity: 0,
          strokeDasharray: 0,
          strokeDashoffset: 0,
        });
        thirdIntroRunning = false;
        thirdIndex = 1;
        startThirdTopPathLoop();
      },
    })
    // Highlight box
    .to(defaultIcon, { opacity: 0, duration: 0.2 })
    .to(coloredIcon, { opacity: 1, scale: 1.05, duration: 0.4 }, "<")
    .to(
      firstBox,
      {
        scale: 1.05,
        boxShadow: "0px 4px 14px rgba(0,0,0,0.1)",
        backgroundColor: "white",
        border: "1px solid transparent",
        duration: 0.4,
      },
      "<"
    )
    // Animate connector line
    .to(connectorPath, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut",
      onStart: () => gsap.set(connectorPath, { opacity: 1 }),
    })
    // Overlap: SVG border and image fade in DURING line drawing
    .fromTo(
      mainPath,
      { strokeDashoffset: mainLength, opacity: 1 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.2, ease: "power2.inOut" },
      "-=1.1" // <-- starts 1.1s **before** the line finishes, adjust as needed
    )
    .fromTo(
      image,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, delay: 1, duration: 0.9, ease: "power2.out" },
      "-=1.0" // <-- starts 1.0s **before** the line finishes, adjust as needed
    )
    // Fade out connector line and de-highlight box after a short hold
    .to({}, { duration: 0.25 }) // Hold briefly after everything revealed
    .to(connectorPath, { opacity: 0, duration: 0.4 })
    .to(
      firstBox,
      {
        scale: 1,
        boxShadow: "none",
        backgroundColor: "#f6f9fd",
        border: "1px solid #ccc",
        duration: 0.18,
      },
      "<"
    )
    .to(coloredIcon, { opacity: 0, scale: 0.9, duration: 0.18 }, "<")
    .to(defaultIcon, { opacity: 1, scale: 1, duration: 0.18 }, "<")
    // Hold, then fade both out before loop starts
    .to({}, { duration: 0.3 })
    .to([mainPath, image], { opacity: 0, duration: 0.4 });
}

// --- INTERSECTION OBSERVER ---
const thirdContainerEl = document.querySelector(".third-animation-container");
const thirdObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !thirdAnimationStarted) {
        thirdAnimationStarted = true;
        startThirdAnimation();
      } else if (!entry.isIntersecting && thirdAnimationStarted) {
        thirdAnimationStarted = false;
        stopThirdTopPathLoop();
        resetThirdAnimation();
      }
    });
  },
  {
    threshold: 0.2,
    rootMargin: "0px 0px -50px 0px",
  }
);
if (thirdContainerEl) {
  thirdObserver.observe(thirdContainerEl);
}

window.startThirdAnimation = startThirdAnimation;
window.resetThirdAnimation = resetThirdAnimation;
