export function get(key) {
    let value = window.localStorage.getItem(key);
    return value && JSON.parse(value);
}

export function set(key, value) {
    return window.localStorage.setItem(key, JSON.stringify(value));
}

export function clear() {
    window.localStorage.clear();
}