import View from './View';
import Service from './Service';
import {
    WORKING,
    RESTING,
    ON,
    OFF,
    WORKING_DEAFULT_SECONDS,
    RESTING_DEAFULT_SECONDS,
} from './constants';

const DEBUG_SECONDS = 10;

function Tomato(params) {
    const {
        stage,
        countDownRemainSeconds,
        countDownStatus,
        soundStatus
    } = params;

    this.stage = stage;
    this.countDownRemainSeconds = countDownRemainSeconds;
    this.countDownStatus = countDownStatus;
    this.soundStatus = soundStatus;
    this.service = new Service(this);
    this.view = new View(this);
    this.view.$playButon.click(this.service.toggleCountDownStatus);
    this.view.$sounds.click(this.service.toggleSounds);
    this.view.$skipButton.click(this.service.skipStage);
}

function init() {
    return new Tomato({
        stage: WORKING,
        countDownRemainSeconds: DEBUG_SECONDS,
        countDownStatus: OFF,
        soundStatus: ON
    });
}

export {
    init
};