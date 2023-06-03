'use strict';

const batteries = [
  {
    batteryName: 'WKL-78',
    capacityAh: 2.3,
    voltage: 14.4,
    maxDraw: 3.2,
    endVoltage: 10,
  },
  {
    batteryName: 'WKL-140',
    capacityAh: 4.5,
    voltage: 14.4,
    maxDraw: 9.2,
    endVoltage: 5,
  },
  {
    batteryName: 'Wmacro-78',
    capacityAh: 2.5,
    voltage: 14.5,
    maxDraw: 10,
    endVoltage: 5,
  },
  {
    batteryName: 'Wmacro-140',
    capacityAh: 3.6,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 5,
  },
  {
    batteryName: 'IOP-E78',
    capacityAh: 6.6,
    voltage: 14.4,
    maxDraw: 10.5,
    endVoltage: 8,
  },
  {
    batteryName: 'IOP-E140',
    capacityAh: 9.9,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 10,
  },
  {
    batteryName: 'IOP-E188',
    capacityAh: 13.2,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 11,
  },
  {
    batteryName: 'RYN-C65',
    capacityAh: 4.9,
    voltage: 14.8,
    maxDraw: 4.9,
    endVoltage: 11,
  },
  {
    batteryName: 'RYN-C85',
    capacityAh: 6.3,
    voltage: 14.4,
    maxDraw: 6.3,
    endVoltage: 12,
  },
  {
    batteryName: 'RYN-C140',
    capacityAh: 9.8,
    voltage: 14.8,
    maxDraw: 10,
    endVoltage: 12,
  },
  {
    batteryName: 'RYN-C290',
    capacityAh: 19.8,
    voltage: 14.4,
    maxDraw: 14,
    endVoltage: 12,
  },
];

const cameras = [
  {
    brand: 'Cakon',
    model: 'ABC 3000M',
    powerConsumptionWh: 35.5,
  },
  {
    brand: 'Cakon',
    model: 'ABC 5000M',
    powerConsumptionWh: 37.2,
  },
  {
    brand: 'Cakon',
    model: 'ABC 7000M',
    powerConsumptionWh: 39.7,
  },
  {
    brand: 'Cakon',
    model: 'ABC 9000M',
    powerConsumptionWh: 10.9,
  },
  {
    brand: 'Cakon',
    model: 'ABC 9900M',
    powerConsumptionWh: 15.7,
  },
  {
    brand: 'Go MN',
    model: 'UIK 110C',
    powerConsumptionWh: 62.3,
  },
  {
    brand: 'Go MN',
    model: 'UIK 210C',
    powerConsumptionWh: 64.3,
  },
  {
    brand: 'Go MN',
    model: 'UIK 230C',
    powerConsumptionWh: 26.3,
  },
  {
    brand: 'Go MN',
    model: 'UIK 250C',
    powerConsumptionWh: 15.3,
  },
  {
    brand: 'Go MN',
    model: 'UIK 270C',
    powerConsumptionWh: 20.3,
  },
  {
    brand: 'VANY',
    model: 'CEV 1100P',
    powerConsumptionWh: 22,
  },
  {
    brand: 'VANY',
    model: 'CEV 1300P',
    powerConsumptionWh: 23,
  },
  {
    brand: 'VANY',
    model: 'CEV 1500P',
    powerConsumptionWh: 24,
  },
  {
    brand: 'VANY',
    model: 'CEV 1700P',
    powerConsumptionWh: 25,
  },
  {
    brand: 'VANY',
    model: 'CEV 1900P',
    powerConsumptionWh: 26,
  },
];

const brand = document.getElementById('js-brand');
const model = document.getElementById('js-model');
const power = document.getElementById('js-power');
const batteriesContainer = document.getElementById('js-batteries');

let arrangedCameras = [];
let arrangedBatteries = [];

let selectedModel = {};

let cameraPower;
let accessoryPower;
let totalConsumptionPower;

/**
 * brandの値から、modelの選択肢を生成・変更する
 * @param {string} brand
 */
function createModelFieldFromBrand(brand) {
  model.innerHTML = '';
  arrangedCameras = cameras.filter((camera) => camera.brand === brand);
  arrangedCameras.forEach((camera) => {
    const optionEl = document.createElement('option');
    optionEl.innerText = camera.model;
    model.append(optionEl);
  });
  cameraPower = arrangedCameras[0].powerConsumptionWh;
  totalConsumptionPower = accessoryPower + cameraPower;

  arrangedBatteries = arrangeBatteries(totalConsumptionPower);
  createBatteriesView(arrangedBatteries);
}

/**
 * batteryのviewを生成・変更する
 * @param {Array} arrangedBatteries
 */
function createBatteriesView(arrangedBatteries) {
  batteriesContainer.innerHTML = '';
  arrangedBatteries.forEach((battery) => {
    let estimatedTime = Math.round((battery.voltage * battery.capacityAh * 10) / totalConsumptionPower) / 10;

    const liEl = document.createElement('li');
    liEl.classList.add('py-3', 'sm:py-4');

    const divEl_1 = document.createElement('div');
    divEl_1.classList.add('flex', 'items-center', 'space-x-4');

    const divEl_2 = document.createElement('div');
    divEl_2.classList.add('flex-1', 'min-w-0');

    const pEl_1 = document.createElement('p');
    pEl_1.classList.add('text-md', 'font-medium', 'text-gray-900', 'truncate');
    pEl_1.innerText = battery.batteryName;

    const pEl_2 = document.createElement('p');
    pEl_2.classList.add('inline-flex', 'items-center', 'text-base', 'font-semibold', 'text-gray-900');
    pEl_2.innerText = `Estimate ${estimatedTime.toFixed(1)} hours`;

    divEl_2.append(pEl_1);
    divEl_1.append(divEl_2);
    divEl_1.append(pEl_2);
    liEl.append(divEl_1);

    batteriesContainer.append(liEl);
  });
}

/**
 * @param {number} totalConsumptionPower
 * @returns arranged batteries Array
 */
function arrangeBatteries(totalConsumptionPower) {
  return batteries.filter((battery) => {
    let maxConsumptionPower = battery.maxDraw * battery.endVoltage;
    return totalConsumptionPower < maxConsumptionPower;
  });
}

brand.addEventListener('change', (e) => {
  createModelFieldFromBrand(e.target.value);
});

model.addEventListener('change', (e) => {
  selectedModel = arrangedCameras.filter((camera) => camera.model === e.target.value)[0];
  cameraPower = parseFloat(selectedModel.powerConsumptionWh);
  totalConsumptionPower = accessoryPower + cameraPower;

  arrangedBatteries = arrangeBatteries(totalConsumptionPower);
  createBatteriesView(arrangedBatteries);

  //DEBUG console.log(arrangedBatteries);
});

power.addEventListener('change', (e) => {
  accessoryPower = parseFloat(e.target.value);
  totalConsumptionPower = accessoryPower + cameraPower;

  arrangedBatteries = arrangeBatteries(totalConsumptionPower);
  createBatteriesView(arrangedBatteries);

  //DEBUG console.log(arrangedBatteries);
});

/**
 * 初期化
 */
function init() {
  accessoryPower = parseFloat(document.getElementById('js-power').value);
  createModelFieldFromBrand('Cakon');
}

init();
