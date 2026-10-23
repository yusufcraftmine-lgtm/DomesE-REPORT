// NAVIGATION MOBILE MENU TOGGLE
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');

if (menuBtn && mobileMenu) {
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
}

// CUSTOM CURSOR ANIMATION (DIPERBAIKI)
const dot = document.getElementById('cursorDot');
const ring = document.getElementById('cursorRing');

let mouseX = 0;
let mouseY = 0;

window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
});

function updateCursor() {
    if (dot && ring) {
        dot.style.transform = `translate(${mouseX - 4}px, ${mouseY - 4}px)`;
        ring.style.transform = `translate(${mouseX - 20}px, ${mouseY - 20}px)`;
    }
    requestAnimationFrame(updateCursor);
}
updateCursor();

// INITIALIZE AOS (Animate On Scroll)
AOS.init({
    once: true
});

// FETCH DOMAIN DATA JSON & RENDER RESPONSIF
const foter = document.getElementById("footer");

const getData = async () => {
    try {
        const res = await fetch('./domain-data.json');
        const data = await res.json();

        const dataMap = data.map((items) => {
            return `
            <div class="domain-card-wrapper">
                <div tabindex="0" class="domain-card" data-aos="fade-up" data-aos-delay="95" data-aos-duration="250">
                    <img src="${items.image}" alt="${items.name}" class="domain-card-img">
                    
                    <div class="domain-card-info">
                        <div>
                            <span class="text-xl sm:text-2xl font-extrabold tracking-wider">
                                Domain <span style="color:rgb(199, 88, 88);">Expansion</span> :
                            </span> 
                            <span class="text-lg sm:text-xl font-bold">${items.name}</span>
                        </div>

                        <div>
                            <span class="text-xl sm:text-2xl font-extrabold tracking-wider">
                                Domain <span style="color: rgb(199, 88, 88);">User</span> :
                            </span> 
                            <span class="text-lg sm:text-xl font-bold">${items.user}</span>
                        </div>

                        <div>
                            <div class="text-2xl font-extrabold">De<span style="color: rgb(199, 88, 88);">script</span>ion</div>
                            <div class="text-sm sm:text-base text-gray-300 mt-1">"<i>${items.description}</i>"</div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        });

        foter.innerHTML = dataMap.join("");
    } catch (error) {
        console.error("Gagal memuat data lokal:", error);
    }
};

getData();