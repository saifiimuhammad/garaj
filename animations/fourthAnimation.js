const FourthAnimations = () => {
  const elements = document.querySelectorAll(".icon-outlined");
  const images = document.querySelectorAll(".fourth-anim-img");

  gsap.fromTo(
    elements,
    {
      opacity: 0,
      scale: 0,
    },
    {
      opacity: 1,
      scale: 1,
      delay: 0.5,
      stagger: 0.04,
    }
  );

  gsap.fromTo(
    images,
    {
      opacity: 0,
      scale: 0.95,
    },
    {
      opacity: 1,
      scale: 1,
      delay: 2,
      duration: 1,
    }
  );

  gsap.to(".svg-pipeline", {
    opacity: 1,
    delay: 1,
    duration: 2,
  });
};

document.addEventListener("DOMContentLoaded", () => {
  let animationStarted = false;
  let topPathLoopTimeout;
  let stopLoop = false;

  function resetFourthAnimations() {
    stopLoop = true;
    clearTimeout(topPathLoopTimeout);

    const boxes = document.querySelectorAll(".fourth-boxes");
    const topPaths = document.querySelectorAll(".fourth-svg-top path");
    const mainPath = document.querySelector(".fourth-svg-main rect");

    if (!boxes.length || !topPaths.length || !mainPath) return;

    const mainLength = mainPath.getTotalLength();
    const pathLengths = Array.from(topPaths).map((p) => p.getTotalLength());

    topPaths.forEach((p, i) => {
      gsap.set(p, {
        strokeDasharray: pathLengths[i],
        strokeDashoffset: -pathLengths[i],
      });
    });

    gsap.set(mainPath, {
      strokeDasharray: mainLength,
      strokeDashoffset: mainLength,
    });

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
  }

  function startFourthAnimation() {
    stopLoop = false;

    const boxes = document.querySelectorAll(".fourth-boxes");
    const topPaths = document.querySelectorAll(".fourth-svg-top path");
    const mainPath = document.querySelector(".fourth-svg-main rect");

    if (!boxes.length || !topPaths.length || !mainPath) {
      console.error("Required SVG or boxes not found.");
      return;
    }

    const mainLength = mainPath.getTotalLength();
    const pathLengths = Array.from(topPaths).map((p) => p.getTotalLength());

    topPaths.forEach((p, i) => {
      gsap.set(p, {
        strokeDasharray: pathLengths[i],
        strokeDashoffset: -pathLengths[i],
      });
    });

    gsap.set(mainPath, {
      strokeDasharray: mainLength,
      strokeDashoffset: mainLength,
    });

    FourthAnimations();

    const intro = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: startTopPathLoop,
    });

    intro.fromTo(
      boxes[0],
      { scale: 0.8 },
      { scale: 1.05, duration: 0.5, yoyo: true, repeat: 1 }
    );

    intro.to(topPaths[0], {
      strokeDashoffset: 0,
      duration: 1,
    });

    intro.to(mainPath, {
      strokeDashoffset: 0,
      duration: 2,
      onComplete: () => {
        gsap.to(mainPath, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        startTopPathLoop();
      },
    });

    function startTopPathLoop() {
      let index = 0;

      function animateOnePath() {
        if (stopLoop) return;

        const path = topPaths[index];
        const len = pathLengths[index];
        const box = boxes[index];

        const defaultIcon = box.querySelector(".icon-outline");
        const coloredIcon = box.querySelector(".icon-colored");

        gsap.set(path, { strokeDashoffset: -len });
        gsap.set(defaultIcon, { opacity: 1, scale: 1 });
        gsap.set(coloredIcon, { opacity: 0, scale: 0.9 });

        gsap.to(path, {
          strokeDashoffset: 0,
          duration: 2,
          ease: "power1.inOut",
          onStart: () => {
            gsap.to(defaultIcon, { opacity: 0, duration: 0.3 });
            gsap.to(coloredIcon, {
              scale: 1.05,
              opacity: 1,
              duration: 0.6,
            });
            gsap.to(box, {
              scale: 1.05,
              opacity: 1,
              duration: 0.5,
              backgroundColor: "white",
              boxShadow: "0px 3px 10px 1px #d0d8e2",
              border: "1px solid transparent",
            });
          },
          onComplete: () => {
            if (stopLoop) return;

            gsap.set(path, { strokeDashoffset: -len });
            gsap.set(defaultIcon, { opacity: 1, scale: 1 });
            gsap.set(coloredIcon, { opacity: 0, scale: 0.9 });
            gsap.set(box, {
              scale: 1,
              opacity: 1,
              backgroundColor: "#f6f9fd",
              boxShadow: "none",
              border: "1px solid #ccc",
            });

            index = (index + 1) % topPaths.length;
            topPathLoopTimeout = setTimeout(animateOnePath, 800);
          },
        });
      }

      animateOnePath();
    }
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          startFourthAnimation();
        } else if (!entry.isIntersecting && animationStarted) {
          resetFourthAnimations();
          animationStarted = false;
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const fourthContainer = document.querySelector(".fourth-animation-container");
  if (fourthContainer) {
    observer.observe(fourthContainer);
  }
});
