'use strict';

const target = document.getElementById('target');
const sliderItems = document.querySelectorAll('#target .slider-data .slider-item');

const sliderShow = document.createElement('div');
const mainContainer = document.createElement('div');
const extraContainer = document.createElement('div');

sliderShow.classList.add('col-12', 'd-flex', 'flex-nowrap', 'overflow-hidden');
mainContainer.classList.add('main', 'full-width');
extraContainer.classList.add('extra', 'full-width');

mainContainer.append(sliderItems[0]);

sliderShow.append(mainContainer);
sliderShow.append(extraContainer);
target.append(sliderShow);

const controls = document.createElement('div');
controls.classList.add('offset-5', 'mt-2');

const leftBtn = document.createElement('button');
leftBtn.classList.add('btn', 'btn-light');
leftBtn.innerHTML = '<';

const rightBtn = document.createElement('button');
rightBtn.classList.add('btn', 'btn-light');
rightBtn.innerHTML = '>';

controls.append(leftBtn);
controls.append(rightBtn);
target.append(controls);

mainContainer.setAttribute('data-index', '0');

function slideJump(steps, animationType) {
  let index = parseInt(mainContainer.getAttribute('data-index'));
  let currentElement = sliderItems.item(index);

  index += steps;
  console.log(index);

  if (index < 0) index = sliderItems.length - 1;
  else if (index >= sliderItems.length) index = 0;

  let nextElement = sliderItems.item(index);

  mainContainer.setAttribute('data-index', index.toString());
  animateMain(currentElement, nextElement, animationType);
}

function animateMain(currentElement, nextElement, animationType) {
  extraContainer.innerHTML = '';
  extraContainer.append(currentElement);

  mainContainer.innerHTML = '';
  mainContainer.append(nextElement);

  mainContainer.classList.add('expand-animation');
  extraContainer.classList.add('deplete-animation');

  if (animationType === 'right') {
    sliderShow.innerHTML = '';
    sliderShow.append(extraContainer);
    sliderShow.append(mainContainer);
  } else if (animationType === 'left') {
    sliderShow.innerHTML = '';
    sliderShow.append(mainContainer);
    sliderShow.append(extraContainer);
  }
}

leftBtn.addEventListener('click', function () {
  slideJump(-1, 'left');
});

rightBtn.addEventListener('click', function () {
  slideJump(+1, 'right');
});
