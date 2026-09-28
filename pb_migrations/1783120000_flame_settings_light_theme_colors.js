/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("flame_settings");

    // Add light theme color fields
    const lightPrimary = new Field({
        "name": "color_primary_light",
        "type": "text",
        "required": false
    });
    const lightAccent = new Field({
        "name": "color_accent_light",
        "type": "text",
        "required": false
    });
    const lightBackground = new Field({
        "name": "color_background_light",
        "type": "text",
        "required": false
    });

    collection.fields.add(lightPrimary);
    collection.fields.add(lightAccent);
    collection.fields.add(lightBackground);
    app.save(collection);

    // Update existing records with default light theme colors
    const records = app.findAllRecords("flame_settings");
    for (const record of records) {
        let changed = false;
        if (!record.get("color_primary_light")) {
            record.set("color_primary_light", "#0F172A");
            changed = true;
        }
        if (!record.get("color_accent_light")) {
            record.set("color_accent_light", "#EAB308");
            changed = true;
        }
        if (!record.get("color_background_light")) {
            record.set("color_background_light", "#F8FAFC");
            changed = true;
        }
        if (changed) {
            app.save(record);
        }
    }
}, (app) => {
    const collection = app.findCollectionByNameOrId("flame_settings");
    const fields = ["color_primary_light", "color_accent_light", "color_background_light"];
    for (const name of fields) {
        const field = collection.fields.getByName(name);
        if (field) {
            collection.fields.remove(field.id);
        }
    }
    app.save(collection);
})
