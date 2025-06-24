import {
	modified_ahorcado,
	original_ahorcado,
} from "@/constants/games/ahorcado";
import { modified_wordle, original_wordle } from "@/constants/games/wordle";
import { original_blackjack } from "./games/blackjack";
import { modified_triqui, original_triqui } from "./games/tresEnRaya";

export interface Dependencie {
	packageName: string;
	text: string;
}

export interface BaseGame {
	id: string;
	title: string;
	icon: `#${string}`;
	color?: `#${string}`;
	description: string;
	originalCode: string;
	dependencies: Dependencie[];
	imageUrl: string;
}

export type Game = BaseGame & ({ modifiedCode: string } | { videoUrl: string });

export type Games = Game[];

export const GAMES: Games = [
	{
		id: "wordle",
		title: "Wordle",
		icon: "#wordle",
		description: `Wordle es un juego en Python donde el jugador tiene seis intentos para adivinar una palabra secreta de cinco letras. La palabra objetivo se obtiene dinámicamente usando fetching desde una API de palabras aleatorias. Cada intento del jugador se evalúa letra por letra, marcando coincidencias exactas y parciales. Se utiliza colorizado en la terminal para mostrar el resultado: verde para letras en la posición correcta, amarillo para letras presentes pero mal ubicadas, y gris para letras incorrectas. El juego muestra una cuadrícula con retroalimentación visual tras cada intento, facilitando la deducción. Finaliza al acertar la palabra o agotar los intentos, mostrando un mensaje de éxito o la palabra correcta.`,
		modifiedCode: modified_wordle,
		originalCode: original_wordle,
		dependencies: [
			{
				packageName: "requests",
				text: "requests",
			},
			{ packageName: "simple_colors", text: "simple_colors" },
			{ packageName: "unidecode", text: "unidecode" },
		],
		imageUrl: "/images/wordle.webp",
	},
	{
		id: "ahorcado",
		title: "Ahorcado",
		icon: "#ahorcado",
		description:
			"Ahorcado es un juego en Python donde el jugador adivina una palabra letra por letra, con un límite de intentos antes de que se complete el dibujo del ahorcado, usando fetching para obtener una palabra aleatoria desde una API. El juego evalúa cada letra ingresada y muestra el progreso actual con guiones bajos y letras acertadas. Incluye control de errores, conteo de intentos y verificación automática de victoria o derrota.",
		modifiedCode: modified_ahorcado,
		originalCode: original_ahorcado,
		dependencies: [
			{
				packageName: "requests",
				text: "requests",
			},
		],
		imageUrl: "/images/ahorcado.webp",
	},
	{
		id: "blackjack",
		title: "BlackJack",
		icon: "#blackjack",
		description:
			"Blackjack es un juego en Python en el que el jugador compite contra el crupier para alcanzar un valor de 21 sin pasarse, usando valores fijos para las cartas y reglas clásicas de puntuación. El juego simula una baraja, reparte cartas al jugador y al crupier, y permite decidir si pedir otra carta o quedarse. Evalúa el resultado final comparando manos y determina el ganador al instante.",
		originalCode: original_blackjack,
		dependencies: [
			{
				packageName: "simple_colors",
				text: "simple_colors",
			},
		],
		videoUrl: "/videos/blackjack.mp4",
		imageUrl: "/images/blackjack.webp",
	},
	{
		id: "triqui",
		title: "Triqui (Tres en raya)",
		icon: "#triqui",
		description:
			"Triqui es un juego en Python donde dos jugadores se turnan para marcar espacios en una cuadrícula de 3x3, buscando alinear tres símbolos iguales en línea recta para ganar. El tablero se representa como una matriz y se actualiza tras cada jugada, mostrando el estado actual. Verifica automáticamente combinaciones ganadoras o empate tras cada turno.",
		modifiedCode: modified_triqui,
		originalCode: original_triqui,
		dependencies: [],
		imageUrl: "/images/triqui.webp",
	},
];
