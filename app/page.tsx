'use client';

import { Button } from "@/components/ui/button";
import { BookOpen, BookOpenCheck, BookOpenIcon, BookOpenText, ClipboardPaste, CornerRightDown, Edit, FastForward, Loader2, Mail, Pause, Pickaxe, Play, Repeat, Repeat1, SkipForward, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Textarea } from "@/components/ui/textarea"
import {
	AlertDialog,
	AlertDialogAction,
	AlertDialogCancel,
	AlertDialogContent,
	AlertDialogDescription,
	AlertDialogFooter,
	AlertDialogHeader,
	AlertDialogTitle,
	AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import {
	Select,
	SelectContent,
	SelectGroup,
	SelectItem,
	SelectLabel,
	SelectTrigger,
	SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"
import { useHotkeys } from 'react-hotkeys-hook';
import { Key } from 'ts-key-enum'
import { Moon, Sun } from "lucide-react"
import { useTheme } from "next-themes"
import Footer from "@/components/footer";
import { useToast } from "@/components/ui/use-toast"
import { sendGTMEvent } from '@next/third-parties/google'
import { Montserrat, Inter, Alegreya, Playfair_Display } from "next/font/google";
import { warn } from "console";
import { NextFont } from "next/dist/compiled/@next/font";

type AudioURLInterface =  {
	[key: string]: { [key: string]: string };
}

type Voice = {
    name: string,
    identifer: string
}

let AudioURLDict: AudioURLInterface = {
	"ADHD Reader helps folks with internet brain (low-attention spans) read large amounts of text without getting distracted.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/1.mp3" },
	"The Pasted text gets converted into sentences that can be played as text-to-speech audio clips with a highlighter focusing on each word.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/2.mp3" },
	"Try it, click or tap on any sentence here to play TTS!":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/3.mp3" },
	"Why does ADHD Reader work?":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/4.mp3" },
	"Reading Comprehension is best achieved when the learner is fully experiencing Flow.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/5.mp3" },
	"Flow is the mental state in which an individual is fully absorbed, focused, and enjoys the process of an activity, often leading to a distortion in one's sense of time.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/6.mp3" },
	"But it is not always easy for the internet brain to get through all of the text without yawning on the third line, so it's natural to turn to Text-To-Speech or TTS systems to listen and look at the text at the same time.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/7.mp3" },
	"To get into Flow, one must start first by paying attention to the activity, which in this case is Reading Text.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/8.mp3" },
	"The problem is that most TTS systems read all of the text all at once without the ability to stop and focus on the sentences and words that really matter.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/9.mp3" },
	"The mission of ADHD Reader is to let you truly interact with the text you want to read.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/10.mp3" },
	"Interacting with the text allows for a constant stream of events which keeps you focused on the material you’re trying to read and understand.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/11.mp3" },
	"And finally, you can play each sentence as a text-to-speech audio clip with a highlighter focusing on each word to really cement your attention!":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/12.mp3" },
	"Touch / Mouse Interactions.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/13.mp3" },
	"Scroll to a sentence and Tap or Click to play TTS, Hover the mouse over any word to highlight it.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/14.mp3" },
	"Keyboard Interactions.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/15.mp3" },
	"Up and Down Arrow Keys: Focus on a sentence, Space or Enter: Play focused sentence TTS, Left and Right Arrow Keys: Focus on a word, Hold Shift + Left or Right Arrow Keys: Focus on multiple words.":
		{ "Matthew": "https://quinston-com.s3-accelerate.amazonaws.com/16.mp3" },
};

const interFont = Inter({
	subsets: ["latin"],
	variable: "--font-sans",
})

const alegreyaFont = Alegreya({
	subsets: ["latin"],
	variable: "--font-sans",
})

const montserratFont = Montserrat({
	weight: ['400'],
	subsets: ["latin"]
})

const playfairDisplayFont = Playfair_Display({
	weight: ['400'],
	subsets: ["latin"]
})

const fontList = [ 
    "Montserrat", 
    "Alegreya",
    "Inter",
    "Playfair Display"
]

