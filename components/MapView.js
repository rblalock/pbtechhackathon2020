import React, { useEffect, useRef } from 'react';
import mapboxgl from 'mapbox-gl';
mapboxgl.accessToken = process.env.MAPS_KEY;

const MapView = ({
	destinations,
	address
}) => {
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

	const getWaypoints = async (points) => {
		const asyncRes = await Promise.all(points.map(async (point) => {
			const waypoint = await getWaypoint(point);
			return waypoint;
		}));

		return asyncRes || [];
	};

	const loadMap = async () => {
		const nav = new mapboxgl.NavigationControl();
		// ref. https://github.com/mapbox/mapbox-gl-directions/blob/master/API.md
		const MapboxDirections = (await import('@mapbox/mapbox-gl-directions/dist/mapbox-gl-directions')).default;
		const geocodedWaypoints = await getWaypoints(destinations.map(dest => dest.address));

		const directions = new MapboxDirections({
			accessToken: process.env.MAPS_KEY,
			unit: 'imperial',
			profile: 'mapbox/driving',
			congestion: true,
			controls: {
				instructions: true,
				inputs: false,
				profileSwitcher: false
			}
		});
		const map = new mapboxgl.Map({
			container: mapContainer.current,
			style: 'mapbox://styles/mapbox/light-v10',
			antialias: true,
			center: geocodedWaypoints && geocodedWaypoints.length > 0 ? geocodedWaypoints[0] : [-80.1, 26.7],
			zoom: 12,
			pitch: 45,
		});
		map.addControl(nav, 'top-left');
		map.addControl(directions, 'top-right');

		// Add the stops to the route
		map.once('load', () => {
			if (directions && address) {
				directions.setOrigin(address);
				geocodedWaypoints.forEach((points, idx) => {
					directions.addWaypoint(idx, points);
				});
				directions.setDestination(address);
			}
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

