// js/storage/localStorage.js

export class LocalStorageManager {
    save(key, value) {
        try {
            const serializedValue =
                JSON.stringify(value);

            localStorage.setItem(
                key,
                serializedValue
            );

            return true;
        } catch (error) {
            console.error(
                "LocalStorage save error:",
                error
            );

            return false;
        }
    }

    load(key, defaultValue = null) {
        try {
            const rawValue =
                localStorage.getItem(key);

            if (rawValue === null) {
                return defaultValue;
            }

            return JSON.parse(rawValue);
        } catch (error) {
            console.error(
                "LocalStorage load error:",
                error
            );

            return defaultValue;
        }
    }

    remove(key) {
        try {
            localStorage.removeItem(key);

            return true;
        } catch (error) {
            console.error(
                "LocalStorage remove error:",
                error
            );

            return false;
        }
    }

    clear() {
        try {
            localStorage.clear();

            return true;
        } catch (error) {
            console.error(
                "LocalStorage clear error:",
                error
            );

            return false;
        }
    }
}