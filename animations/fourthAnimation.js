const fourthImages = [
  "./assets/images/3rd_animation_image.svg", // index 0
  "./assets/images/3rd_animation_image.svg", // index 1
  "./assets/images/3rd_animation_image.svg", // index 2
  "./assets/images/3rd_animation_image.svg"  // index 3
];

let fourthAnimationStarted = false;
let fourthIntroRunning = false;
let fourthLoopTimeout = null;
let fourthLoopRunning = false;
let fourthStopLoop = false;
let fourthIndex = 0;
let fourthIntroTimeline = null;

// --- RESET FUNCTION ---
function resetFourthAnimation() {
  const boxes = document.querySelectorAll(".fourth-boxes");
  const mainPath = document.querySelector(".fourth-svg-main rect");
  const image = document.querySelector(".fourth-anim-img");
  const connectorPath = document.getElementById('fourth-connector-path');

  // --- Kill all GSAP tweens/timelines ---
  if (fourthIntroTimeline) {
    fourthIntroTimeline.kill();
    fourthIntroTimeline = null;
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
    connectorPath.setAttribute('d', '');
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
      strokeDashoffset: mainLength
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

  if (fourthLoopTimeout) clearTimeout(fourthLoopTimeout);
  fourthLoopTimeout = null;

  fourthIndex = 0;
  fourthLoopRunning = false;
  fourthStopLoop = false;
  fourthIntroRunning = false;
}


function drawFourthConnectorLine(boxEl, phoneEl) {
  const svg = document.querySelector('.fourth-connector-svg');
  const path = document.getElementById('fourth-connector-path');
  if (!svg || !path || !boxEl || !phoneEl) return;

  // --- STATIC PATH FOR FIRST BOX ---
   if (fourthIndex==0) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = 'M78.265 37.896 232.018 37.896 234.514 163.194';
    path.setAttribute('d', d);
    path.style.opacity = 1;
    path.style.transition = 'none';
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

  console.log(thirdIndex)
    if (fourthIndex==1) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = 'M328.289 40.296 464.003 39.519 466.336 169.4';
    path.setAttribute('d', d);
    path.style.opacity = 1;
    path.style.transition = 'none';
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

      if (fourthIndex==2) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = 'M487.64 554.7 387.676 555.99 385.096 399.916';
    path.setAttribute('d', d);
    path.style.opacity = 1;
    path.style.transition = 'none';
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }
  

  
      if (fourthIndex==3) {
    // Use the exact SVG path you provided (adjust as needed)
    const d = 'M211.609 554.7 83.912 555.99 84.557 397.336';
    path.setAttribute('d', d);
    path.style.opacity = 1;
    path.style.transition = 'none';
    path.style.strokeDasharray = path.getTotalLength();
    path.style.strokeDashoffset = path.getTotalLength();
    return;
  }

  // --- DYNAMIC PATH FOR OTHER BOXES ---
  const root = document.querySelector('.fourth-animation-container');
  const boxRect = boxEl.getBoundingClientRect();
  const rootRect = root.getBoundingClientRect();
  const phoneRect = phoneEl.getBoundingClientRect();

  const dataPos = boxEl.getAttribute('data-pos');
  let start = {x:0, y:0}, end = {x:0, y:0}, tJunction = {x:0, y:0};

  const phoneMargin = 10;
  const horizontalLength = 41;

  let targetY;
  if (dataPos && dataPos.includes('top')) {
    targetY = phoneRect.top - rootRect.top + phoneRect.height * 0.22;
  } else if (dataPos && dataPos.includes('bottom')) {
    targetY = phoneRect.top - rootRect.top + phoneRect.height * 0.74;
  } else {
    targetY = phoneRect.top - rootRect.top + phoneRect.height / 2;
  }

  if (dataPos && dataPos.startsWith('left')) {
    start.x = boxRect.right - rootRect.left;
    start.y = boxRect.top - rootRect.top + boxRect.height/2;
    tJunction.x = start.x + horizontalLength;
    tJunction.y = start.y;
    end.x = phoneRect.left - rootRect.left + phoneMargin;
    end.y = targetY;
  } else if (dataPos && dataPos.startsWith('right')) {
    start.x = boxRect.left - rootRect.left;
    start.y = boxRect.top - rootRect.top + boxRect.height/2;
    tJunction.x = start.x - horizontalLength;
    tJunction.y = start.y;
    end.x = phoneRect.right - rootRect.left - phoneMargin;
    end.y = targetY;
  } else {
    start.x = boxRect.left - rootRect.left + boxRect.width / 2;
    start.y = boxRect.top - rootRect.top + boxRect.height / 2;
    end.x = phoneRect.left - rootRect.left + phoneRect.width / 2;
    end.y = phoneRect.top - rootRect.top + phoneRect.height / 2;
    tJunction.x = (start.x + end.x)/2;
    tJunction.y = (start.y + end.y)/2;
  }

  const d = `
    M${start.x},${start.y}
    L${tJunction.x},${tJunction.y}
    L${tJunction.x},${end.y}
    L${end.x},${end.y}
  `.replace(/\s+/g, ' ');

  path.setAttribute('d', d);
  path.style.opacity = 1;
  path.style.transition = 'none';
  path.style.strokeDasharray = path.getTotalLength();
  path.style.strokeDashoffset = path.getTotalLength();
}

