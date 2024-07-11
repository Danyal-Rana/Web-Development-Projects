const main = document.querySelector('#main');
const cursor = document.querySelector('#cursor');

main.addEventListener('mousemove', (dets) => {
    gsap.to(cursor, {
        x: dets.x,
        y: dets.y,
        duration: 0.5,
        ease: "back.out"
    })
})