// Speech synthesis configuration 
const VOICE_URI = 'Google US English';
const PITCH = 1;
const RATE = 1;
const VOLUME = 1;

// Initialize speech synthesis
let synth: SpeechSynthesis | null = null;
let selectedVoice: SpeechSynthesisVoice | null = null;

export function speak(text: string) {
  if (typeof window === 'undefined') return;
  
  if (!synth) {
    synth = window.speechSynthesis;
  }
  
  if (!selectedVoice) {
    const voices = synth.getVoices();
    selectedVoice = voices.find(voice => voice.voiceURI === VOICE_URI) || voices[0];
  }

  // Cancel any ongoing speech
  synth.cancel();

  const utterance = new SpeechSynthesisUtterance(text);
  utterance.voice = selectedVoice;
  utterance.pitch = PITCH;
  utterance.rate = RATE;
  utterance.volume = VOLUME;

  synth.speak(utterance);
}