const FirstAnimations = () => {
  const elements = document.querySelectorAll(".first-boxes");

  // Initial fade-in animation
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
      duration: 0.6,
      ease: "back.out(1.7)",
    }
  );

  gsap.to(".svg-pipeline", {
    opacity: 1,
    delay: 1,
    duration: 2,
  });

  elements.forEach((elem) => {
    const [iconDefault, iconColored] = elem.querySelectorAll("img");

    const getRandomElements = (excludeElem, count = 2) => {
      const others = [...elements].filter((el) => el !== excludeElem);
      const shuffled = others.sort(() => 0.5 - Math.random());
      return shuffled.slice(0, count);
    };

    const onHover = () => {
      const randomBoxes = getRandomElements(elem, 2);
      const allBoxes = [elem, ...randomBoxes];

      allBoxes.forEach((box) => {
        const [iconDef, iconCol] = box.querySelectorAll("img");

        gsap.to(iconDef, {
          opacity: 0,
          scale: 0.95,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(iconCol, {
          opacity: 1,
          scale: 1.05,
          duration: 0.3,
          ease: "power2.out",
        });

        gsap.to(box, {
          scale: 1.05,
          backgroundColor: "white",
          boxShadow: "0px 3px 10px 1px #d0d8e2",
          border: "1px solid transparent",
          duration: 0.4,
          ease: "power2.out",
        });
      });

      elem._randomBoxes = randomBoxes;
    };

    const onHoverOut = () => {
      const randomBoxes = elem._randomBoxes || [];
      const allBoxes = [elem, ...randomBoxes];

      allBoxes.forEach((box) => {
        const [iconDef, iconCol] = box.querySelectorAll("img");

        gsap.to(iconDef, {
          opacity: 1,
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(iconCol, {
          opacity: 0,
          scale: 1,
          duration: 0.3,
          ease: "power2.inOut",
        });

        gsap.to(box, {
          scale: 1,
          backgroundColor: "#f6f9fd",
          boxShadow: "0px 3px 10px 1px transparent",
          border: "1px solid #e0e0e0",
          duration: 0.4,
          ease: "power2.inOut",
        });
      });

      elem._randomBoxes = null;
    };

    elem.addEventListener("mouseenter", onHover);
    elem.addEventListener("mouseleave", onHoverOut);
  });
};

document.addEventListener("DOMContentLoaded", () => {
  const paths = [
    { id: "path1", element: null, length: 0 },
    { id: "path2", element: null, length: 0 },
    { id: "path3", element: null, length: 0 },
    { id: "path4", element: null, length: 0 },
    { id: "path5", element: null, length: 0 },
  ];

  const boxes = [
    [document.getElementById("box1"), document.getElementById("box2")],
    [document.getElementById("box3"), document.getElementById("box4")],
    [document.getElementById("box5"), document.getElementById("box6")],
    [document.getElementById("box7")],
    [document.getElementById("box8"), document.getElementById("box9")],
  ];

  const timelines = paths.map((pathObj) => {
    const path = document.getElementById(pathObj.id);
    pathObj.element = path;
    pathObj.length = path.getTotalLength();

    gsap.set(path, {
      strokeDasharray: pathObj.length,
      strokeDashoffset: pathObj.length,
    });

    return gsap.timeline({ defaults: { ease: "power2.out" } });
  });

  timelines.forEach((tl, i) => {
    const group = boxes[i];
    const path = paths[i].element;
    const pathLength = paths[i].length;

    group.forEach((box) => {
      const img = box.querySelectorAll("img")[1]; // colored image
      tl.fromTo(
        img,
        { scale: 0.5, opacity: 0 },
        { scale: 1.05, opacity: 1, duration: 0.6 }
      );
      tl.fromTo(
        box,
        { backgroundColor: "#f6f9fd" },
        {
          scale: 1.05,
          opacity: 1,
          duration: 0.5,
          backgroundColor: "white",
          boxShadow: "0px 3px 10px 1px #d0d8e2",
          border: "1px solid transparent",
        }
      );
    });

    tl.to(path, { strokeDashoffset: 0, duration: 0.6 });

    tl.to(path, { strokeDashoffset: pathLength, duration: 0, delay: 0.3 });

    tl.set(
      group.map((box) => box.querySelectorAll("img")[1]),
      { opacity: 0, scale: 0.5 }
    );

    tl.set(group, {
      backgroundColor: "#f6f9fd",
      scale: 1,
      boxShadow: "0px 3px 10px 1px transparent",
      border: "1px solid #e0e0e0",
    });
  });

  const master = gsap.timeline({ repeat: -1 });
  master
    .add(timelines[0])
    .add(timelines[1])
    .add(timelines[2])
    .add(gsap.timeline().add(timelines[3], 0).add(timelines[4], 0));

  FirstAnimations();
});
