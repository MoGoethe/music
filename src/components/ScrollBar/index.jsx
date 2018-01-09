import React from 'react';
import PropTypes from 'prop-types';

const VERTICAL = 'vertial';
const HORIZONTAL = 'horizontal';

const styles = {
    main: {
        overflow: 'hidden',
        position: 'relative',
        boxSizing: 'border-box'
    },
    container: {
        position: 'absolute',
        top: '0',
        left: '0',
        overflow: 'scroll',
        boxSizing: 'border-box'
    },
    track: {
        vertical: {
            position: 'absolute',
            top: '0',
            right: '0'
        },
        verticalCustomize: {
            width: '10px',
            backgroundColor: '#FAFAFA',
            borderLeft: '1px solid #E8E8E8',
            transition: 'opacity 0.3s'
        },
        horizontal: {
            position: 'absolute',
            left: '0',
            bottom: '0',
        },
        horizontalCustomize: {
            height: '10px',
            backgroundColor: '#FAFAFA',
            borderTop: '1px solid #E8E8E8',
            transition: 'opacity 0.3s'
        }
    },
    handler: {
        vertical: {
            position: 'absolute',
        },
        verticalCustomize: {
            width: '100%',
            backgroundColor: '#C1C1C1',
            borderRadius: '5px',
            transition: 'opacity 0.3s'
        },
        horizontal: {
            position: 'absolute',
        },
        horizontalCustomize: {
            height: '100%',
            backgroundColor: '#C1C1C1',
            borderRadius: '5px',
            transition: 'opacity 0.3s'
        }
    },
    square: {
        position: 'absolute',
        width: '10px',
        height: '10px',
        right: 0,
        bottom: 0,
        backgroundColor: 'white'
    }
};

export default class FreeScrollbar extends React.Component {
    static displayName = 'FreeScrollbar';

    static propTypes = {
        className: PropTypes.string,
        style: PropTypes.object,
        fixed: PropTypes.bool,
        autohide: PropTypes.bool,
        timeout: PropTypes.number,
        tracksize: PropTypes.string,
        start: PropTypes.string,
        browserOffset: PropTypes.string,
        onScrollbarScroll: PropTypes.func,
        onScrollbarScrollTimeout: PropTypes.number
    };

    static defaultProps = {
        className: '',
        style: {
            width: '100%',
            height: '100%'
        },
        fixed: false,
        autohide: false,
        timeout: 2000,
        tracksize: '10px',
        start: 'top left',
        browserOffset: '17px',
        onScrollbarScroll: null,
        onScrollbarScrollTimeout: 300
    };

    el = null;
    offsetHeight = 0;
    offsetWidth = 0;
    lastScrollHeight = 0;
    lastScrollWidth = 0;
    activeHandler = null;
    lastMousePos = null;
    lastContainerScrollTop = 0;
    lastContainerScrollLeft = 0;
    handlerHider = null;

    /** All prop funcs should be built to this funcs to run */
    /** @function {Function} - prop func */
    scrollbarScrollThrottle = null;

    constructor(props) {
        super(props);
        
        this.state = {
            showVeriticalTrack: false,
            showHorizontalTrack: false,
            noselect: false,
            handlerPos: {
                top: 0,
                left: 0
            },
            hideHandler: props.autohide       
        };

        // build prop funcs
        this.scrollbarScrollThrottle = props.onScrollbarScrollTimeout > 0 ? this.throttle(props.onScrollbarScroll, props.onScrollbarScrollTimeout) : props.onScrollbarScroll;
    }

    componentDidMount() {
        document.addEventListener('mousemove', this.handleHandlerMouseMove);
        document.addEventListener('mouseup', this.handleHandlerMouseUp);
        document.addEventListener('readystatechange', this.handleReadyStateChange);

        this.prepareScrollbar();
    }

    componentWillUnmount() {
        document.removeEventListener('mousemove', this.handleHandlerMouseMove);
        document.removeEventListener('mouseup', this.handleHandlerMouseUp);
        document.removeEventListener('readystatechange', this.handleReadyStateChange);
    }

