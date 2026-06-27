/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const userField = (id) => new Field({
    "cascadeDelete": true,
    "collectionId": "_pb_users_auth_",
    "hidden": false,
    "id": id,
    "maxSelect": 1,
    "minSelect": 0,
    "name": "user",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "relation"
  });

  const ownedRule = "user = @request.auth.id";
  const createRule = "@request.auth.id != \"\" && user = @request.auth.id";

  const collections = [
    ["pbc_settingsflam", "relation3010000001", 8],
    ["pbc_applications", "relation3010000002", 6],
    ["pbc_bookmarksflam", "relation3010000003", 6],
  ];

  collections.forEach(([collectionId, fieldId, index]) => {
    const collection = app.findCollectionByNameOrId(collectionId);
    collection.fields.addAt(index, userField(fieldId));
    unmarshal({
      "listRule": ownedRule,
      "viewRule": ownedRule,
      "createRule": createRule,
      "updateRule": ownedRule,
      "deleteRule": ownedRule
    }, collection);
    app.save(collection);
  });

  const users = app.findRecordsByFilter("users", "1=1", "", 1, 0);
  if (users.length) {
    const userId = users[0].id;
    collections.forEach(([collectionId]) => {
      const records = app.findRecordsByFilter(collectionId, "1=1", "", 500, 0);
      records.forEach((record) => {
        if (!record.getString("user")) {
          record.set("user", userId);
          app.save(record);
        }
      });
    });
  }
}, (app) => {
  const collections = [
    ["pbc_settingsflam", "relation3010000001"],
    ["pbc_applications", "relation3010000002"],
    ["pbc_bookmarksflam", "relation3010000003"],
  ];

  collections.forEach(([collectionId, fieldId]) => {
    const collection = app.findCollectionByNameOrId(collectionId);
    collection.fields.removeById(fieldId);
    unmarshal({
      "listRule": "",
      "viewRule": "",
      "createRule": "",
      "updateRule": "",
      "deleteRule": ""
    }, collection);
    app.save(collection);
  });
})
