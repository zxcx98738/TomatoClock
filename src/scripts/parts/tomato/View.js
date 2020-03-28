import $ from 'jquery';
import {
    WORKING,
    RESTING,
    ON,
    OFF
} from './constants';

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
    const _this = this;
    this.$tomato = $('#tomato');
    this.$timer = $('#timer');
    this.$todolist = $('#tomato-preview_todolist');
    this.$sounds = $('#tomato-sounds');
    this.$playButon = $('#tomato-play_button');
    this.$skipButton = $('#tomato-skip_button');
    this.$workingArea = $('#tomato-working_arae');
    this.restingArea = $('#tomato-resting_area');

    this.update = function () {
        this.$tomato.removeClass(`${WORKING} ${RESTING}`).addClass(context.stage);
        this.$playButon.removeClass(`${ON} ${OFF}`).addClass(context.countDownStatus);
        this.$sounds.removeClass(`${ON} ${OFF}`).addClass(context.soundStatus);
        this.$timer.text(formatCounDownString(context.countDownRemainSeconds));
    }

    this.init = function () {
        _this.update();
    }

    _this.init();
}

export default View;