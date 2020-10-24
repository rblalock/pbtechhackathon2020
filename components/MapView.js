import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.MAPS_KEY;

const MapView = () => {
	const mapContainer = useRef();

	const loadMap = async () => {
		const nav = new mapboxgl.NavigationControl();
		// ref. https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
		const MapboxDirections = (await import('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions')).default
		const directions = new MapboxDirections({
			accessToken: process.env.MAPS_KEY,
			unit: 'imperial',
			profile: 'mapbox/driving',
			congestion: true,
		});
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/dark-v10',
			antialias: true,
			center: [-80.1, 26.7],
			zoom: 13,
			pitch: 45,
		});
		map.addControl(nav, 'top-left');
		map.addControl(directions, 'top-right');

		map.once('load', () => {
			directions.setOrigin('500 N US-1, Tequesta, FL 33469');
			directions.addWaypoint(0, [-80.1, 26.7]);
			directions.addWaypoint(1, [-80.11, 26.71]);
			directions.setDestination('500 N US-1, Tequesta, FL 33469');
		});
	};

	useEffect(() => {
		loadMap();
	}, []);

	return (
		<div className="w-full h-screen">
			<div
				className="w-full h-full" ref={mapContainer}
			/>
		</div>
	);
};

export default MapView;

