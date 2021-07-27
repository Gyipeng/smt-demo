import {deepClone} from "./utils"

var globalState = {};
var deps = {}; // 触发全局监听

function emitGlobal(state, prevState) {
    Object.keys(deps).forEach(function (id) {
        if (deps[id] instanceof Function) {
            deps[id](deepClone(state), deepClone(prevState));
        }
    });
}

export function initGlobalState() {
    var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

    if (state === globalState) {
        console.warn('state has not changed！');
    } else {
        var prevGlobalState = deepClone(globalState);

        globalState = deepClone(state);
        emitGlobal(globalState, prevGlobalState);
    }

    return getComponentStateActions("global-".concat(+new Date()), true);
}

export function getComponentStateActions(id, isMaster) {
    return {
        onGlobalStateChange: function onGlobalStateChange(callback, fireImmediately) {
            if (!(callback instanceof Function)) {
                console.error('callback must be function!');
                return;
            }

            if (deps[id]) {
                console.warn("[] '".concat(id, "' global listener already exists before this, new listener will overwrite it."));
            }

            deps[id] = callback;

            var cloneState = deepClone(globalState);

            if (fireImmediately) {
                callback(cloneState, cloneState);
            }
        },
        setGlobalState: function setGlobalState() {
            var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

            if (state === globalState) {
                console.warn('[qiankun] state has not changed！');
                return false;
            }

            var changeKeys = [];

            var prevGlobalState = deepClone(globalState);

            globalState = deepClone(Object.keys(state).reduce(function (_globalState, changeKey) {
                if (isMaster || Object.prototype.hasOwnProperty.call(_globalState,changeKey)) {
                    changeKeys.push(changeKey);
                    return Object.assign(_globalState, Object.defineProperty({}, changeKey, state[changeKey]));
                }

                console.warn("[] '".concat(changeKey, "' not declared when init state\uFF01"));
                return _globalState;
            }, globalState));

            if (changeKeys.length === 0) {
                console.warn('state has not changed！');
                return false;
            }
            emitGlobal(globalState, prevGlobalState);
            return true;
        },
    }
}
