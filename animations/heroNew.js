function initAnimation() {
  function findDefualtImages(index) {
    if (index === 0) {
      return "./assets/icons/1.svg";
    } else if (index === 2) {
      return "./assets/icons/2.svg";
    } else if (index === 3) {
      return "./assets/icons/3.svg";
    } else if (index === 5) {
      return "./assets/icons/6.svg";
    } else if (index === 6) {
      return "./assets/icons/7.svg";
    } else if (index === 9) {
      return "./assets/icons/10.svg";
    } else if (index === 10) {
      return "./assets/icons/11.svg";
    } else if (index === 13) {
      return "./assets/icons/14.svg";
    } else if (index === 14) {
      return "./assets/icons/15.svg";
    } else if (index === 15) {
      return "./assets/icons/16.svg";
    } else if (index === 17) {
      return "./assets/icons/18.svg";
    } else if (index === 18) {
      return "./assets/icons/19.svg";
    } else if (index === 20) {
      return "./assets/icons/21.svg";
    } else if (index === 21) {
      return "./assets/icons/22.svg";
    } else if (index === 25) {
      return "./assets/icons/32.svg";
    } else if (index === 26) {
      return "./assets/icons/27.svg";
    } else if (index === 27) {
      return "./assets/icons/28.svg";
    } else if (index === 28) {
      return "./assets/icons/29.svg";
    } else if (index === 29) {
      return "./assets/icons/32.svg";
    } else if (index === 31) {
      return "./assets/icons/32.svg";
    } else if (index === 34) {
      return "./assets/icons/35.svg";
    } else if (index === 35) {
      return "./assets/icons/36.svg";
    } else {
      return "./assets/icons/1.svg";
    }
  }

  function findColoredImages(index) {
    if (index === 0) {
      return "./assets/icons/1_color.svg";
    } else if (index === 2) {
      return "./assets/icons/2_color.svg";
    } else if (index === 3) {
      return "./assets/icons/3_color.svg";
    } else if (index === 5) {
      return "./assets/icons/6_color.svg";
    } else if (index === 6) {
      return "./assets/icons/7_color.svg";
    } else if (index === 9) {
      return "./assets/icons/10_color.svg";
    } else if (index === 10) {
      return "./assets/icons/11_color.svg";
    } else if (index === 13) {
      return "./assets/icons/14_color.svg";
    } else if (index === 14) {
      return "./assets/icons/15_color.svg";
    } else if (index === 15) {
      return "./assets/icons/16_color.svg";
    } else if (index === 17) {
      return "./assets/icons/18_color.svg";
    } else if (index === 18) {
      return "./assets/icons/19_color.svg";
    } else if (index === 20) {
      return "./assets/icons/21_color.svg";
    } else if (index === 21) {
      return "./assets/icons/22_color.svg";
    } else if (index === 25) {
      return "./assets/icons/32_color.svg";
    } else if (index === 26) {
      return "./assets/icons/27_color.svg";
    } else if (index === 27) {
      return "./assets/icons/28_color.svg";
    } else if (index === 28) {
      return "./assets/icons/29_color.svg";
    } else if (index === 29) {
      return "./assets/icons/32_color.svg";
    } else if (index === 31) {
      return "./assets/icons/32_color.svg";
    } else if (index === 34) {
      return "./assets/icons/35_color.svg";
    } else if (index === 35) {
      return "./assets/icons/36_color.svg";
    } else {
      return "./assets/icons/1_color.svg";
    }
  }

  function findIconText(index) {
    if (index === 0) {
      return "Microsoft";
    } else if (index === 2) {
      return "Fortinet";
    } else if (index === 3) {
      return "Cloudfare";
    } else if (index === 5) {
      return "Samsung";
    } else if (index === 6) {
      return "Knox";
    } else if (index === 9) {
      return "Tibbit";
    } else if (index === 10) {
      return "Red hat";
    } else if (index === 13) {
      return "VPS";
    } else if (index === 14) {
      return "VDC";
    } else if (index === 15) {
      return "Digital";
    } else if (index === 17) {
      return "SaaS";
    } else if (index === 18) {
      return "Disaster";
    } else if (index === 20) {
      return "Recovery";
    } else if (index === 21) {
      return "Fortinet";
    } else if (index === 25) {
      return "Cloudfare";
    } else if (index === 26) {
      return "Microsoft";
    } else if (index === 27) {
      return "Red hat";
    } else if (index === 28) {
      return "Tibbit";
    } else if (index === 29) {
      return "Knox";
    } else if (index === 31) {
      return "VPS";
    } else if (index === 34) {
      return "Digital";
    } else if (index === 35) {
      return "Microsoft";
    } else {
      return "VDC";
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

  let interval;

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
    [5, 0, 2, 2, 4, 0],
    [6, 5, 0, 5, 0, 8],
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
    const sampleBox = document.querySelector(".box");
    const boxRect = sampleBox.getBoundingClientRect();
    const boxWidth = boxRect.width;
    const boxHeight = boxRect.height;
    const gridRect = grid.getBoundingClientRect();

    return {
      x: gridRect.left + col * boxWidth + boxWidth / 2 + window.scrollX,
      y: gridRect.top + row * boxHeight + boxHeight / 2 + window.scrollY,
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

  function drawLinesForGroup(group) {
    clearLines();
    document.querySelector("#connector-svg").classList.remove("hide");

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

    // Use DOM box center positions
    const coords = fullPath.map(({ row, col }) => {
      const index = row * layout[0].length + col;
      const box = grid.children[index];
      const rect = box.getBoundingClientRect();
      return {
        x: rect.left + rect.width / 2 + window.scrollX,
        y: rect.top + rect.height / 2 + window.scrollY,
      };
    });

    const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
    svg.setAttribute("class", "connection-path");
    svg.style.position = "absolute";
    svg.style.left = "0";
    svg.style.top = "0";
    svg.style.width = "100%";
    svg.style.height = "100%";
    svg.style.pointerEvents = "none";
    svg.style.zIndex = "1";

    const pathEl = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "path"
    );
    pathEl.setAttribute("fill", "none");
    pathEl.setAttribute("stroke", "#f1991d");
    pathEl.setAttribute("stroke-width", "4");
    pathEl.setAttribute("stroke-linejoin", "round");
    pathEl.setAttribute("stroke-linecap", "round");

    let d = `M${coords[0].x},${coords[0].y}`;
    for (let i = 1; i < coords.length; i++) {
      const prev = coords[i - 1];
      const curr = coords[i];
      // go horizontal
      if (prev.x !== curr.x) d += ` L${curr.x},${prev.y}`;
      // then vertical
      if (prev.y !== curr.y) d += ` L${curr.x},${curr.y}`;
    }

    pathEl.setAttribute("d", d);
    pathEl.style.strokeDasharray = pathEl.getTotalLength();
    pathEl.style.strokeDashoffset = pathEl.getTotalLength();
    pathEl.style.animation = "drawPath 1s ease forwards";

    svg.appendChild(pathEl);
    document.body.appendChild(svg);
    currentAutoLine = svg;
  }

  Object.keys(boxMap).forEach((group) => {
    boxMap[group].forEach((box) => {
      box.addEventListener("mouseenter", () => {
        boxMap[group].forEach((b) => {
          gsap.to(b, {
            scale: 1.02,
            boxShadow: "0 0 15px rgba(139, 139, 139, 1)",
            duration: 0.3,
          });

          gsap.fromTo(
            b.querySelector(".icon-default"),
            {
              opacity: 1,
            },
            {
              opacity: 0,
              duration: 0.3,
            }
          );

          gsap.fromTo(
            b.querySelector(".icon-colored"),
            {
              opacity: 0,
              y: 0,
            },
            {
              opacity: 1,
              y: -9,
              duration: 0.3,
            }
          );

          gsap.fromTo(
            b.querySelector(".text"),
            {
              opacity: 0,
              y: 3,
            },
            {
              opacity: 1,
              y: -3,
              duration: 0.3,
            }
          );
        });
        drawLinesForGroup(group);
      });

      box.addEventListener("mouseleave", () => {
        boxMap[group].forEach((b) => {
          gsap.to(b, {
            scale: 1,
            boxShadow: "0 0 0 transparent",
            duration: 0.3,
          });

          gsap.fromTo(
            b.querySelector(".icon-default"),
            {
              opacity: 0,
            },
            {
              opacity: 1,
              duration: 0.3,
            }
          );

          gsap.fromTo(
            b.querySelector(".icon-colored"),
            {
              opacity: 1,
              y: -9,
            },
            {
              opacity: 0,
              y: 0,
              duration: 0.3,
            }
          );

          gsap.fromTo(
            b.querySelector(".text"),
            {
              opacity: 1,
              y: -3,
            },
            {
              opacity: 0,
              y: 3,
              duration: 0.3,
            }
          );
        });

        function hideLine() {
          this.style.display = "none";
        }

        currentLines.forEach((line) => {
          gsap.to(line, {
            x2: line.getAttribute("x1"),
            y2: line.getAttribute("y1"),
            duration: 0.3,
            ease: "power2.in",
            onComplete: hideLine.bind(line),
          });
        });
      });
    });
  });

  grid.addEventListener("mouseleave", () => {
    clearLines();

    Object.values(boxMap)
      .flat()
      .forEach((b) => {
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
  });

  let currentIndex = 0;
  const groupKeys = Object.keys(boxMap);

  function autoLoopGroups() {
    const group = groupKeys[currentIndex];
    const boxes = boxMap[group];

    // Reset all boxes
    Object.values(boxMap)
      .flat()
      .forEach((b) => {
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

    // Animate current group
    boxes.forEach((b) => {
      gsap.to(b, {
        scale: 1.02,
        boxShadow: "0 0 15px rgba(139, 139, 139, 1)",
        duration: 0.3,
      });

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
    });

    drawLinesForGroup(group);

    currentIndex = (currentIndex + 1) % groupKeys.length;
  }

  // Run auto loop

  function startLoop() {
    interval = setInterval(autoLoopGroups, 3000);
  }

  function stopLoop() {
    clearInterval(interval);
  }
  startLoop();

  grid.addEventListener("mouseenter", stopLoop);
  grid.addEventListener("mouseleave", startLoop);

  window.addEventListener("scroll", () => {
    stopLoop(); // stop auto-loop
    clearLines();

    Object.values(boxMap)
      .flat()
      .forEach((b) => {
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
  });

  window.addEventListener("blur", () => {
    clearLines();

    Object.values(boxMap)
      .flat()
      .forEach((b) => {
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
  });
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        initAnimation(); // 🔥 Run your animation setup
        observer.unobserve(entry.target); // 🛑 Run only once
      }
    });
  },
  {
    threshold: 0.3, // Trigger when 30% of the section is visible
  }
);

const targetSection = document.querySelector(".first-animation-container");
observer.observe(targetSection);
