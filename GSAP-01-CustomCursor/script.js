const main = document.querySelector('#main');
const cursor = document.querySelector('#cursor');
const imageDiv = document.querySelector('#image');

main.addEventListener('mousemove', (dets) => {
    gsap.to(cursor, {
        x: dets.x,
        y: dets.y,
        duration: 1,
        ease: "back.out",
        
    })
})

imageDiv.addEventListener('mouseenter', () => {
    cursor.innerHTML = "View More";
    gsap.to(cursor, {
        scale:2,
        backgroundColor: "#ffffff5c"
    })
})
imageDiv.addEventListener('mouseleave', () => {
    cursor.innerHTML = "";
    gsap.to(cursor, {
        scale:1,
        backgroundColor: "#fff"
    })
})