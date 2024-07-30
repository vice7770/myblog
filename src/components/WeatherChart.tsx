"use client"
import React from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';
import { color } from 'chart.js/helpers';


ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

export const options = {
  responsive: true,
  plugins: {
    legend: {
      position: 'top' as const,
    },
    title: {
      display: true,
      text: 'Chart.js Bar Chart',
      color: 'white',
    },
  },
};

const labels = ['🔥 Hot', '😎 Cool', '❄️ Cold'];
const backgroundColors = [
  'rgba(255, 50, 50, 0.8)', // Color for '🔥 Hot'
  'rgba(54, 162, 235, 0.8)', // Color for '😎 Cool'
  'rgba(0, 76, 153, 0.8)', // Color for '❄️ Cold'
];

export const data = {
  labels,
  datasets: [
    {
      label: 'Dataset 1',
      data: labels.map(() => Math.floor(Math.random() * 100)),
      backgroundColor: backgroundColors,
    },
  ],
};

export const WeatherChart = () => {
  return <Bar options={options} data={data} />;
};