import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.MAPS_KEY;

const MapView = () => {
	const mapContainer = useRef();

	const getWaypoint = async (address) => {
		// Probably should do this every time....lulz
		const MapBoxClientLib = (await import('@mapbox/mapbox-sdk')).default;
		// Ref. https://github.com/mapbox/mapbox-sdk-js/blob/main/docs/services.md#forwardgeocode
		const MapBoxGeocodeClientLib = (await import('@mapbox/mapbox-sdk/services/geocoding')).default;
		const mapboxClient = MapBoxClientLib({ accessToken: process.env.MAPS_KEY });
		const geocodeService = MapBoxGeocodeClientLib(mapboxClient);
		const coordsRequest = await geocodeService.forwardGeocode({
			query: address,
			limit: 1
		}).send();

		if (coordsRequest.body && coordsRequest.body.features && coordsRequest.body.features.length > 0) {
			return coordsRequest.body.features[0].center;
		}

		return undefined;
	};

	const loadMap = async () => {
		const nav = new mapboxgl.NavigationControl();
		// ref. https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
		const MapboxDirections = (await import('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions')).default;

		// Example of getting a waypoint from address
		const waypoint1 = await getWaypoint('1000 James L Turnage Blvd, West Palm Beach, FL 33415');
		const waypoint2 = await getWaypoint('1 S County Rd, Palm Beach, FL 33480');

		const directions = new MapboxDirections({
			accessToken: process.env.MAPS_KEY,
			unit: 'imperial',
			profile: 'mapbox/driving',
			congestion: true,
		});
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			antialias: true,
			center: [-80.1, 26.7],
			zoom: 13,
			pitch: 45,
		});
		map.addControl(nav, 'top-left');
		map.addControl(directions, 'bottom-right');

		// Add the stops to the route
		map.once('load', () => {
			directions.setOrigin('500 N US-1, Tequesta, FL 33469');
			directions.addWaypoint(0, waypoint1);
			directions.addWaypoint(1, waypoint2);
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