// --- MAIN ANIMATION LOOP ---
function animateFourthOnePath() {
  if (fourthStopLoop) return;
  const boxes = document.querySelectorAll(".fourth-boxes");
  const image = document.querySelector(".fourth-anim-img");
  if (!boxes.length || !image) return;

  const box = boxes[fourthIndex];

  // Draw the connector line
  drawFourthConnectorLine(box, image);

  const path = document.getElementById('fourth-connector-path');
  gsap.set(path, { opacity: 1, strokeDashoffset: path.getTotalLength() });

  gsap.to(path, {
    strokeDashoffset: 0,
    duration: 2.5,
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

      image.src = fourthImages[fourthIndex];

      gsap.fromTo(image,
        { opacity: 1, scale: 1 },
        {
          opacity: 0.7,
          scale: 1.03,
          duration: 0.5,
          yoyo: true,
          repeat: 1,
          ease: "power1.inOut",
        });
    },
    onComplete: () => {
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
            fourthIndex = (fourthIndex + 1) % boxes.length;
            fourthLoopTimeout = setTimeout(animateFourthOnePath, 1000);
          }
        });
      }, 1000);
    }
  });
}

// --- START/STOP LOOP ---
function startFourthTopPathLoop() {
  if (fourthLoopRunning) return;
  fourthLoopRunning = true;
  fourthStopLoop = false;
  animateFourthOnePath();
}
function stopFourthTopPathLoop() {
  fourthStopLoop = true;
  fourthLoopRunning = false;
  if (fourthLoopTimeout) clearTimeout(fourthLoopTimeout);
}

// --- ENTRANCE ANIMATION ---
function startFourthAnimation() {
  if (fourthIntroRunning) return;
  fourthIntroRunning = true;
  resetFourthAnimation();

  const boxes = document.querySelectorAll(".fourth-boxes");
  const mainPath = document.querySelector(".fourth-svg-main rect");
  const image = document.querySelector(".fourth-anim-img");
  if (!boxes.length || !mainPath || !image) {
    fourthIntroRunning = false;
    return;
  }

  image.src = fourthImages[0];
  const firstBox = boxes[0];
  const defaultIcon = firstBox.querySelector(".icon-outline");
  const coloredIcon = firstBox.querySelector(".icon-colored");
  const mainLength = mainPath.getTotalLength();

  // Prepare SVG border & image hidden
  gsap.set(mainPath, { opacity: 1, strokeDasharray: mainLength, strokeDashoffset: mainLength });
  gsap.set(image, { opacity: 0, scale: 0.95 });

  // Prepare connector path at correct position, hidden
  drawFourthConnectorLine(firstBox, image);
  const connectorPath = document.getElementById('fourth-connector-path');
  const connectorLength = connectorPath.getTotalLength();
  gsap.set(connectorPath, { opacity: 1, strokeDasharray: connectorLength, strokeDashoffset: connectorLength });

  fourthIntroTimeline = gsap.timeline({
    delay: 0,
    onComplete: () => {
      gsap.to([mainPath, image], { opacity: 0, duration: 0.4 });
      gsap.set(connectorPath, { opacity: 0, strokeDasharray: 0, strokeDashoffset: 0 });
      fourthIntroRunning = false;
      fourthIndex = 1;
      startFourthTopPathLoop();
    }
  })
    .to(defaultIcon, { opacity: 0, duration: 0.2 })
    .to(coloredIcon, { opacity: 1, scale: 1.05, duration: 0.4 }, "<")
    .to(firstBox, {
      scale: 1.05,
      boxShadow: "0px 4px 14px rgba(0,0,0,0.1)",
      backgroundColor: "white",
      border: "1px solid transparent",
      duration: 0.4,
    }, "<")
    .to(connectorPath, {
      strokeDashoffset: 0,
      duration: 2.5,
      ease: "power2.inOut",
      onStart: () => gsap.set(connectorPath, { opacity: 1 }),
    })
    .fromTo(mainPath,
      { strokeDashoffset: mainLength, opacity: 1 },
      { strokeDashoffset: 0, opacity: 1, duration: 1.2, ease: "power2.inOut" },
      "-=1.1"
    )
    .fromTo(image,
      { opacity: 0, scale: 0.95 },
      { opacity: 1, scale: 1, duration: 0.9, ease: "power2.out" },
      "-=1.0"
    )
    .to({}, { duration: 0.25 })
    .to(connectorPath, { opacity: 0, duration: 0.4 })
    .to(firstBox, {
      scale: 1,
      boxShadow: "none",
      backgroundColor: "#f6f9fd",
      border: "1px solid #ccc",
      duration: 0.18
    }, "<")
    .to(coloredIcon, { opacity: 0, scale: 0.9, duration: 0.18 }, "<")
    .to(defaultIcon, { opacity: 1, scale: 1, duration: 0.18 }, "<")
    .to({}, { duration: 0.3 })
    .to([mainPath, image], { opacity: 0, duration: 0.4 });
}

// --- INTERSECTION OBSERVER ---
const fourthContainerEl = document.querySelector(".fourth-animation-container");
const fourthObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      console.log(
  "entry.isIntersecting:", entry.isIntersecting,
  "intersectionRatio:", entry.intersectionRatio,
  "boundingClientRect:", entry.boundingClientRect
);
      if (entry.isIntersecting) {
        if (!fourthAnimationStarted) {
          resetFourthAnimation();
          fourthAnimationStarted = true;
          startFourthAnimation();
        }
      } else {
        if (fourthAnimationStarted) {
          fourthAnimationStarted = false;
          stopFourthTopPathLoop();
          resetFourthAnimation();
        }
      }
    });
  },
  {
    threshold: 0, // only reset if section is 100% out of view
    rootMargin: "0px"
  }
);

if (fourthContainerEl) {
  fourthObserver.observe(fourthContainerEl);
}


window.startFourthAnimation = startFourthAnimation;
window.resetFourthAnimation = resetFourthAnimation;
