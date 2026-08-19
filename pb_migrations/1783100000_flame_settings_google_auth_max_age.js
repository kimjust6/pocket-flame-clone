/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
    const collection = app.findCollectionByNameOrId("flame_settings");

    // Add google_auth_max_age field (seconds). Default: 31536000 (1 year)
    const field = new Field({
        "name": "google_auth_max_age",
        "type": "number",
        "required": false
    });
    collection.fields.add(field);
    app.save(collection);

    // Update existing records that have no value to the 1-year default
    const records = app.findAllRecords("flame_settings");
    for (const record of records) {
        if (!record.get("google_auth_max_age")) {
            record.set("google_auth_max_age", 31536000);
            app.save(record);
        }
    }
}, (app) => {
    const collection = app.findCollectionByNameOrId("flame_settings");
    const field = collection.fields.getByName("google_auth_max_age");
    if (field) {
        collection.fields.remove(field.id);
        app.save(collection);
    }
})