    componentDidUpdate() {
        this.updateTrackVisibilities();  
    }

    handleReadyStateChange = () => {
        if (document.readyState === 'complete') {
            this.prepareScrollbar();
        }
    }

    prepareScrollbar = () => {
        this.collectInfo();
        this.updateTrackVisibilities();  
        this.handlerContainerScroll();  
        if (this.props.start.includes('bottom')) {
            this.el.scrollTop = this.el.scrollHeight; 
        }
        if (this.props.start.includes('right')) {
            this.el.scrollLeft = this.el.scrollWidth; 
        }
    }

    collectInfo = () => {
        this.offsetWidth = this.el.offsetWidth;
        this.offsetHeight = this.el.offsetHeight;
    }

    updateTrackVisibilities = () => {
        let { el } = this;
        let { scrollHeight, scrollWidth } = el;

        if (scrollHeight === this.lastScrollHeight && scrollWidth === this.lastScrollWidth) return;
        this.setState({
            showVeriticalTrack: scrollHeight > this.offsetHeight,
            showHorizontalTrack: scrollWidth > this.offsetWidth
        });
        this.lastScrollWidth = scrollWidth;
        this.lastScrollHeight = scrollHeight;
    }

    runFunc = (funcName, ...args) => {
        if (this[funcName]) {
            this[funcName](args);
        }
    }

    throttle = (func, timeout) => {
        if (!func) return null;

        let canRun = true;
        
        return function(...args) {
        
            if (canRun) {
                canRun = false;
                func(...args);
        
                setTimeout(() => {
                    canRun = true;
                }, timeout);
            }
        };
    }

    handlerContainerScroll = e => {
        if (this.props.autohide) {
            clearTimeout(this.handlerHider);
            this.setState({hideHandler: false});
            this.handlerHider = setTimeout(() => {
                this.setState({hideHandler: true});
            }, this.props.timeout);   
        }

        var el = this.el;
        var top = el.scrollTop / (el.scrollHeight - this.offsetHeight) * (1 - this.offsetHeight / this.lastScrollHeight) * 100;
        var bottom = (1 - (el.scrollTop + this.offsetHeight) / (el.scrollHeight - this.offsetHeight) * (1 - this.offsetHeight / this.lastScrollHeight)) * 100;
        if (bottom < 0) bottom = 0;
        var left = el.scrollLeft / (el.scrollWidth - this.offsetWidth) * (1 - this.offsetWidth / this.lastScrollWidth) * 100;
        var right = (1 - (el.scrollLeft + this.offsetWidth) / (el.scrollWidth - this.offsetWidth) * (1 - this.offsetWidth / this.lastScrollWidth)) * 100;
        if (right < 0) right = 0;
        var pos = {
            top: top,
            bottom: bottom,
            left: left,
            right: right
        };
        this.setState({handlerPos: pos});
        
        this.runFunc('scrollbarScrollThrottle');
    }

    handleVerticalHandlerMouseDown = (d, e) => {
        this.lastContainerScrollTop = this.el.scrollTop;
        this.lastContainerScrollLeft = this.el.scrollLeft;

        this.activeHandler = d;
        this.lastMousePos = {
            top: e.clientY,
            left: e.clientX
        };
        this.setState({noselect: true});
    }

    handleHandlerMouseMove = e => {
        if (this.activeHandler === VERTICAL) {
            var delY = e.clientY - this.lastMousePos.top;
            this.el.scrollTop = this.lastContainerScrollTop + delY / this.offsetHeight * this.lastScrollHeight;
        }
        if (this.activeHandler === HORIZONTAL) {
            var delX = e.clientX - this.lastMousePos.left;
            this.el.scrollLeft = this.lastContainerScrollLeft + delX / this.offsetWidth * this.lastScrollWidth;
        }
    }

