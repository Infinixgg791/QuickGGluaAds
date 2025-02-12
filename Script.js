let currentUser = { id: 1, name: "Admin" }; // Пример текущего пользователя (например, админ)

document.getElementById('showAddAdButton').addEventListener('click', function() {
    document.getElementById('adFormModal').style.display = 'block';
});

document.getElementById('closeModal').addEventListener('click', function() {
    document.getElementById('adFormModal').style.display = 'none';
});

document.getElementById('adForm').addEventListener('submit', function(e) {
    e.preventDefault();

    const title = document.getElementById('title').value;
    const description = document.getElementById('description').value;
    const imageFile = document.getElementById('image').files[0];
    const reader = new FileReader();

    reader.onloadend = function() {
        const adContainer = document.createElement('div');
        adContainer.classList.add('ad');

        const adId = Date.now(); // Уникальный ID для объявления

        adContainer.innerHTML = `
            <h2>${title}</h2>
            <img src="${reader.result}" alt="${title}">
            <p>${description}</p>
            <button class="edit-button" data-id="${adId}">Редактировать</button>
        `;

        document.getElementById('adsContainer').appendChild(adContainer);
        
        // Сохраняем объявление в localStorage для возможности редактирования
        const ads = JSON.parse(localStorage.getItem('ads')) || [];
        ads.push({ id: adId, title, description, image: reader.result, creatorId: currentUser.id });
        localStorage.setItem('ads', JSON.stringify(ads));

        // Привязка события редактирования
        adContainer.querySelector('.edit-button').addEventListener('click', function() {
            const adData = ads.find(ad => ad.id === adId);
            if (adData && (adData.creatorId === currentUser.id || currentUser.name === "Admin")) {
                // Логика редактирования объявления
                alert(`Редактирование объявления: ${adData.title}`);
            } else {
                alert("Вы не можете редактировать это объявление.");
            }
        });
    };

    if (imageFile) {
        reader.readAsDataURL(imageFile);
    }

    this.reset();
    document.getElementById('adFormModal').style.display = 'none';
});
