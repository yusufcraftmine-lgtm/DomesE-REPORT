const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

menuBtn.addEventListener('click', () => {
    menuBtn.classList.toggle('active');
    mobileMenu.classList.toggle('hidden');
});

mobileMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
        menuBtn.classList.remove('active');
        mobileMenu.classList.add('hidden');
    });
});


const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');


let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});


function updateCursor() {
    dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
    ring.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;

    requestAnimationFrame(updateCursor);
}

updateCursor();

AOS.init();


const foter = document.getElementById("footer")

const getData = async () => {
    try {
        const res = await fetch('./domain-data.json');
        const data = await res.json();
        console.log("Data Domain Expansion:", data);

        const dataMap = data.map((items) => {
            return `
<div style="background-color: black;">
    <div tabindex="0" class="domain-card" style="width: 1200px; height: 580px; padding: 20px; border-radius: 16px; background: rgba(255, 255, 255, 0.2); backdrop-filter: blur(15px); -webkit-backdrop-filter: blur(15px); border: 1px solid rgba(255, 255, 255, 0.3); box-shadow: 0 8px 32px 0 rgba(0, 0, 0, 0.1);" data-aos="fade-up" data-aos-delay="95" data-aos-duration="250">
        <img src="${items.image}" alt="${items.name}" style="width: 560px; border-radius: 24px; border: 6px solid; border-color: white;">
        <div>
            <span style="font-size: x-large; font-weight: 800; letter-spacing: 3px;">
                Domain <span style="color:rgb(199, 88, 88);">Expansion</span> :
            </span> 
            ${items.name}
        </div>

        <div>
            <span style="font-size: x-large; font-weight: 800; letter-spacing: 3px;">
                Domain <span style="color: rgb(199, 88, 88);">User</span> :
            </span> 
            ${items.user}
        </div>
        <div>
            <div style="font-size: xx-large; font-weight: 800;">De<span style="color: rgb(199, 88, 88);">script</span>ion</div>
            <div style="font-size: larger; color: rgb(190, 190, 190);">"<i>${items.description}</i>"</div>
        </div>
    </div>
</div>
            `
        })

        foter.innerHTML = dataMap.join("")
    } catch (error) {
        console.error("Gagal memuat data lokal:", error);
    }
}

getData();