class SpeechHelper {
  private readonly speech: SpeechSynthesisUtterance;
  private readonly speechSynthesis: SpeechSynthesis;

  constructor() {
    if ("speechSynthesis" in window) {
      this.speech = new SpeechSynthesisUtterance();
      this.speechSynthesis = window.speechSynthesis;
      this.speech.volume = 1;
      this.speech.rate = 1;
      this.speech.pitch = 1;
      this.speech.lang = "en-US";

      this.speechSynthesis.onvoiceschanged = () => {
        this.setVoice();
      };
    } else {
      throw new Error("Speech synthesis not supported in this browser.");
    }
  }

  private setVoice() {
    const voices = this.speechSynthesis.getVoices();
    if (voices.length > 0) {
      this.speech.voice =
        voices.find((voice) => voice.lang === "en-US") || voices[0];
    }
  }

  public speak(text: string) {
    if (!text) {
      console.error("No text provided for speech synthesis.");
      return;
    }

    this.speechSynthesis.cancel();
    this.speech.text = text;
    this.speechSynthesis.speak(this.speech);
  }
}

export default SpeechHelper;
