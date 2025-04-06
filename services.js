const servicesData = [
    { image: 'image/Menuburger.jpg', text: 'Burger Menu all available' },
    { image: 'image/burger.jpg', text: 'Birger @ $3' },
    { image: 'image/pizza.jpg', text: 'Pizza @ $10' },
    { image: 'image/sausage.jpg', text: 'Sausage @ $1' },
    { image: 'image/beef.jpg', text: 'Roasted meat @ $10-$20' },
    { image: 'image/chicken1.jpg', text: 'Roasr Chicken @ $15' },
    { image: 'image/smokies.jpg', text: 'Smokies @$5' },
    { image: 'image/ugalisamaki.jpg', text: 'Ugali Samaki @$4' },
    { image: 'image/fish.jpg', text: 'Fish @$8' },
    { image: 'image/chipps.jpg', text: 'Chips @$7-$15' },
    { image: 'image/chapatii.jpg', text: 'Chapati @$1' },
    { image: 'image/Mandazi.jpg', text: 'Mandazi @$0.4' },
];

const servicesGrid = document.getElementById('services-grid');
const pageNumberDisplay = document.getElementById('page-number');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const modal = document.getElementById('image-modal');
const modalImg = document.getElementById('modal-image');
const closeBtn = document.querySelector('.close');

const itemsPerPage = 8;
let currentPage = 1;

function displayPage(page) {
    servicesGrid.innerHTML = '';
    pageNumberDisplay.textContent = `Page ${page}`;

    const startIndex = (page - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    const pageItems = servicesData.slice(startIndex, endIndex);

    pageItems.forEach(item => {
        const box = document.createElement('div');
        box.classList.add('service-box');
        box.setAttribute('data-image', item.image);
        box.setAttribute('tabindex', '0');

        const img = document.createElement('img');
        img.src = item.image;
        img.alt = item.text;

        const p = document.createElement('p');
        p.textContent = item.text;

        box.appendChild(img);
        box.appendChild(p);
        servicesGrid.appendChild(box);

        box.addEventListener('click', () => openModal(item.image));
        box.addEventListener('keydown', (event) => {
            if (event.key === 'Enter') openModal(item.image);
        });
    });
}

function openModal(imageSrc) {
    modal.style.display = 'block';
    modalImg.src = imageSrc;
}

function updatePaginationButtons() {
    prevPageButton.disabled = currentPage === 1;
    nextPageButton.disabled = currentPage * itemsPerPage >= servicesData.length;
}

prevPageButton.addEventListener('click', () => {
    currentPage--;
    displayPage(currentPage);
    updatePaginationButtons();
});

nextPageButton.addEventListener('click', () => {
    currentPage++;
    displayPage(currentPage);
    updatePaginationButtons();
});

closeBtn.addEventListener('click', () => {
    modal.style.display = 'none';
});

window.addEventListener('click', (event) => {
    if (event.target === modal) modal.style.display = 'none';
});

displayPage(currentPage);
updatePaginationButtons();

const menuToggle = document.querySelector('.menu-toggle');
const navUl = document.querySelector('nav ul');

menuToggle.addEventListener('click', () => {
    navUl.classList.toggle('active');
    menuToggle.classList.toggle('active');
});