export default function Home() {

	const { setTheme } = useTheme()
	const { toast } = useToast()

	const [isDesktop, setIsDesktop] = useState(true);
	const [isAppReady, setIsAppReady] = useState(false);
	const [showVideo, setShowVideo] = useState(true);
	const [font, setFont] = useState('Alegreya');
	const [mode, setMode] = useState(`dark`);
	const [isFullscreen, setIsFullscreen] = useState(false);
	const [voice, setVoice] = useState(`Matthew`);
	const [speedRate, setSpeedRate] = useState(1);
	const [voices, setVoices] = useState<Voice[]>([]);
	const [text, setText] = useState(`ADHD Reader helps folks with internet brain (low-attention spans) read large amounts of text without getting distracted. The Pasted text gets converted into sentences that can be played as text-to-speech audio clips with a highlighter focusing on each word. Try it, click or tap on any sentence here to play TTS! Why does ADHD Reader work? Reading Comprehension is best achieved when the learner is fully experiencing Flow. Flow is the mental state in which an individual is fully absorbed, focused, and enjoys the process of an activity, often leading to a distortion in one's sense of time. To get into Flow, one must start first by paying attention to the activity, which in this case is Reading Text. But it is not always easy for the internet brain to get through all of the text without yawning on the third line, so it's natural to turn to Text-To-Speech or TTS systems to listen and look at the text at the same time. The problem is that most TTS systems read all of the text all at once without the ability to stop and focus on the sentences and words that really matter. The mission of ADHD Reader is to let you truly interact with the text you want to read. Interacting with the text allows for a constant stream of events which keeps you focused on the material you’re trying to read and understand. And finally, you can play each sentence as a text-to-speech audio clip with a highlighter focusing on each word to really cement your attention!`);
	const [isAudioLoading, setIsAudioLoading] = useState(false);
	const [isLicenseKeySet, setIsLicenseKeySet] = useState(false);
	const [licenseKey, setLicenseKey] = useState('');
	const [editable, setEditable] = useState(false);
	const [isPlaying, setIsPlaying] = useState(false);
	const [textAreaHeight, setTextAreaHeight] = useState(100);
	const [wordIndex, setWordIndex] = useState<number[]>([]);
	const [sentenceIndex, setSentenceIndex] = useState(-1);
	const [sentences, setSentences] = useState<string[]>([]);
	const [timeouts, setTimeouts] = useState<NodeJS.Timeout[]>([]);
	const [activateLicenseDialogOpen, setActivateLicenseDialogOpen] = useState(false);
	const [isVerifyingLicense, setIsVerifyingLicense] = useState(false);

	useHotkeys('space,enter', (event) => { event.preventDefault(); ReadSentence(); });
	useHotkeys('ctrl+v,meta+v', async (event) => {
		PasteText(event);
	});
	useHotkeys(Key.ArrowDown, (event) => { event.preventDefault(); SelectNextSentence(); });
	useHotkeys(Key.ArrowUp, (event) => { event.preventDefault(); SelectPreviousSentence(); });
	useHotkeys(Key.ArrowLeft, (event) => { event.preventDefault(); SelectPreviousWord(); });
	useHotkeys(Key.ArrowRight, (event) => { event.preventDefault(); SelectNextWord(); });
	useHotkeys('shift+ArrowRight', (event) => { event.preventDefault(); GatherNextWord(); });
	useHotkeys('shift+ArrowLeft', (event) => { event.preventDefault(); GatherPreviousWord(); });
	useHotkeys('f', (event) => { event.preventDefault(); ToggleFullscreen(); });
	useHotkeys('n', (event) => { event.preventDefault(); ReadNextSentence(); });

    const GetClassNameByFont = (tempFont: string) => {
		if (tempFont == 'Montserrat') {
			return montserratFont.className;
		} else if (tempFont == 'Inter') {
			return interFont.className;
		} else if (tempFont == 'Alegreya') {
			return alegreyaFont.className;
		} else if (tempFont == 'Playfair Display') {
			return playfairDisplayFont.className;
		}
        return interFont;
    }

	const ToggleLightOrDarkMode = () => {
		if (mode == 'light') {
			setTheme('dark');
			setMode('dark');
			localStorage.setItem('mode', 'dark');
		} else if (mode == 'dark') {
			setTheme('light');
			setMode('light');
			localStorage.setItem('mode', 'light');
		}
	}

	const SetLightDarkMode = (tempMode: string) => {
		if (tempMode == 'light' || tempMode == 'dark') {
			setTheme(tempMode);
			setMode(tempMode);
			localStorage.setItem('mode', tempMode);
		}
	}

	const ToggleFullscreen = () => {

		const element = document.querySelector('html');

		if (!isFullscreen && element != null && document.fullscreenEnabled) {
			element.requestFullscreen()
				.then(() => {
					setIsFullscreen(true);
				})
				.catch((err) => {
					console.error(`Error attempting to enable fullscreen mode: ${err.message} (${err.name})`);
				});
		} else {
			document.exitFullscreen();
			setIsFullscreen(false);
		}

	}

	const ActivateLicenseKey = async () => {

		setIsVerifyingLicense(true);

		if (licenseKey.trim() != '') {

			let LMResponse = await fetch('https://api.lemonsqueezy.com/v1/licenses/activate', {
				method: 'POST',
				headers: {
					Accept: 'application/json',
					'Content-Type': 'application/x-www-form-urlencoded',
				},
				body: new URLSearchParams({
					license_key: licenseKey,
					instance_name: 'ADHDReader'
				}),
			});

			let LMData = await LMResponse.json();

			if (LMData.activated && LMData.meta.product_id == process.env.LEMONSQUEEZY_PRODUCT_ID && LMData.meta.store_id == process.env.LEMONSQUEEZY_STORE_ID) {

				localStorage.setItem('license-key', licenseKey);
				setIsLicenseKeySet(true);
				setActivateLicenseDialogOpen(false);
				setIsVerifyingLicense(false);
				return;

			}

		}

		localStorage.removeItem('license-key');
		setIsVerifyingLicense(false);
		setIsLicenseKeySet(false);

	}

	const PasteText = async (event: any) => {

		// if (!isLicenseKeySet) {
		// 	setActivateLicenseDialogOpen(true);
		// 	sendGTMEvent({ event: 'conversion', value: { 'send_to': 'AW-763816607/t5cSCIOyyLcYEJ_Vm-wC' } });
		// 	return;
		// }

		setShowVideo(false);

		if (event != null) {
			event.preventDefault();
		}

		// if (isLicenseKeySet) {

		try {
			ProcessAndSetText(await navigator.clipboard.readText());
		} catch (e) {
			if (typeof navigator !== 'undefined' && 'permissions' in navigator) {

				const navigatorPermissionsQuery = await navigator.permissions.query({ name: 'clipboard-read' as PermissionName });
				if (navigatorPermissionsQuery.state != 'granted') {

					toast({
						title: "Please Allow Clipboard Permission",
						description: "Permission to paste text denied.",
					})

				}

			}
		}

		// } else {
		// 	setActivateLicenseDialogOpen(true);
		// }

	}


	const ProcessAndSetText = (newText: string) => {

		newText = newText.replace(/\[\d+\]/g, '').trim();
		newText = newText.replace(/(\n){2,}/g, '|+++++|').trim();
		newText = newText.replace(/[\n\s\t]+/g, ' ').trim();

		let tempSentences = newText.split(/\|\+\+\+\+\+\|/g);

		let newTempSentences: string[] = [];
		for (let i = 0; i < tempSentences.length; i++) {

			let getSentences = tempSentences[i].split(/(?<!\bi\.e)(?<!\be\.g)(?<!\bet al)(?<!\bMr)(?<!\bMrs)([\n\r]*[.?!])([\s”"]+)(?=[A-Z])/g);

			for (let sentIndex = 0; sentIndex < getSentences.length; sentIndex += 1) {
				if (getSentences[sentIndex].trim() != '') {
					newTempSentences.push(getSentences[sentIndex])
				}
			}

			getSentences = newTempSentences;
			newTempSentences = [];

			for (let sentIndex = 0; sentIndex < getSentences.length; sentIndex++) {

				if ((getSentences[sentIndex].trim() == '.'
					|| getSentences[sentIndex].trim() == '!'
					|| getSentences[sentIndex].trim() == '?'
					|| getSentences[sentIndex].trim() == '”'
					|| getSentences[sentIndex].trim() == '"') && newTempSentences.length - 1 > -1
				) {
					newTempSentences[newTempSentences.length - 1] = `${newTempSentences[newTempSentences.length - 1]}${getSentences[sentIndex].trim()}`;
				} else {
					newTempSentences = [...newTempSentences, `${getSentences[sentIndex]}`];
				}

			}

			newTempSentences.push(`\n`);

		}

		newTempSentences.pop();
		tempSentences = newTempSentences;

		newTempSentences = [];
		for (let i = 0; tempSentences != null && i < tempSentences.length; i++) {
			if (tempSentences[i].trim() == "") {

				if (i > 0 && tempSentences[i - 1].trim() == "") {
					continue;
				} else {
					newTempSentences.push(tempSentences[i].trim());
				}

			} else {
				newTempSentences.push(tempSentences[i].trim());
			}
		}

		tempSentences = newTempSentences;

		if (tempSentences != null) {
			setSentences(tempSentences);
		} else {
			setSentences([]);
		}

		setText(newText);

		setSentenceIndex(-1);
		setWordIndex([]);

		ScrollToSentence(0);

	}

	const SelectSentence = async (index: number) => {

		ClearAllTimeouts();
		const audioElement = document.querySelector('audio');
		audioElement?.pause();

		setSentenceIndex(index);
		setWordIndex([])

		ReadSentence(index);

		ScrollToSentence(index);

	}

	const SelectNextSentence = async () => {

		PauseReading();

		let sIndex = sentenceIndex;

		while (sIndex < sentences.length - 1 && sentences[++sIndex].trim() == "")

			if (sentences.length == sIndex) {
				sIndex = 0;
			}

		setSentenceIndex(sIndex);
		setWordIndex([]);

		ScrollToSentence(sIndex);

	}

	const SelectPreviousSentence = async () => {

		PauseReading();

		let sIndex = sentenceIndex;

		while (sIndex > 0 && sentences[--sIndex].trim() == "")

			if (sentences.length == sIndex) {
				sIndex = 0;
			}

		if (sIndex < 0) {
			sIndex = sentences.length - 1;
		}

		setSentenceIndex(sIndex);
		setWordIndex([]);

		ScrollToSentence(sIndex);

	}

	const SelectPreviousWord = async () => {

		if (sentenceIndex == -1) { return; }

		PauseReading();

		let wIndex = -1;
		if (wordIndex.length > 0) {
			wIndex = wordIndex[0]
		}
		--wIndex;

		if (sentences[sentenceIndex].split(' ').length == wIndex) {
			wIndex = 0;
		}

		if (wIndex < 0) {
			wIndex = sentences[sentenceIndex].split(' ').length - 1;
		}

		setWordIndex([wIndex]);

		ScrollToSentence(sentenceIndex);

	}

	const SelectNextWord = async () => {

		let sIndex = sentenceIndex;
		if (sentenceIndex == -1) {
			setSentenceIndex(0);
			sIndex = 0;
		}

		PauseReading();

		let wIndex = -1;
		if (wordIndex.length > 0) {
			wIndex = wordIndex[wordIndex.length - 1];
		}
		++wIndex;

		if (sentences[sIndex].split(' ').length == wIndex) {
			wIndex = 0;
		}

		if (wIndex < 0) {
			wIndex = sentences[sIndex].split(' ').length - 1;
		}

		setWordIndex([wIndex]);

		ScrollToSentence(sIndex);

	}

	const GatherPreviousWord = async () => {

		if (sentenceIndex == -1) { return; }

		PauseReading();

		let wIndex = sentences[sentenceIndex].split(' ').length;
		if (wordIndex.length > 0) {
			wIndex = wordIndex[0];
		}
		--wIndex;

		if (wIndex < 0) {
			return;
		}

		setWordIndex([wIndex, ...wordIndex]);

		ScrollToSentence(sentenceIndex);

	}

	const GatherNextWord = async () => {

		if (sentenceIndex == -1) { return; }

		PauseReading();

		let wIndex = -1;
		if (wordIndex.length > 0) {
			wIndex = wordIndex[wordIndex.length - 1];
		}
		++wIndex;

		if (sentences[sentenceIndex].split(' ').length == wIndex) {
			return;
		}

		setWordIndex([...wordIndex, wIndex]);

		ScrollToSentence(sentenceIndex);

	}

	const ReadNextSentence = async () => {

		let sIndex = sentenceIndex;

		while (sIndex < sentences.length - 1 && sentences[++sIndex].trim() == "")

			if (sentences.length == sIndex) {
				sIndex = 0;
			}

		setSentenceIndex(sIndex)
		ReadSentence(sIndex);

		ScrollToSentence(sIndex);

	}

	const ScrollToSentence = async (sIndex: number) => {

		let sentenceSpan = document.querySelector(`#sentence-${sIndex}`) as HTMLElement;

		if (sentenceSpan != null) {

			const divHeight = sentenceSpan.offsetHeight;
			const windowHeight = window.innerHeight;
			const scrollTop = sentenceSpan.offsetTop - ((windowHeight - divHeight) / 2);

			window.scrollTo({
				top: scrollTop,
				behavior: 'smooth',
			});

		}

	}

	const PauseReading = async (sIndex: number = -1) => {

		ClearAllTimeouts();
		const audioElement = document.querySelector('audio');
		audioElement?.pause();

	}

	const PrefetchSentenceTTS = async (sIndex: number) => {

		if (sIndex < 0 || sIndex >= sentences.length) return;
		while (sIndex < sentences.length - 1 && sentences[sIndex].trim() == "") { ++sIndex; }

		if (!(AudioURLDict.hasOwnProperty(sentences[sIndex]) &&
			AudioURLDict[sentences[sIndex]] != undefined &&
			AudioURLDict[sentences[sIndex]].hasOwnProperty(voice))) {

			const url = '/api/audio';
			const data = {
				text: sentences[sIndex],
				licenseKey: licenseKey,
				voiceId: voice
			};
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify(data)
			});

			if (response.status != 200) {
				return;
			}

			const blob = await response.blob();

			AudioURLDict[sentences[sIndex]] = {};
			AudioURLDict[sentences[sIndex]][voice] = URL.createObjectURL(blob);

		}

	}

	const ReadSentence = async (sIndex: number = -1) => {

		// if (isPlaying) {
		// 	PauseReading();
		// 	return;
		// }

		if (sIndex == -1) {

			if (sentenceIndex == -1) {
				setSentenceIndex(0);
				sIndex = 0;
			} else {
				sIndex = sentenceIndex;
			}

		}

		if (!isLicenseKeySet) {

			if (!(AudioURLDict.hasOwnProperty(sentences[sIndex]) &&
				AudioURLDict[sentences[sIndex]] != undefined &&
				AudioURLDict[sentences[sIndex]].hasOwnProperty(voice))) {

				setActivateLicenseDialogOpen(true);
				sendGTMEvent({ event: 'conversion', value: { 'send_to': 'AW-763816607/t5cSCIOyyLcYEJ_Vm-wC' } });

				return;

			}

		}

		setIsAudioLoading(true);
		setEditable(false);

		setSentenceIndex(sIndex);

		setWordIndex([]);
		ClearAllTimeouts();

		let audioUrl = null;

		if (AudioURLDict.hasOwnProperty(sentences[sIndex]) &&
			AudioURLDict[sentences[sIndex]] != undefined &&
			AudioURLDict[sentences[sIndex]].hasOwnProperty(voice)) {

			audioUrl = AudioURLDict[sentences[sIndex]][voice];

		} else {

			const url = '/api/audio';
			const data = {
				text: sentences[sIndex],
				licenseKey: licenseKey,
				voiceId: voice
			};

			let response = null;

			try {

				response = await fetch(url, {
					method: 'POST',
					headers: {
						'Content-Type': 'application/json'
					},
					body: JSON.stringify(data)
				});

			} catch (e) {
				toast({
					title: "Failed to load TTS",
					description: "Please try again.",
				})
				setIsAudioLoading(false);
				return;
			}

			if (response.status != 200) {
				toast({
					title: "Failed to load TTS",
					description: "Please try again.",
				})
				setIsAudioLoading(false);
				return;
			}

			const blob = await response.blob();
			audioUrl = URL.createObjectURL(blob);

			AudioURLDict[sentences[sIndex]] = {};
			AudioURLDict[sentences[sIndex]][voice] = audioUrl;

		}

		const audioElements = document.querySelectorAll('audio');
		for (let i = 0; i < audioElements.length; i++) {
			audioElements[i].src = "";
			audioElements[i].pause();
			audioElements[i].remove();
		}

		const audioElement = document.createElement('audio');
		audioElement.src = audioUrl;

		document.body.appendChild(audioElement);

		audioElement.addEventListener('loadedmetadata', () => {
			audioElement?.play();
			audioElement.playbackRate = speedRate;
		});

		audioElement.addEventListener('pause', () => {
			setIsPlaying(false);
			setIsAudioLoading(false);

			// Turn On Autoplay
			// ReadSentence(sIndex + 1);
			// ScrollToSentence(sIndex + 1);
		});

		audioElement.addEventListener('play', () => {

			PrefetchSentenceTTS(sIndex + 1)

			setIsAudioLoading(false);
			setIsPlaying(true);

			let tempTimeoutArray = [];

			let currentSentence = sentences[sIndex];
			let currentWords = currentSentence.split(' ');

			let totalDuration = audioElement.duration * 1000;
			let totalCharacters = currentSentence.length;
			let timePerCharacter = totalDuration / totalCharacters;

			let accumulatedDuration = 0

			for (let i = 0; i < currentWords.length; i++) {

				if (i == 0) {
					accumulatedDuration = 0;
				} else {
					accumulatedDuration += (currentWords[i - 1].length + 1) * timePerCharacter;
				}

				const looperTimeout = setTimeout(() => {
					setWordIndex([i]);
				}, accumulatedDuration * (1 / speedRate));

				tempTimeoutArray.push(looperTimeout);

			}

			setTimeouts(tempTimeoutArray);

		});

	}

	const ClearAllTimeouts = () => {
		timeouts.forEach(clearTimeout);
		setTimeouts([]);
	};

	useEffect(() => {

		let ta = document.querySelector('textarea');
		ta?.focus();

		ProcessAndSetText(text);

		let tempLicenseKey = localStorage.getItem('license-key');
		if (tempLicenseKey != undefined && tempLicenseKey.trim() != '') {
			setLicenseKey(tempLicenseKey);
			setIsLicenseKeySet(true)
		}

		let tempMode = localStorage.getItem('mode');
		if (tempMode != undefined && tempMode.trim() != '') {

			setMode(tempMode);
			SetLightDarkMode(tempMode);

		} else {

			SetLightDarkMode(window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? `dark` : `light`);

		}

		let tempVoice = localStorage.getItem('voice');
		if (tempVoice != undefined && tempVoice.trim() != '') {
			setVoice(tempVoice);
		}

		let tempSpeedRate = localStorage.getItem('speed-rate');
		if (tempSpeedRate != null) {
			if (tempSpeedRate != undefined && tempSpeedRate.trim() != '') {
				setSpeedRate(parseFloat(tempSpeedRate));
			}
		}
		
        let tempFont = localStorage.getItem('font');
		if (tempFont != null) {
			if (tempFont != undefined && tempFont.trim() != '') {
				setFont(tempFont);
			}
		}

		if (/Android|iPhone|iPad|iPod/i.test(navigator.userAgent)) {
			setIsDesktop(false);
		} else {
			setIsDesktop(true);
		}

		fetch(`/api/voices?licenseKey=${tempLicenseKey}`, {
			method: 'GET',
		})
		.then((voiceResponse) => voiceResponse.json()
		.then((jsonData) => {
			setVoices(jsonData.voices);
		})
		.catch((err) => { console.log(err); }))

		setIsAppReady(true);

	}, []);

	return (

		<>

			{

				isAppReady ? <>

					<AlertDialog open={activateLicenseDialogOpen}>
						<AlertDialogContent>
							<div className="flex flex-row items-center justify-between">
								<AlertDialogTitle> License Key Required For TTS </AlertDialogTitle>
								<AlertDialogCancel className="border-none" onClick={() => setActivateLicenseDialogOpen(false)}>
									<Button variant='ghost' className="p-0"><X className="h-4 w-4" /></Button>
								</AlertDialogCancel>
							</div>
							<Input placeholder="Enter License Key" value={licenseKey} onChange={(event) => setLicenseKey(event.target.value)} />
							<AlertDialogFooter>
								<div className="flex flex-col w-full gap-16">
									{
										!isVerifyingLicense ?
											<AlertDialogAction className="w-full" onClick={ActivateLicenseKey}> Activate License Key </AlertDialogAction>
											:
											<AlertDialogAction className="w-full" disabled> Activate License Key </AlertDialogAction>
									}
									<AlertDialogCancel className="border-none" onClick={() => window.open('https://quinston.lemonsqueezy.com/buy/233963a8-0412-4ae5-81fa-d9cdf0050e28', '_blank')}>
										{/* Don&apos;t have license key? */}
										Buy License for $10 Per Month (7-Day Free Trial)
									</AlertDialogCancel>
								</div>
							</AlertDialogFooter>
						</AlertDialogContent>
					</AlertDialog>

					<div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', boxShadow: mode == 'light' ? '0 4px 6px -1px rgba(0, 0, 0, 0.1)' : '0 4px 6px -1px rgba(0, 0, 0, 0.5)' }} className="bg-background flex flex-row gap-5 p-4 justify-center">

						<div style={{ maxWidth: 750 }} className="flex flex-row justify-between items-center w-full">

							<h4 className="scroll-m-20 text-xl font-semibold tracking-tight cursor-pointer flex flex-row items-center" onClick={() => ScrollToSentence(0)}>
								<BookOpenText className="mt-1 mr-2" /> ADHD Reader
							</h4>

							<div className="flex flex-row gap-4 justify-center items-center">

								{
									!isLicenseKeySet ?
										<Button onClick={() => {
											setActivateLicenseDialogOpen(true);
											sendGTMEvent({ event: 'conversion', value: { 'send_to': 'AW-763816607/t5cSCIOyyLcYEJ_Vm-wC' } });
										}}>Activate License</Button>
										:
										<div className="cursor-pointer" onClick={() => {
											setLicenseKey('');
											setIsLicenseKeySet(false);
											localStorage.removeItem('license-key');
											localStorage.removeItem('voice');
											localStorage.removeItem('speed-rate');
											localStorage.removeItem('font');
										}}>
											Reset License
										</div>
								}

								<Button variant="outline" size="icon" onClick={() => ToggleLightOrDarkMode()}>
									{
										mode == 'light' ? <Moon className="h-4 w-4" /> : <></>
									}
									{
										mode == 'dark' ? <Sun className="h-4 w-4" /> : <></>
									}
								</Button>

							</div>

						</div>

					</div>

					<div style={{ position: 'fixed', bottom: 0, width: '100vw' }} className="bg-background flex flex-row justify-center">

						<div style={{ maxWidth: 750, boxShadow: mode == 'light' ? '0 0 10px 5px rgba(0, 0, 0, 0.1)' : '0 0 10px 5px rgba(0, 0, 0, 0.5)' }} className="flex flex-col items-center justify-between gap-4 w-full p-4 pb-6">

							<div className="flex flex-row gap-4 w-full">

                                <Button className="hidden md:flex text p-4" onClick={() => {
                                    PasteText(null)
                                }}> <ClipboardPaste className="w-4 h-4 mr-2" /> Paste Text</Button>

								<Select value={font} onValueChange={(value) => { console.log(font); setFont(value); localStorage.setItem('font', value) }}>
									<SelectTrigger className="grow">
										<SelectValue placeholder="Select a font" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											<SelectLabel>Select Font</SelectLabel>
                                            {
                                                fontList.map(( value: string, index ) => 
											        <SelectItem key={index} value={`${value}`}>{value}</SelectItem>
                                                )
                                            }
										</SelectGroup>
									</SelectContent>
								</Select>
								
                                <Select disabled={!isLicenseKeySet} value={voice} onValueChange={(value) => { console.log(value); setVoice(value); localStorage.setItem('voice', value) }}>
									<SelectTrigger className="grow">
										<SelectValue placeholder="Select a voice" />
									</SelectTrigger>
									<SelectContent>
										<SelectGroup>
											{voices?.map((item, index) => <SelectItem key={index} value={item.identifer}>{item.name}</SelectItem> )}
										</SelectGroup>
									</SelectContent>
								</Select>

								<Button className="text p-4" onClick={() => {
									const audioElement = document.querySelector('audio');
									switch (speedRate) {
										case 0.25:
											setSpeedRate(0.5);
											localStorage.setItem('speed-rate', `${0.5}`);
											if (audioElement != null) audioElement.playbackRate = 0.5;
											break;
										case 0.5:
											setSpeedRate(0.75);
											localStorage.setItem('speed-rate', `${0.75}`);
											if (audioElement != null) audioElement.playbackRate = 0.75;
											break;
										case 0.75:
											setSpeedRate(1);
											localStorage.setItem('speed-rate', `${1}`);
											if (audioElement != null) audioElement.playbackRate = 1;
											break;
										case 1:
											setSpeedRate(1.25);
											localStorage.setItem('speed-rate', `${1.25}`);
											if (audioElement != null) audioElement.playbackRate = 1.25;
											break;
										case 1.25:
											setSpeedRate(1.5);
											localStorage.setItem('speed-rate', `${1.5}`);
											if (audioElement != null) audioElement.playbackRate = 1.5;
											break;
										case 1.5:
											setSpeedRate(1.75);
											localStorage.setItem('speed-rate', `${1.75}`);
											if (audioElement != null) audioElement.playbackRate = 1.75;
											break;
										case 1.75:
											setSpeedRate(2);
											localStorage.setItem('speed-rate', `${2}`);
											if (audioElement != null) audioElement.playbackRate = 2;
											break;
										case 2:
											setSpeedRate(0.25);
											localStorage.setItem('speed-rate', `${0.25}`);
											if (audioElement != null) audioElement.playbackRate = 0.25;
											break;
										default:
											setSpeedRate(1)
											localStorage.setItem('speed-rate', `${1}`);
											if (audioElement != null) audioElement.playbackRate = 1;
											break;
									}
								}}>
									{speedRate}x <FastForward className="w-4 h-4 ml-2" />
								</Button>

								<Button className="text p-4" onClick={() => ReadNextSentence()}>
									<SkipForward className="w-4 h-4" />
								</Button>

							</div>

                            <div className="md:hidden flex flex-row gap-4 w-full">
                                <Button className="text p-4 w-full" onClick={() => {
                                    PasteText(null)
                                }}> <ClipboardPaste className="w-4 h-4 mr-2" /> Paste Text</Button>
                            </div>

							{/* {
						!isPlaying ?
							<Button className="text p-4" onClick={() => ReadSentence()}>
								<Play className="w-4 h-4" />
							</Button>
							:
							<Button className="text p-4" onClick={() => {
								PauseReading()
							}}>
								<Pause className="w-4 h-4" />
							</Button>
					} */}

						</div>

					</div>

					<div className="flex items-center mt-28 flex-col p-4">

						<div>
							<Textarea style={{ display: 'none' }} value={text} />
						</div>

						{!isLicenseKeySet && showVideo ?
							<>
								<div className="flex justify-center w-full mb-16" style={{ maxWidth: 750 }}>
									<iframe
										className="w-full aspect-video self-stretch md:min-h-96"
										src="https://www.youtube.com/embed/RH4eB9fcwxg"
										title="Product Overview Video"
										allowFullScreen
										aria-hidden="true"
									/>
								</div>
							</> : <></>
						}

						<div className="leading-loose w-full mb-40" style={{ maxWidth: 750 }}>

							<div className="flex flex-row items-center mb-4" style={{ opacity: 0.3, position: 'relative', zIndex: -1 }}>
								<span>Click / Tap To Start</span>
								<CornerRightDown className="w-4 mt-3 ml-1" />
							</div>

							{
								sentences.map((sentence: string, sIndex) =>
									<>
										<span id={`sentence-${sIndex}`} className={`cursor-pointer ${isDesktop ? 'sentence' : ''}`} key={sIndex}
											style={{ backgroundColor: sentenceIndex == sIndex ? (mode == 'light' ? 'antiquewhite' : 'red') : 'transparent', }}
											onClick={() => SelectSentence(sIndex)}>
											{
												sentence.split(' ').map((word: string, wIndex) =>
													word.trim().length > 0 ?
														<>
															<span key={wIndex} className={`${GetClassNameByFont(font)} text-2xl ${isDesktop ? 'word' : ''}`}
																style={{ backgroundColor: sentenceIndex == sIndex && wordIndex.includes(wIndex) ? (mode == 'dark' ? '#1656ad' : 'lightblue') : 'transparent' }}>
																{word}
															</span>{sentence.split(' ').length - 1 == wIndex ? '' : ' '}
														</>
														: <></>
												)
											}
											<span>
												{
													isAudioLoading && sentenceIndex == sIndex ? <>
														<Loader2 className="mt-1 h-4 w-4 animate-spin" />
													</> : <>
														<Loader2 className="mt-1 h-4 w-4 animate-spin invisible" />
													</>
												}
											</span>
										</span><br></br>
									</>
								)
							}

						</div>

					</div>

					<Footer></Footer>

				</> : <>

					<div className="flex min-h-screen justify-center items-center">
						<Loader2 className="h-8 w-8 animate-spin opacity-50" />
					</div>

				</>

			}

		</>

	);
}
