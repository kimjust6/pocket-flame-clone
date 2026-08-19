/**
 * Loader for the homepage startpage dashboard.
 * Fetches applications, categories, bookmarks, and user settings.
 * @type {import('pocketpages').PageDataLoaderFunc}
 */
module.exports = function (context) {
    try {
        const user = context.request.auth
        if (!user) {
            context.response.redirect('/login')
            return
        }
        const userFilter = "user = {:user}"
        const filterParams = { user: user.id }

        // Fetch settings for the user
        let settings = {
            id: 'defaultsettings',
            color_primary: "#d9d9d9",
            color_accent: "#50fbc2",
            color_background: "#282525",
            color_primary_light: "#0F172A",
            color_accent_light: "#EAB308",
            color_background_light: "#F8FAFC",
            weather_lat: "43.6532",
            weather_lon: "-79.3832",
            weather_unit: "celsius",
            search_engine: "https://www.google.com/search?q=",
            google_auth_max_age: 31536000
        };

        try {
            const records = $app.findRecordsByFilter("flame_settings", userFilter, "", 1, 0, filterParams);
            let record = records && records.length ? records[0] : null;
            if (!record) {
                const collection = $app.findCollectionByNameOrId("flame_settings");
                record = new Record(collection);
                record.set("user", user.id);
                record.set("color_primary", settings.color_primary);
                record.set("color_accent", settings.color_accent);
                record.set("color_background", settings.color_background);
                record.set("color_primary_light", settings.color_primary_light);
                record.set("color_accent_light", settings.color_accent_light);
                record.set("color_background_light", settings.color_background_light);
                record.set("weather_lat", settings.weather_lat);
                record.set("weather_lon", settings.weather_lon);
                record.set("weather_unit", settings.weather_unit);
                record.set("search_engine", settings.search_engine);
                record.set("google_auth_max_age", settings.google_auth_max_age);
                $app.save(record);
            }
            if (record) {
                settings = {
                    id: record.id,
                    user: record.getString("user") || user.id,
                    color_primary: record.getString("color_primary") || settings.color_primary,
                    color_accent: record.getString("color_accent") || settings.color_accent,
                    color_background: record.getString("color_background") || settings.color_background,
                    color_primary_light: record.getString("color_primary_light") || settings.color_primary_light,
                    color_accent_light: record.getString("color_accent_light") || settings.color_accent_light,
                    color_background_light: record.getString("color_background_light") || settings.color_background_light,
                    weather_lat: record.getString("weather_lat") || settings.weather_lat,
                    weather_lon: record.getString("weather_lon") || settings.weather_lon,
                    weather_unit: record.getString("weather_unit") || settings.weather_unit,
                    search_engine: record.getString("search_engine") || settings.search_engine,
                    google_auth_max_age: record.getInt("google_auth_max_age") || settings.google_auth_max_age
                };
            }
        } catch (e) {
            console.error("Failed to load settings in homepage loader:", e);
        }

        if (context.locals) {
            context.locals.settings = settings;
        }

        // Fetch all applications
        let applications = [];
        try {
            const appRecords = $app.findRecordsByFilter("applications", userFilter, "order, name", 200, 0, filterParams);
            applications = appRecords.map(app => ({
                id: app.id,
                name: app.getString("name"),
                url: app.getString("url"),
                icon: app.getString("icon"),
                description: app.getString("description"),
                order: app.getInt("order")
            }));
        } catch (e) {
            console.error("Failed to fetch applications:", e);
        }

        // Fetch categories and bookmarks
        let categories = [];
        let bookmarksByCategory = [];
        try {
            const catRecords = $app.findRecordsByFilter("bookmark_categories", userFilter, "order, name", 100, 0, filterParams);
            categories = catRecords.map(cat => ({
                id: cat.id,
                name: cat.getString("name"),
                order: cat.getInt("order")
            }));

            let bookmarks = [];
            try {
                bookmarks = $app.findRecordsByFilter("bookmarks", userFilter, "order, name", 1000, 0, filterParams);
            } catch (err) {
                console.error("Failed to fetch bookmarks for user:", err);
            }

            bookmarksByCategory = categories.map(cat => {
                const catBookmarks = (bookmarks || []).filter(b => b.getString("category") === cat.id);
                return {
                    id: cat.id,
                    name: cat.name,
                    order: cat.order,
                    bookmarks: catBookmarks.map(b => ({
                        id: b.id,
                        name: b.getString("name"),
                        url: b.getString("url"),
                        icon: b.getString("icon"),
                        order: b.getInt("order")
                    }))
                };
            });
        } catch (e) {
            console.error("Failed to fetch bookmarks:", e);
        }

        return {
            isHome: true,
            settings,
            applications,
            categories,
            bookmarksByCategory
        };
    } catch (e) {
        console.error('Failed to load startpage data:', e);
        return {
            isHome: true,
            settings: {},
            applications: [],
            categories: [],
            bookmarksByCategory: []
        };
    }
}
