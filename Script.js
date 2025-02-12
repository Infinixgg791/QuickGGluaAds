document.getElementById('adForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const adContainer = document.createElement('div');
        adContainer.classList.add('ad');

        adContainer.innerHTML = `
            <h2>${title}</h2>
            <img src="${reader.result}" alt="${title}">
            <p>${description}</p>
        `;

        document.getElementById('adsContainer').appendChild(adContainer);
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    // Очистка формы
    this.reset();
});
