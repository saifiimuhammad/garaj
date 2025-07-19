document.addEventListener("DOMContentLoaded", () => {
  let animationStarted = false;
  let loopTimeout = null;
  let stopLoop = false;

  function SecondAnimations() {
    const elements = document.querySelectorAll(".icon-outlined");
    const images = document.querySelectorAll(".second-mobile-img");

    gsap.fromTo(
      elements,
      {
        opacity: 0,
        scale: 0.8,
      },
      {
        opacity: 1,
        scale: 1,
        delay: 0.8,
        duration: 0.6,
        ease: "back.out(1.7)",
        stagger: 0.1,
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
        ease: "power2.out",
      }
    );

    gsap.to(".svg-pipeline", {
      opacity: 1,
      delay: 1,
      duration: 2,
      ease: "power2.out",
    });
  }

  function startSecondAnimation() {
    const boxes = document.querySelectorAll(".second-boxes");
    const topPaths = document.querySelectorAll(".second-svg-side path");
    const mainPath = document.querySelector(".second-svg-main rect");

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

    // Trigger entrance animations
    SecondAnimations();

    // Initial box and path animation
    const intro = gsap.timeline({
      defaults: { ease: "power2.out" },
      onComplete: startTopPathLoop,
    });

    intro.fromTo(
      boxes[0],
      { scale: 0.8 },
      { scale: 1.05, duration: 0.5, yoyo: true, repeat: 1 }
    );

    // intro.to(topPaths[0], {
    //   strokeDashoffset: 0,
    //   duration: 1,
    //   ease: "power2.inOut",
    // });

    intro.to(mainPath, {
      strokeDashoffset: 0,
      duration: 1.5,
      ease: "power2.inOut",
      onComplete: () => {
        gsap.to(mainPath, {
          opacity: 0,
          duration: 0.5,
          ease: "power2.out",
        });
        startTopPathLoop();
      },
    });

    // Loop through side paths one by one
    let index = 0;

    function animateOnePath() {
      if (stopLoop) return;

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
        ease: "power2.inOut",
        onStart: () => {
          gsap.to(defaultIcon, {
            opacity: 0,
            duration: 0.3,
            ease: "power2.out",
          });
          gsap.to(coloredIcon, {
            scale: 1.05,
            opacity: 1,
            duration: 0.5,
            ease: "power2.out",
          });

          gsap.to(box, {
            scale: 1.05,
            opacity: 1,
            duration: 0.5,
            backgroundColor: "white",
            boxShadow: "0px 3px 10px 1px #d0d8e2",
            border: "1px solid transparent",
            ease: "power2.out",
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

          index = (index + 1) % topPaths.length;
          loopTimeout = setTimeout(animateOnePath, 800);
        },
      });
    }

    function startTopPathLoop() {
      stopLoop = false;
      animateOnePath();
    }
  }

  // Observer
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !animationStarted) {
          animationStarted = true;
          stopLoop = false;
          startSecondAnimation();
        } else if (!entry.isIntersecting) {
          // Cleanup
          animationStarted = false;
          stopLoop = true;
          if (loopTimeout) clearTimeout(loopTimeout);
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