    handleHandlerMouseUp = () => {
        this.lastMousePos = null;
        this.activeHandler = null;
        this.setState({noselect: false});
    }

    render() {
        // Dynamic styles
        let containerStyles = {
            paddingBottom: this.props.fixed ? 0 : (this.state.showHorizontalTrack ? this.props.tracksize : 0),
            paddingBottom: this.props.fixed ? 0 : (this.state.showVeriticalTrack ? this.props.tracksize : 0),
            right: `-${this.props.browserOffset}`,
            bottom: `-${this.props.browserOffset}`
        };
        if (this.state.noselect) {
            containerStyles.MozUserSelect = 'none';
            containerStyles.WebkitUserSelect = 'none';
            containerStyles.msUserSelect = 'none';
        }
        let verticalTrackStyles = {
            bottom: this.state.showHorizontalTrack ? this.props.tracksize : '0',
            opacity: this.state.hideHandler ? 0 : 1
        };
        let horizontalTrackStyles = {
            right: this.state.showVeriticalTrack ? this.props.tracksize : '0',
            opacity: this.state.hideHandler ? 0 : 1
        };
        let verticalHandlerStyles = {
            top: this.state.handlerPos.top + '%',
            bottom: this.state.handlerPos.bottom + '%',
            opacity: this.state.hideHandler ? 0 : 1
        };
        let horizontalHandlerStyles = {
            left: this.state.handlerPos.left + '%',
            right: this.state.handlerPos.right + '%', 
            opacity: this.state.hideHandler ? 0 : 1
        };

        return (
            <div
                className={`FreeScrollbar ${this.props.className}`}
                style={{...this.props.style, ...styles.main}}
            >
                <div
                    className="FreeScrollbar-container" 
                    style={{...containerStyles, ...styles.container}} 
                    ref={container => this.el = container}
                    onScroll={this.handlerContainerScroll}
                >
                    {this.props.children}
                </div>
                {this.state.showVeriticalTrack ? 
                    <div 
                        className={`FreeScrollbar-vertical-track ${this.props.className ? this.props.className + '-vertical-track' : ''}`} 
                        style={this.props.className ? Object.assign(verticalTrackStyles, styles.track.vertical) : Object.assign(verticalTrackStyles, styles.track.vertical, styles.track.verticalCustomize)}
                    >
                        <div
                            className={`FreeScrollbar-vertical-handler ${this.props.className ? this.props.className + '-vertical-handler' : ''}`} 
                            onMouseDown={this.handleVerticalHandlerMouseDown.bind(this, VERTICAL)}
                            style={this.props.className ? Object.assign(verticalHandlerStyles, styles.handler.vertical) : Object.assign(verticalHandlerStyles, styles.handler.vertical, styles.handler.verticalCustomize)}></div>
                    </div>
                : null}
                {this.state.showHorizontalTrack ? 
                    <div 
                        className={`FreeScrollbar-horizontal-track ${this.props.className ? this.props.className + '-horizontal-track' : ''}`} 
                        style={this.props.className ? Object.assign(horizontalTrackStyles, styles.track.horizontal) : Object.assign(horizontalTrackStyles, styles.track.horizontal, styles.track.horizontalCustomize)}
                    >
                        <div
                            className={`FreeScrollbar-horizontal-handler ${this.props.className ? this.props.className + '-horizontal-handler' : ''}`} 
                            onMouseDown={this.handleVerticalHandlerMouseDown.bind(this, HORIZONTAL)}
                            style={this.props.className ? Object.assign(horizontalHandlerStyles, styles.handler.horizontal) : Object.assign(horizontalHandlerStyles, styles.handler.horizontal, styles.handler.horizontalCustomize)}></div>
                    </div> 
                : null}
                {this.state.showHorizontalTrack && this.state.showVeriticalTrack && !this.props.fixed ? 
                    <div
                        className={`FreeScrollbar-square ${this.props.className ? this.props.className + '-square' : ''}`}
                        style={styles.square}></div>
                : null}
            </div>
        )
    }
};