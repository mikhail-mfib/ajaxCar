document.addEventListener('DOMContentLoaded', () => {
    'use strict';

    const container = document.querySelector('.container'),
          links = document.querySelectorAll('a');

    

    const addBlocks = (arr) => {
        arr.forEach((car) => {
            const carThumbnail = document.createElement('div'),
                  name = document.createElement('h3'),
                  desc = document.createElement('p'),
                  price = document.createElement('h4'),
                  img = document.createElement('img');

            name.textContent = car.name;
            desc.textContent = car.description;
            price.innerHTML = `
            Car price: <span style='font-weight: 700'>${car.price}\$</span> 
            `;
            img.src = car.img;
            carThumbnail.dataset.category = car.category;

            carThumbnail.classList.add('car-thumbnail');

            carThumbnail.appendChild(name);
            carThumbnail.appendChild(price);
            carThumbnail.appendChild(desc);
            carThumbnail.appendChild(img);
            container.appendChild(carThumbnail);
        });
    };
    
    fetch('./cars.json')
        .then((response) => {
            if(response.status !== 200) {
                throw new Error('network status not 200');
            }
            return response.json();
        })
        .then((response) => {
            let carsArr = response[Object.keys(response)[0]];
            return carsArr;
        })
        .then(addBlocks)
        .catch(error => console.log(error));

    document.body.addEventListener('click', (evt) => {
        evt.preventDefault();
        const hiddenBlocks = container.querySelectorAll('.car-thumbnail');

        if(evt.target.tagName === 'A' && evt.target.textContent !== 'all') {
            links.forEach((link) => {
                if(evt.target == link) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            hiddenBlocks.forEach((carBlock) => {
                if(carBlock.dataset.category !== evt.target.textContent) {
                    carBlock.classList.add('hidden');
                } else {
                    carBlock.classList.remove('hidden');
                }
            });
        } else if (evt.target.textContent === 'all') {
            links.forEach((link) => {
                if(evt.target == link) {
                    link.classList.add('active');
                } else {
                    link.classList.remove('active');
                }
            });

            hiddenBlocks.forEach((carBlock) => {
                carBlock.classList.remove('hidden');
            });
        }
    });

});