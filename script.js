let slider = document.querySelector('.slider .list');
let items = document.querySelectorAll('.slider .list .item');
let next = document.getElementById('next');
let prev = document.getElementById('prev');
let dots = document.querySelectorAll('.slider .dots li');

let lengthItems = items.length;
let active = 1; 


let firstClone = items[0].cloneNode(true);
let lastClone = items[lengthItems - 1].cloneNode(true);

slider.appendChild(firstClone);
slider.insertBefore(lastClone, items[0]);


items = document.querySelectorAll('.slider .list .item');
let totalItems = items.length;


slider.style.left = -items[active].offsetLeft + 'px';

next.onclick = function () {
    active++;
    transitionSlide();
};

prev.onclick = function () {
    active--;
    transitionSlide();
};

let refreshInterval = setInterval(() => { next.click() }, 3000);

function transitionSlide() {
    slider.style.transition = '0.5s';
    slider.style.left = -items[active].offsetLeft + 'px';

    clearInterval(refreshInterval);
    refreshInterval = setInterval(() => { next.click() }, 3000);

    
    slider.addEventListener('transitionend', () => {
        if (active === totalItems - 1) {
            active = 1;
            slider.style.transition = 'none';
            slider.style.left = -items[active].offsetLeft + 'px';
        } else if (active === 0) {
            active = lengthItems;
            slider.style.transition = 'none';
            slider.style.left = -items[active].offsetLeft + 'px';
        }
    });

  
    updateDots();
}

function updateDots() {
    document.querySelector('.slider .dots li.active').classList.remove('active');
    let dotIndex = (active - 1 + lengthItems) % lengthItems;
    dots[dotIndex].classList.add('active');
}

dots.forEach((li, key) => {
    li.addEventListener('click', () => {
        active = key + 1; 
        transitionSlide();
    });
});

window.onresize = function () {
    slider.style.left = -items[active].offsetLeft + 'px';
};
