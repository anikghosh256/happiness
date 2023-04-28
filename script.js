window.addEventListener('DOMContentLoaded', () => {

  const frameCount = 179;

  const images = [];
  const imageSeq = {
    frame: 1,
  };

  for (let i = 1; i < frameCount+1; i++) {
    const img = new Image();
    img.src = `/images/frames/${i}.png`;
    images.push(img);
  }

  const canvas = document.getElementById('happy-canvas');
  const ctx = canvas.getContext('2d');

  // canvas size
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;


  // render canvas with requestAnimationFrame
  function render() {
    // check if image is loaded
    if (images[imageSeq.frame]?.complete) {    
      // image scaling
      const scale = Math.min(
        canvas.width / images[imageSeq.frame].width,
        canvas.height / images[imageSeq.frame].height
      );
      // always show bottom center of image 
      const x = canvas.width / 2 - (images[imageSeq.frame].width / 2) * scale;
      const y = canvas.height - images[imageSeq.frame].height * scale;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(images[imageSeq.frame], x, y, images[imageSeq.frame].width * scale, images[imageSeq.frame].height * scale);
    } else {
      setTimeout(render, 500);
    }
  }


  // use gsap to animate the image sequence
  gsap.to(imageSeq, {
    frame: frameCount - 1,
    snap: 'frame',
    scrollTrigger: {
      trigger: '#main-wrapper',
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate: render,
    },
  });

  // render the first frame
  render(imageSeq.frame);


  // resize canvas on window resize
  window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    render(imageSeq.frame);
  });

});