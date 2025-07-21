let firstAnimationStarted = false;
let firstJustTriggered = false;
let firstCurrentIndex = 0;
let firstIsLoopRunning = false;
let firstIsHoverPaused = false;
let isReversing = false;
let isDrawingHoverLine = false;
let pendingReverse = null;
let loopTimeout = null;
let currentIndex = 0;
let isLoopRunning = false; // NEW!
let interval;
let isHoverPaused = false;
let shouldResume = false;

function initAnimation() {
  killAllLoops();
  firstAnimationStarted = false;
  firstJustTriggered = false;
  firstCurrentIndex = 0;
  firstIsLoopRunning = false;
  firstIsHoverPaused = false;
  isReversing = false;
  isDrawingHoverLine = false;
  pendingReverse = null;

  function findDefualtImages(index) {
    if (index === 0) {
      return "./assets/icons/icon-default/1.svg";
    } else if (index === 1) {
      return "./assets/icons/icon-default/2.svg";
    } else if (index === 3) {
      return "./assets/icons/icon-default/4.svg";
    } else if (index === 4) {
      return "./assets/icons/icon-default/5.svg";
    } else if (index === 7) {
      return "./assets/icons/icon-default/8.svg";
    } else if (index === 10) {
      return "./assets/icons/icon-default/11.svg";
    } else if (index === 11) {
      return "./assets/icons/icon-default/12.svg";
    } else if (index === 12) {
      return "./assets/icons/icon-default/13.svg";
    } else if (index === 14) {
      return "./assets/icons/icon-default/15.svg";
    } else if (index === 15) {
      return "./assets/icons/icon-default/16.svg";
    } else if (index === 16) {
      return "./assets/icons/icon-default/17.svg";
    } else if (index === 18) {
      return "./assets/icons/icon-default/19.svg";
    } else if (index === 19) {
      return "./assets/icons/icon-default/20.svg";
    } else if (index === 21) {
      return "./assets/icons/icon-default/22.svg";
    } else if (index === 23) {
      return "./assets/icons/icon-default/24.svg";
    } else if (index === 26) {
      return "./assets/icons/icon-default/27.svg";
    } else if (index === 27) {
      return "./assets/icons/icon-default/28.svg";
    } else if (index === 29) {
      return "./assets/icons/icon-default/30.svg";
    } else if (index === 30) {
      return "./assets/icons/icon-default/31.svg";
    } else if (index === 31) {
      return "./assets/icons/icon-default/32.svg";
    } else if (index === 33) {
      return "./assets/icons/icon-default/34.svg";
    } else if (index === 34) {
      return "./assets/icons/icon-default/35.svg";
    } else {
      return "./assets/icons/icon-default/1.svg";
    }
  }

  function findColoredImages(index) {
    if (index === 0) {
      return "./assets/icons/icon-colored/1.svg";
    } else if (index === 1) {
      return "./assets/icons/icon-colored/2.svg";
    } else if (index === 3) {
      return "./assets/icons/icon-colored/4.svg";
    } else if (index === 4) {
      return "./assets/icons/icon-colored/5.svg";
    } else if (index === 7) {
      return "./assets/icons/icon-colored/8.svg";
    } else if (index === 10) {
      return "./assets/icons/icon-colored/11.svg";
    } else if (index === 11) {
      return "./assets/icons/icon-colored/12.svg";
    } else if (index === 12) {
      return "./assets/icons/icon-colored/13.svg";
    } else if (index === 14) {
      return "./assets/icons/icon-colored/15.svg";
    } else if (index === 15) {
      return "./assets/icons/icon-colored/16.svg";
    } else if (index === 16) {
      return "./assets/icons/icon-colored/17.svg";
    } else if (index === 18) {
      return "./assets/icons/icon-colored/19.svg";
    } else if (index === 19) {
      return "./assets/icons/icon-colored/20.svg";
    } else if (index === 21) {
      return "./assets/icons/icon-colored/22.svg";
    } else if (index === 23) {
      return "./assets/icons/icon-colored/24.svg";
    } else if (index === 26) {
      return "./assets/icons/icon-colored/27.svg";
    } else if (index === 27) {
      return "./assets/icons/icon-colored/28.svg";
    } else if (index === 29) {
      return "./assets/icons/icon-colored/30.svg";
    } else if (index === 30) {
      return "./assets/icons/icon-colored/31.svg";
    } else if (index === 31) {
      return "./assets/icons/icon-colored/32.svg";
    } else if (index === 33) {
      return "./assets/icons/icon-colored/34.svg";
    } else if (index === 34) {
      return "./assets/icons/icon-colored/35.svg";
    } else {
      return "./assets/icons/icon-colored/1.svg";
    }
  }

  function findIconText(index) {
    if (index === 0) {
      return "IaaS";
    } else if (index === 1) {
      return "VPS";
    } else if (index === 3) {
      return "Backup";
    } else if (index === 4) {
      return "DB";
    } else if (index === 7) {
      return "VDC";
    } else if (index === 10) {
      return "Data Center";
    } else if (index === 11) {
      return "SQL";
    } else if (index === 12) {
      return "SAAS";
    } else if (index === 14) {
      return "BaaS";
    } else if (index === 15) {
      return "DR";
    } else if (index === 17) {
      return "Digital Park";
    } else if (index === 18) {
      return "Network";
    } else if (index === 19) {
      return "Mail";
    } else if (index === 21) {
      return "Tibbit";
    } else if (index === 22) {
      return "Solutions";
    } else if (index === 26) {
      return "Security";
    } else if (index === 27) {
      return "Fortinet";
    } else if (index === 29) {
      return "OMNI";
    } else if (index === 30) {
      return "SASE";
    } else if (index === 31) {
      return "SD-WAN";
    } else if (index === 33) {
      return "Cloudfare";
    } else if (index === 34) {
      return "Webkaari";
    } else {
      return "Garaj";
    }
  }

  function getBoxData(row, col) {
    const flatIndex = row * layout[0].length + col;

    return {
      text: findIconText(flatIndex),
      default: findDefualtImages(flatIndex),
      colored: findColoredImages(flatIndex),
    };
  }

  // const layout = [
  //   [2, 2, 2, 0, 0, 2],
  //   [1, 0, 0, 2, 3, 0],
  //   [0, 2, 2, 3, 0, 3],
  //   [1, 0, 1, 1, 0, 0],
  //   [0, 4, 1, 3, 3, 4],
  //   [0, 4, 0, 0, 4, 4],
  // ];
  const layout = [
    [1, 1, 0, 2, 3, 0],
    [0, 1, 0, 0, 4, 3],
    [5, 0, 2, 2, 0, 4],
    [6, 5, 0, 5, 8, 0],
    [0, 0, 7, 7, 0, 8],
    [6, 6, 0, 7, 8, 0],
  ];

  const grid = document.getElementById("box-grid");

  const boxMap = {};

  layout.forEach((row, rowIndex) => {
    row.forEach((num, colIndex) => {
      if (num === 0) {
        const empty = document.createElement("div");
        empty.className = "box empty";
        empty.style.opacity = 0;
        grid.appendChild(empty);
        return;
      }

      const box = document.createElement("div");
      box.className = `box box-${num}`;
      box.dataset.group = num;
      box.dataset.row = rowIndex;
      box.dataset.col = colIndex;

      const {
        text,
        default: defaultSrc,
        colored: coloredSrc,
      } = getBoxData(rowIndex, colIndex);

      const defaultImg = document.createElement("img");
      const coloredImg = document.createElement("img");
      const boxText = document.createElement("div");

      defaultImg.classList.add("icon-default");
      coloredImg.classList.add("icon-colored");
      boxText.classList.add("text");

      defaultImg.src = defaultSrc;
      coloredImg.src = coloredSrc;
      boxText.innerText = text;

      box.appendChild(defaultImg);
      box.appendChild(coloredImg);
      box.appendChild(boxText);

      grid.appendChild(box);

      if (!boxMap[num]) boxMap[num] = [];
      boxMap[num].push(box);
    });
  });

  // Draw SVG lines for a group
  function isValid(row, col, target) {
    return (
      row >= 0 &&
      col >= 0 &&
      row < layout.length &&
      col < layout[0].length &&
      (layout[row][col] === 0 ||
        (target && row === target.row && col === target.col))
    );
  }

  function getCenter(row, col) {
    const box = document.querySelector(
      `[data-row="${row}"][data-col="${col}"]`
    );
    const boxRect = box.getBoundingClientRect();
    const svgRect = document
      .getElementById("connector-svg")
      .getBoundingClientRect();

    return {
      x: boxRect.left - svgRect.left + boxRect.width / 2,
      y: boxRect.top - svgRect.top + boxRect.height / 2,
    };
  }

  function findPath(from, to) {
    const queue = [[from]];
    const visited = new Set();
    visited.add(`${from.row},${from.col}`);

    const directions = [
      { dr: 0, dc: 1 }, // right
      { dr: 1, dc: 0 }, // down
      { dr: 0, dc: -1 }, // left
      { dr: -1, dc: 0 }, // up
    ];

    while (queue.length) {
      const path = queue.shift();
      if (!path.length) console.warn("No path between", current, "and", target);
      const curr = path[path.length - 1];

      if (curr.row === to.row && curr.col === to.col) return path;

      for (const { dr, dc } of directions) {
        const nr = curr.row + dr;
        const nc = curr.col + dc;
        const key = `${nr},${nc}`;
        if (!visited.has(key) && isValid(nr, nc, to)) {
          visited.add(key);
          queue.push([...path, { row: nr, col: nc }]);
        }
      }
    }

    return [];
  }

  function clearLines() {
    // document.querySelectorAll(".connection-path").forEach((el) => el.remove());
    // document.querySelectorAll(".connection-line").forEach((el) => el.remove());

    document
      .querySelectorAll(".connection-path")
      .forEach((el) => (el.style.display = "none"));
    document
      .querySelectorAll(".connection-line")
      .forEach((el) => (el.style.display = "none"));
    document.querySelector("#connector-svg").classList.add("hide");
  }

  function drawLinesForGroup(group, onAnimationComplete, isHover = false) {
    clearLines();
    const svg = document.getElementById("connector-svg");
    svg.classList.remove("hide");
    Array.from(svg.querySelectorAll("path")).forEach((el) => el.remove());

    const boxes = boxMap[group];
    if (!boxes || boxes.length < 2) return;

    const positions = boxes.map((box) => ({
      row: parseInt(box.dataset.row),
      col: parseInt(box.dataset.col),
    }));

    let fullPath = [];
    const visited = new Set();
    let current = positions[0];

    visited.add(`${current.row},${current.col}`);
    fullPath.push(current);

    for (let i = 1; i < positions.length; i++) {
      const target = positions[i];
      const path = findPath(current, target);
      if (!path.length) continue;
      for (let j = 1; j < path.length; j++) {
        const key = `${path[j].row},${path[j].col}`;
        if (!visited.has(key)) {
          fullPath.push(path[j]);
          visited.add(key);
        }
      }
      current = target;
    }

    if (fullPath.length < 2) return;

    const coords = fullPath.map(({ row, col }) => {
      const index = row * layout[0].length + col;
      const box = grid.children[index];
      const rect = box.getBoundingClientRect();
      const containerRect = document
        .querySelector(".wrapper")
        .getBoundingClientRect();
      return {
        x: rect.left - containerRect.left + rect.width / 2,
        y: rect.top - containerRect.top + rect.height / 2,
      };
    });

    const pathEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathEl.setAttribute("fill", "none");
    pathEl.setAttribute("stroke", "url(#lineGradient)");
    pathEl.setAttribute("stroke-width", "4");
    pathEl.setAttribute("stroke-linejoin", "round");
    pathEl.setAttribute("stroke-linecap", "round");

    let d = `M${coords[0].x},${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      if (prev.x !== curr.x) d += ` L${curr.x},${prev.y}`;
      if (prev.y !== curr.y) d += ` L${curr.x},${curr.y}`;
    }
    pathEl.setAttribute("d", d);

    // Animate the path (make slower for effect)
    const len = pathEl.getTotalLength();
    pathEl.style.strokeDasharray = len;
    pathEl.style.strokeDashoffset = len;
    console.log(d);
    console.log("hover " + isHover);
    if (isHover) {
      isDrawingHoverLine = true;
      gsap.fromTo(
        pathEl,
        { strokeDashoffset: len },
        {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power2.out",
          onComplete: () => {
            isDrawingHoverLine = false;
            if (pendingReverse) {
              pendingReverse(); // Execute delayed reverse
              pendingReverse = null;
            }
            if (typeof onAnimationComplete === "function")
              onAnimationComplete();
          },
        }
      );
    } else {
      // Use CSS animation for auto-loop
      const len = pathEl.getTotalLength();
      pathEl.style.strokeDasharray = `${len} ${len}`;
      pathEl.style.strokeDashoffset = len;

      // Step 1: Draw the line from start → end
      gsap.to(pathEl, {
        strokeDashoffset: 0,
        duration: 2.5,
        ease: "power2.out",
        onComplete: () => {
          // Step 2: Shrink the dasharray length from start → end (tail shrinks)
          gsap.to(pathEl, {
            strokeDashoffset: -len,
            duration: 2.5,
            ease: "power2.inOut",
            onComplete: () => {
              if (typeof onAnimationComplete === "function")
                onAnimationComplete();
            },
          });
        },
      });
    }

    svg.appendChild(pathEl);
  }

  Object.keys(boxMap).forEach((group) => {
    boxMap[group].forEach((box) => {
      box.addEventListener("mouseenter", () => {
        isHoverPaused = true;
        isLoopRunning = false;
        const targetGroup = box.dataset.group;

        // Reset all boxes first
        Object.values(boxMap)
          .flat()
          .forEach((b) => {
            gsap.to(b.querySelector(".icon-default"), {
              opacity: 1,
              duration: 0.3,
            });
            gsap.to(b.querySelector(".icon-colored"), {
              opacity: 0,
              y: 0,
              duration: 0.3,
            });
            gsap.to(b.querySelector(".text"), {
              opacity: 0,
              y: 3,
              duration: 0.3,
            });

            gsap.to(b, {
              scale: 1,
              boxShadow: "0 0 0 transparent",
              duration: 0.3,
            });
          });

        // Highlight only this group
        boxMap[targetGroup].forEach((b) => {
          gsap.to(b.querySelector(".icon-default"), {
            opacity: 0,
            duration: 0.3,
          });
          gsap.to(b.querySelector(".icon-colored"), {
            opacity: 1,
            y: -9,
            duration: 0.3,
          });
          gsap.to(b.querySelector(".text"), {
            opacity: 1,
            y: -3,
            duration: 0.3,
          });

          gsap.to(b, {
            scale: 1.05,
            boxShadow: "0 0 15px rgba(139, 139, 139, 1)",
            duration: 0.3,
          });
        });

        // Draw the group line
        drawLinesForGroup(targetGroup, null, true);
      });

      box.addEventListener("mouseleave", () => {
        if (isReversing || isRetracting) return;

        const group = box.dataset.group;
        isHoverPaused = false;
        clearTimeout(loopTimeout);

        const finishResetAndLoop = () => {
          boxMap[group].forEach((b) => {
            gsap.to(b, {
              scale: 1,
              boxShadow: "0 0 0 transparent",
              duration: 0.3,
            });
            gsap.to(b.querySelector(".icon-default"), {
              opacity: 1,
              duration: 0.3,
            });
            gsap.to(b.querySelector(".icon-colored"), {
              opacity: 0,
              y: 0,
              duration: 0.3,
            });
            gsap.to(b.querySelector(".text"), {
              opacity: 0,
              y: 3,
              duration: 0.3,
            });
          });

          clearLines();

          loopTimeout = setTimeout(() => {
            if (!isHoverPaused && !isLoopRunning && !isReversing) {
              autoLoopGroups("mouseleave fallback");
            }
          }, 200);
        };

        if (isDrawingHoverLine) {
          pendingReverse = () => reverseLineForGroup(group, finishResetAndLoop);
        } else {
          reverseLineForGroup(group, finishResetAndLoop);
        }
      });
      let isRetracting = false;
      function reverseLineForGroup(group, onComplete) {
        if (isReversing) return;
        isReversing = true;

        const svg = document.getElementById("connector-svg");
        const pathEl = svg.querySelector("path");
        if (!pathEl) {
          isReversing = false;
          if (onComplete) onComplete();
          return;
        }

        const len = pathEl.getTotalLength();

        gsap.to(pathEl, {
          strokeDashoffset: -len,
          duration: 1.2,
          ease: "power2.inOut",
          onComplete: () => {
            pathEl.remove();
            isReversing = false;
            isReversing = false;
            if (onComplete) {
              setTimeout(() => onComplete(), 50);
            }
          },
        });
      }
    });
  });

  const groupKeys = Object.keys(boxMap);

  function autoLoopGroups(source = "unknown") {
    console.log("Running autoLoopGroups from:", source);
    if (isLoopRunning || isHoverPaused) return;
    clearTimeout(loopTimeout);
    isLoopRunning = true;

    const group = groupKeys[currentIndex];
    const boxes = boxMap[group];

    // Reset all boxes
    Object.values(boxMap)
      .flat()
      .forEach((b) => {
        gsap.to(b, { scale: 1, boxShadow: "0 0 0 transparent", duration: 0.3 });
        gsap.to(b.querySelector(".icon-default"), {
          opacity: 1,
          duration: 0.3,
        });
        gsap.to(b.querySelector(".icon-colored"), {
          opacity: 0,
          y: 0,
          duration: 0.3,
        });
        gsap.to(b.querySelector(".text"), { opacity: 0, y: 3, duration: 0.3 });
      });

    clearLines();

    // Highlight current group
    boxes.forEach((b) => {
      gsap.to(b, {
        scale: 1.02,
        boxShadow: "0 0 15px rgba(139,139,139,1)",
        duration: 0.3,
      });
      gsap.to(b.querySelector(".icon-default"), { opacity: 0, duration: 0.3 });
      gsap.to(b.querySelector(".icon-colored"), {
        opacity: 1,
        y: -9,
        duration: 0.3,
      });
      gsap.to(b.querySelector(".text"), { opacity: 1, y: -3, duration: 0.3 });
    });

    drawLinesForGroup(group, function () {
      currentIndex = (currentIndex + 1) % groupKeys.length;
      isLoopRunning = false;

      if (!isHoverPaused) {
        clearTimeout(loopTimeout);
        loopTimeout = setTimeout(() => {
          if (
            !isLoopRunning &&
            !isHoverPaused &&
            !isDrawingHoverLine &&
            !isReversing
          ) {
            autoLoopGroups("after group animation");
          }
        }, 200);
      }
    });
  }

  function killAllLoops() {
    console.log("Killing all loops...");

    clearTimeout(loopTimeout);
    loopTimeout = null;
    currentIndex = 0;
    isLoopRunning = false;
    firstIsLoopRunning = false;
    isHoverPaused = false;
    firstIsHoverPaused = false;

    isDrawingHoverLine = false;
    isReversing = false;
    pendingReverse = null;

    // Kill any GSAP tweens globally (only if needed)
    if (typeof gsap !== "undefined") {
      gsap.globalTimeline.clear(); // Stops all GSAP animations if applicable
    }
  }

  // Start immediately
  autoLoopGroups();

  // grid.addEventListener("mouseenter", stopLoop);
  // grid.addEventListener("mouseleave", startLoop);
}

const firstTargetSection = document.querySelector(".first-animation-container");
let firstHasPlayed = false;

const firstObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting && !firstHasPlayed) {
        firstHasPlayed = true; // only play ONCE per session
        // FULL RESET
        document.getElementById("box-grid").innerHTML = "";
        let svg = document.getElementById("connector-svg");
        if (svg) {
          Array.from(svg.querySelectorAll("path")).forEach((el) => el.remove());
          svg.classList.add("hide");
        }
        firstCurrentIndex = 0;
        firstIsLoopRunning = false;
        firstIsHoverPaused = false;
        isReversing = false;
        isDrawingHoverLine = false;
        pendingReverse = null;

        clearTimeout(loopTimeout);
        isLoopRunning = false;

        initAnimation();
      }
      // If you want it to be possible to "re-enter" the section and restart, uncomment below:
      // else if (!entry.isIntersecting && firstHasPlayed) {
      //   firstHasPlayed = false; // now it'll restart when you scroll out and back in
      // }
    });
  },
  {
    threshold: 0.3,
    rootMargin: "0px 0px -50px 0px",
  }
);

if (firstTargetSection) {
  firstObserver.observe(firstTargetSection);
}

window.startFirstAnimation = function () {
  // Optional: Stop any running auto loop timer or GSAP animation
  if (typeof firstLoopTween !== "undefined" && firstLoopTween) {
    firstLoopTween.kill(); // If you used GSAP timelines
    firstLoopTween = null;
  }

  firstIsLoopRunning = false;
  firstIsHoverPaused = false;
  firstCurrentIndex = 0;

  // Clear grid
  document.getElementById("box-grid").innerHTML = "";

  // Clear SVG paths
  const svg = document.getElementById("connector-svg");
  if (svg) {
    svg.querySelectorAll("path").forEach((el) => el.remove());
    svg.classList.add("hide");
  }

  // Cleanly start
  initAnimation();
};
