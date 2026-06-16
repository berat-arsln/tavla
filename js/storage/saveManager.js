// js/storage/saveManager.js

import { LocalStorageManager }
    from "./localStorage.js";

export class SaveManager {
    constructor() {
        this.storage =
            new LocalStorageManager();

        this.KEYS = {
            PROFILES:
                "tavla_profiles",

            ACTIVE_PROFILE:
                "tavla_active_profile",

            SETTINGS:
                "tavla_settings",

            LOCAL_MATCHES:
                "tavla_local_matches",

            LOCAL_STATS:
                "tavla_local_stats",

            THEME:
                "tavla_theme"
        };
    }

    saveProfile(profile) {
        const profiles =
            this.loadProfiles();

        const index =
            profiles.findIndex(
                (item) =>
                    item.id === profile.id
            );

        if (index >= 0) {
            profiles[index] =
                structuredClone(profile);
        } else {
            profiles.push(
                structuredClone(profile)
            );
        }

        return this.storage.save(
            this.KEYS.PROFILES,
            profiles
        );
    }

    loadProfiles() {
        return this.storage.load(
            this.KEYS.PROFILES,
            []
        );
    }

    setActiveProfile(profileId) {
        return this.storage.save(
            this.KEYS.ACTIVE_PROFILE,
            profileId
        );
    }

    getActiveProfile() {
        const profileId =
            this.storage.load(
                this.KEYS.ACTIVE_PROFILE,
                null
            );

        if (!profileId) {
            return null;
        }

        const profiles =
            this.loadProfiles();

        return (
            profiles.find(
                (profile) =>
                    profile.id === profileId
            ) || null
        );
    }

    saveSettings(settings) {
        return this.storage.save(
            this.KEYS.SETTINGS,
            structuredClone(settings)
        );
    }

    loadSettings() {
        return this.storage.load(
            this.KEYS.SETTINGS,
            {}
        );
    }

    saveLocalMatches(matches) {
        return this.storage.save(
            this.KEYS.LOCAL_MATCHES,
            structuredClone(matches)
        );
    }

    loadLocalMatches() {
        return this.storage.load(
            this.KEYS.LOCAL_MATCHES,
            []
        );
    }

    saveLocalStats(stats) {
        return this.storage.save(
            this.KEYS.LOCAL_STATS,
            structuredClone(stats)
        );
    }

    loadLocalStats() {
        return this.storage.load(
            this.KEYS.LOCAL_STATS,
            null
        );
    }

    saveTheme(theme) {
        return this.storage.save(
            this.KEYS.THEME,
            theme
        );
    }

    loadTheme() {
        return this.storage.load(
            this.KEYS.THEME,
            "light"
        );
    }
}