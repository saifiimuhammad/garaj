const SecondAnimations = () => {
  const elements = document.querySelectorAll(".icon-outlined");
  const images = document.querySelectorAll(".second-mobile-img");

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
    },
    {
      opacity: 1,
      delay: 1.5,
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

  function startSecondAnimation() {
    if (animationStarted) return;
    animationStarted = true;

    const boxes = document.querySelectorAll(".second-boxes");
    const topPaths = document.querySelectorAll(".second-svg-side path");
    const mainPath = document.querySelector(".second-svg-main rect");

    if (!boxes.length || !topPaths.length || !mainPath) {
      console.error("Required SVG or boxes not found.");
      return;
    }

    const mainLength = mainPath.getTotalLength();
    const pathLengths = Array.from(topPaths).map((p) => p.getTotalLength());

    // Initialize styles
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

    // Start animations
    SecondAnimations();

    // Step 1: Initial box1 and main animation
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
    });

    // Step 2: Loop top paths
    function startTopPathLoop() {
      let index = 0;

      function animateOnePath() {
        const path = topPaths[index];
        const len = pathLengths[index];
        const box = boxes[index];

        const defaultIcon = box.querySelector(".icon-default");
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
            gsap.to(coloredIcon, { scale: 1.05, opacity: 1, duration: 0.6 });
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

            if (index === 3) index = 0;
            else index++;
            setTimeout(animateOnePath, 800);
          },
        });
      }

      animateOnePath();
    }
  }

  // Intersection Observer

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!animationStarted) {
            startSecondAnimation();
            animationStarted = true;
          }
        } else {
          // Allow it to run again next time
          animationStarted = false;
        }
      });
    },
    {
      threshold: 0.2,
      rootMargin: "0px 0px -50px 0px",
    }
  );

  const secondContainer = document.querySelector(".second-animation-container");
  if (secondContainer) {
    observer.observe(secondContainer);
  }
});
