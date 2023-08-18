import { useEffect, useRef, useState } from 'react';
import { createChart } from 'lightweight-charts';
import axios from 'axios';
import PropagateLoader from 'react-spinners/PropagateLoader';
import { demoData } from './demodata';
import { useSelector } from 'react-redux';

export default function RealtimeEmulation({
	kline,
	time,
	isLoading,
	setIsLoading,
}: any) {
	const { symbol } = useSelector((state: any) => state.trade);
	useEffect(() => {
		const chartContainer = document.createElement('div');
		chartContainer.id = 'chart-container';
		document.getElementById('wrapper')?.appendChild(chartContainer);

		const handleResize = () => {
			if (chartContainer && chart) {
				chart.applyOptions({ width: chartContainer.clientWidth });
			}
		};

		const chart = createChart(chartContainer, {
			width: chartContainer.clientWidth,
			height: 280,
			timeScale: {
				timeVisible: true,
				secondsVisible: false,
			},
			rightPriceScale: {
				scaleMargins: {
					top: 0.3,
					bottom: 0.25,
				},
				borderVisible: false,
			},
			layout: {
				background: {
					color: 'rgba(19, 23, 34, 0.9)',
				},
				textColor: '#d1d4dc',
			},
			grid: {
				vertLines: {
					color: 'rgba(42, 46, 57, 0)',
				},
				horzLines: {
					color: 'rgba(42, 46, 57, 0.6)',
				},
			},
		});

		const areaSeries = chart.addAreaSeries({
			topColor: 'rgba(38,198,218, 0.56)',
			bottomColor: 'rgba(38,198,218, 0.04)',
			lineColor: 'rgba(38,198,218, 1)',
			lineWidth: 2,
		});

		const volumeSeries = chart.addHistogramSeries({
			color: '#26a69a',
			priceFormat: {
				type: 'volume',
			},

			priceScaleId: '',
		});

		chart.priceScale('').applyOptions({
			scaleMargins: {
				top: 0.8,
				bottom: 0,
			},
		});

		async function getNewData() {
			try {
				const response = await fetch(
					`https://api.binance.com/api/v3/klines?symbol=${symbol}&interval=${time}`
				);

				if (!response.ok) {
					throw new Error('Failed to fetch data');
				}

				const data = await response.json();
				setIsLoading(false);
				return data.map((d: any) => ({
					time: d[0] / 1000,
					open: parseFloat(d[1]),
					high: parseFloat(d[2]),
					low: parseFloat(d[3]),
					close: parseFloat(d[4]),
					value: parseFloat(d[5]),
				}));
			} catch (error) {
				console.error('Fetch error:', error);
				setIsLoading(false);
				return demoData.map((d: any) => ({
					time: d[0] / 1000,
					open: parseFloat(d[1]),
					high: parseFloat(d[2]),
					low: parseFloat(d[3]),
					close: parseFloat(d[4]),
					value: parseFloat(d[5]),
				}));
			}
		}

		const candleSeries = chart.addCandlestickSeries();

		async function updateData() {
			try {
				const newData = await getNewData();

				if (kline) {
					candleSeries.setData(
						newData.map((d: any) => ({
							time: d.time,
							open: d.open,
							high: d.high,
							low: d.low,
							close: d.close,
						}))
					);
				} else {
					areaSeries.setData(
						newData.map((d: any) => ({
							time: d.time,
							value: d.close,
						}))
					);
				}

				volumeSeries.setData(
					newData.map((d: any) => ({
						time: d.time,
						value: d.value,
						color: d.open - d.close > 0 ? '#26a69a' : '#ef5350',
					}))
				);
			} catch (error) {
				console.error('Update data error:', error);
				// Fallback to demo data
				const newData = await getNewData();

				candleSeries.setData(
					newData.map((d: any) => ({
						time: d.time,
						open: d.open,
						high: d.high,
						low: d.low,
						close: d.close,
					}))
				);

				volumeSeries.setData(
					newData.map((d: any) => ({
						time: d.time,
						value: d.value,
						color: d.open - d.close > 0 ? '#26a69a' : '#ef5350',
					}))
				);
			}
		}

		const intervalId = setInterval(updateData, 1000);

		window.addEventListener('resize', handleResize);

		return () => {
			clearInterval(intervalId);
			const wrapper = document.getElementById('wrapper');
			if (wrapper && chartContainer.parentNode === wrapper) {
				wrapper.removeChild(chartContainer);
			}
		};
	}, [kline, time, symbol]);

	return (
		<>
			<div className='relative' id='wrapper'>
				{isLoading ? (
					<div className=' absolute top-[49%] left-[46%] '>
						<PropagateLoader color='#F3CA63' size={18} />
					</div> // Display loading indicator
				) : null}
			</div>
		</>
	);
}
