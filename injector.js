const STATE = {
    IDLE: 0,
    ACTIVE: 1
}

const SELECTOR = {
    BUTTON_RACK: 'div.ytp-chrome-controls > div.ytp-left-controls',
    VIDEO: 'video.html5-main-video',
    PLAY_BUTTON: 'button.ytp-play-button'
}

const LOOP_BUTTON_CLASSNAMES = ['ytp-loop-button', 'ytp-button']

const iconPrototype = '<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" id="Capa_1" x="0px" y="0px" width="100%" height="100%" viewBox="0 0 440.982 440.983" style="enable-background:new 0 0 440.982 440.983;" xml:space="preserve"> <use class = "ytp-svg-shadow" xmlns:xlink="http://www.w3.org/1999/xlink" xlink:href = "#ytp-id-32" > </use>  <g>    <path      stroke = "null"      id = "svg_2"      d = "m321.670913,122.362945c-53.881451,-52.879159 -141.292061,-52.93194 -195.239882,-0.117223c-53.946569,52.814717 -54.001042,138.494175 -0.118964,191.375174c53.880199,52.877318 141.292687,52.930098 195.239882,0.115382c53.947195,-52.812876 54.001042,-138.494175 0.118964,-191.373333zm-97.680362,185.953465c-50.840974,0 -92.20362,-40.544371 -92.20362,-90.377577c0,-15.946601 4.3015,-31.629298 12.441165,-45.351121l-7.140365,-7.988337c-1.032485,-1.15443 -1.35682,-2.761181 -0.854039,-4.213271c0.504033,-1.452704 1.761298,-2.532872 3.29719,-2.831146l48.547466,-10.290446c1.53464,-0.298274 3.116866,0.228308 4.148098,1.382738c1.031233,1.153203 1.358072,2.758112 0.852786,4.212043l-14.263824,48.537618c-0.504033,1.452704 -1.760046,2.531645 -3.295938,2.831146c-1.535266,0.298274 -3.117492,-0.227695 -4.148725,-1.382738l-6.759053,-7.458686c-2.840743,7.186189 -4.281464,14.772532 -4.281464,22.550973c0,34.40705 28.557701,62.399371 63.66032,62.399985c35.102618,0 63.66032,-27.991708 63.66032,-62.400599c0,-32.826689 -26.160883,-60.180116 -59.557929,-62.271715c-2.306656,-0.143613 -4.102391,-2.019792 -4.102391,-4.286305l0,-19.419711c0,-1.175297 0.492763,-2.300268 1.361202,-3.111008c0.869692,-0.810126 2.039925,-1.237284 3.237708,-1.178366c23.619429,1.142155 45.66352,11.049633 62.072459,27.894124c16.465916,16.90341 25.532877,39.054229 25.532877,62.373594c0,49.834434 -41.363899,90.378804 -92.204246,90.378804z"      class ="ytp-svg-fill"      fill = "#80ff00"    />  </g></svg >';

class LoopButton {
    constructor() {
        // set initial state
        this.state = STATE.IDLE

        // query all needed DOM
        this.DOMObj = {
            'buttonRack': document.querySelector(SELECTOR.BUTTON_RACK),
            'playButton': document.querySelector(SELECTOR.PLAY_BUTTON),
            'video': document.querySelector(SELECTOR.VIDEO)
        }

        // create the loop button
        let loopButton = document.createElement('button')
        loopButton.innerHTML = iconPrototype;
        loopButton.classList.add(...LOOP_BUTTON_CLASSNAMES);
        this.DOMObj.buttonRack.insertBefore(loopButton, this.DOMObj.playButton.nextSibling);
        loopButton.addEventListener('click', this.buttonClickHandler.bind(this))

        this.DOMObj.loopButton = loopButton;
    }

    buttonClickHandler(event) {
        console.log('youtube-loop-button:', 'button clicked', this.state)
        switch (this.state) {
            case STATE.IDLE:
                this.state = STATE.ACTIVE
                this.DOMObj.loopButton.querySelector('svg path').classList.remove('ytp-svg-fill')
                this.DOMObj.video.loop = true
                break
            case STATE.ACTIVE:
                this.state = STATE.IDLE
                this.DOMObj.loopButton.querySelector('svg path').classList.add('ytp-svg-fill')
                this.DOMObj.video.loop = false
                break
        }
    }
}

let loopButton = new LoopButton()
