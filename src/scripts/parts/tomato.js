import $ from 'jquery';

const WORKING = 'working';
const RESTING = 'resting';
const ON = 'on';
const OFF = 'off';
const WORKING_DEAFULT_SECONDS = 25 * 60;
const RESTING_DEAFULT_SECONDS = 5 * 60;

function formatCounDownString(remainSeconds) {
    if (remainSeconds < 0) {
        throw Error('remain seconds need greater zero!');
    }
    let minutes = Math.floor(remainSeconds / 60);
    let seconds = Math.floor(remainSeconds % 60);
    minutes = ("0" + minutes).substr(-2);
    seconds = ("0" + seconds).substr(-2);
    return `${minutes}:${seconds}`;
}

function View(context) {
    this._this = this;
    this.$tomato = $('#tomato');
    this.$timer = $('#timer');
    this.$todolist = $('#tomato-preview_todolist');
    this.$notification = $('#tomato-notification');
    this.$playButon = $('#tomato-play_button');
    this.$skipButton = $('#tomato-skip_button');
    this.$workingArea = $('#tomato-working_arae');
    this.restingArea = $('#tomato-resting_area');

    this.update = function () {
        this.$tomato.removeClass(`${WORKING} ${RESTING}`).addClass(context.stage);
        this.$playButon.removeClass(`${ON} ${OFF}`).addClass(context.countDownStatus);
        this.$notification.removeClass(`${ON} ${OFF}`).addClass(context.notificationStatus);
        this.$timer.text(formatCounDownString(context.countDownRemainSeconds));
    }
}

function Service(context) {
    const _this = this;
    this.wrapperFunc = function (func) {
        return function (...args) {
            func(...args)
            context.view.update();
        }
    }

    this.toggleNotification = this.wrapperFunc(function () {
        context.notificationStatus = (context.notificationStatus == ON) ? OFF : ON;
    });

    this.startCountdown = this.wrapperFunc(function () {
        context.countDownRemainSeconds -= 1;
        if (context.countDownRemainSeconds <= 0) {
            _this.stopCounDown(_this.countDownId);
            _this.skipStage();
        }
    });

    this.stopCounDown = this.wrapperFunc(function () {
        if (!_this.countDownId) {
            return;
        }
        clearInterval(_this.countDownId);
    });

    this.toggleCountDownStatus = this.wrapperFunc(function () {
        context.countDownStatus = (context.countDownStatus == ON) ? OFF : ON;
        if (context.countDownStatus == ON) {
            _this.countDownId = setInterval(_this.startCountdown, 1000);
        } else {
            _this.stopCounDown();
        }
    });

    this.skipStage = this.wrapperFunc(function () {
        _this.stopCounDown();
        context.stage = (context.stage == WORKING) ? RESTING : WORKING;
        context.countDownStatus = OFF;
        context.countDownRemainSeconds = (context.stage == WORKING) ? WORKING_DEAFULT_SECONDS : RESTING_DEAFULT_SECONDS;
    });
}

function Tomato(params) {
    const {
        stage,
        countDownRemainSeconds,
        countDownStatus,
        notificationStatus,
    } = params;

    this.stage = stage;
    this.countDownRemainSeconds = countDownRemainSeconds;
    this.countDownStatus = countDownStatus;
    this.notificationStatus = notificationStatus;
    this.service = new Service(this);
    this.view = new View(this);
    this.view.update();
    this.view.$playButon.click(this.service.toggleCountDownStatus);
    this.view.$notification.click(this.service.toggleNotification);
    this.view.$skipButton.click(this.service.skipStage);
}

function init() {
    const tomato = new Tomato({
        stage: WORKING,
        countDownRemainSeconds: WORKING_DEAFULT_SECONDS,
        countDownStatus: OFF,
        notificationStatus: OFF
    });
}

export {
    init
};