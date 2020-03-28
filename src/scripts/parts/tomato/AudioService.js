function AudioService(bool){
    const _this = this;
    this.audio = undefined;
    this.bool = bool;

    this.setAudioBool = function (bool) {
        _this.stopNowAudio();
        _this.bool = bool;
    }

    this.stopNowAudio = function () {
        if (_this.audio) {
            _this.audio.pause();
        }
    }

    this.playAudio = function (name) {
        if (!_this.bool) {
            return;
        }
        const allowedName = ['alarm'];
        if (allowedName.indexOf(name) == -1) {
            throw Error(`${name} is not allowed for audio player`);
        }
        _this.stopNowAudio();
        _this.aduio = new Audio(`./sounds/${name}.mp3`);
        _this.aduio.play();
    }
}

export default AudioService;