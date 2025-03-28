import { HttpLib } from "../../lib/httpLib";
import { Logger } from "../../lib/services/logger";
import { PointInsidePolygon } from "../../lib/polygons";
import type { AlertData, AlertLevel, BuiltinIcons, CustomIcons } from "../../weather-data";

export type METNorwayAlertEvent = "blowingSnow" | "forestFire" | "gale" | "ice" | "icing" | "lightning" | "polarLow" | "rain" | "rainFlood" | "snow" | "stormSurge" | "wind";

export interface METNorwayAlert {
	altitude_above_sea_level: number;
	area: string;
	awarenessResponse: string;
	awarenessSeriousness: string;
	/**
	 * @example "2; yellow; Moderate"
	 */
	awareness_level: `${number}; ${string}; ${string}`;
	/**
	 * @example "8; forest-fire"
	 */
	awareness_type: `${number}; ${string}`;
	ceiling_above_sea_level: number;
	certainty: string;
	consequences: string;
	contact: string;
	county: string[];
	description: string;
	/**
	 * Event type
	*
	* @example "forestFire"
	*/
	event: METNorwayAlertEvent;
	/**
	 * Localised event name
	 * @example "Skogbrannfare"
	*/
	eventAwarenessName: string;
	geographicDomain: string;
	id: string;
	instruction: string;
	resources: { description: string; uri: string, mimeType: string }[];
	riskMatrixColor: string;
	severity: "Extreme" | "Severe" | "Moderate" | "Minor" | "Unknown";
	status: "Actual" | "Exercise" | "System";
	title: string;
	triggerLevel: string;
	type: "Alert";
	web: string;
}

export interface METNorwayAlertFeature {
	geometry: {
		coordinates: [number, number][][];
		type: "Polygon";
	};
	properties: METNorwayAlert;
	type: "Feature";
	when: {
		interval: [
			/**
			 * ISO timestamp with timezone
			 */
			string,
			/**
			 * ISO timestamp with timezone
			 */
			string
		]
	}
}

export interface METNorwayAlertResponse {
	features: METNorwayAlertFeature[];
	lang: string;
	/**
	 * ISO timestamp with timezone
	 */
	lastChange: string;
	type: "FeatureCollection";
}

export async function GetMETNorwayAlerts(cancellable: imports.gi.Gio.Cancellable, lat: number, lon: number): Promise<AlertData[] | null>{
	const response = await HttpLib.Instance.LoadJsonSimple<METNorwayAlertResponse>({
		url: "https://api.met.no/weatherapi/metalerts/2.0/current.json",
		cancellable: cancellable,
	})

	if (response === null) {
		return null;
	}

	const result: METNorwayAlert[] = [];
	for (const feature of response.features) {
		let isInside = false;
		for (const geometry of feature.geometry.coordinates) {
			if (PointInsidePolygon([lon, lat], geometry)) {
				isInside = true;
				break;
			}
		}
		if (!isInside) {
			Logger.Debug(`Skipping alert '${feature.properties.event}' in area '${feature.properties.area}', current location is not inside area.`);
			continue;
		}

		Logger.Debug(`Adding alert '${feature.properties.event}' in area '${feature.properties.area}'!`);
		result.push(feature.properties);
	}

	return result.map(alert => ({
		title: alert.title,
		level: SeverityToLevel(alert.severity),
		description: alert.description,
		sender_name: "MET Norway",
		icon: EventToIcon(alert.event),
	}));
}

function SeverityToLevel(severity: string): AlertLevel {
	switch (severity) {
		case "Extreme":
			return "extreme";
		case "Severe":
			return "severe";
		case "Moderate":
			return "moderate";
		case "Minor":
			return "minor";
		default:
			return "unknown";
	}
}

function EventToIcon(event: METNorwayAlertEvent): BuiltinIcons | CustomIcons | undefined {
	switch (event) {
		case "blowingSnow":
			return "snow-wind-symbolic";
		case "forestFire":
			return "fire-symbolic";
		case "gale":
			return "gale-warning-symbolic";
		case "ice":
			return "snowflake-cold-symbolic";
		case "icing":
			return "snowflake-cold-symbolic";
		case "lightning":
			return "lightning-symbolic";
		case "polarLow":
			return "hurricane-symbolic";
		case "rain":
			return "raindrop-symbolic";
		case "rainFlood":
			return "flood-symbolic";
		case "snow":
			return "snowflake-cold-symbolic";
		case "stormSurge":
			return "lightning-symbolic";
		case "wind":
			return "strong-wind-symbolic";
		default:
			Logger.Info(`Unknown MET Norway event type: ${event as string}`);
			return undefined;
	}
}