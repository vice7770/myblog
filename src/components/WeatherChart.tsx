"use client"
import React ßfrom 'react';
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

interface Props {
  weatherStatus: {
    hot: number;
    cool: number;
    cold: number;
  };
}

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

export const WeatherChart = (props: Props) => {
  const { weatherStatus } = props;
  const data = {
    labels,
    datasets: [
      {
        label: 'Dataset 1',
        data: Object.values(weatherStatus).map((value) => value),
        backgroundColor: backgroundColors,
      },
    ],
  };
  return <Bar options={options} data={data} />;
};