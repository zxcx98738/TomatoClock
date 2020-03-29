import {
    WORKING,
    RESTING,
    ON,
    OFF,
    WORKING_DEAFULT_SECONDS,
    RESTING_DEAFULT_SECONDS,
} from './modules/constants';
import NotificationService from './modules/NotificationService';
import AudioService from './modules/AudioService';

function Service(context) {
    const _this = this;
    this.notificationService = new NotificationService();
    this.audioService = new AudioService(context.soundStatus);
    this.countDownId = null;

    this.wrapperFunc = function (func) {
        return function (...args) {
            func(...args)
            context.view.update();
        }
    }

    this.toggleSounds = this.wrapperFunc(function () {
        context.soundStatus = (context.soundStatus == ON) ? OFF : ON;
        if( context.soundStatus == ON){
            _this.audioService.setAudioBool(true);
            _this.notificationService.sendNotification('已開啟音效！');
        }else{
            _this.audioService.setAudioBool(false);
            _this.notificationService.sendNotification('已關閉音效！');
        }
    });

    this.skipStage = this.wrapperFunc(function () {
        _this.stopCounDown();
        context.stage = (context.stage == WORKING) ? RESTING : WORKING;
        context.countDownStatus = OFF;
        context.countDownRemainSeconds = (context.stage == WORKING) ? WORKING_DEAFULT_SECONDS : RESTING_DEAFULT_SECONDS;
    });

    this.stageEndCb = function(){
        if(context.stage == WORKING){
            _this.notificationService.sendNotification('休息一下吧');
        }
        _this.audioService.playAudio('alarm');
    }

    this.stopCounDown = this.wrapperFunc(function () {
        if (!_this.countDownId) {
            return;
        }
        clearInterval(_this.countDownId);
    });

    this.loopCountdown = this.wrapperFunc(function () {
        context.countDownRemainSeconds -= 1;
        if (context.countDownRemainSeconds <= 0) {
            _this.stopCounDown(_this.countDownId);
            _this.stageEndCb();
            _this.skipStage();
        }
    });

    this.toggleCountDownStatus = this.wrapperFunc(function () {
        context.countDownStatus = (context.countDownStatus == ON) ? OFF : ON;
        if (context.countDownStatus == ON) {
            if(context.stage == WORKING){
                _this.notificationService.sendNotification('計時開始：加油，專心奮戰！');
            }
            _this.audioService.playAudio('alarm');
            _this.countDownId = setInterval(_this.loopCountdown, 1000);
        } else {
            _this.stopCounDown();
        }
    });
}

export default Service;