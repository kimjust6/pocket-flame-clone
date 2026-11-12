/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_categories123");

  if (!collection.fields.getByName("user")) {
    collection.fields.add(new Field({
      "cascadeDelete": true,
      "collectionId": "_pb_users_auth_",
      "hidden": false,
      "id": "relation3010000004",
      "maxSelect": 1,
      "minSelect": 0,
      "name": "user",
      "presentable": false,
      "required": false,
      "system": false,
      "type": "relation"
    }));
  }

  const ownedRule = "user = @request.auth.id";
  const createRule = '@request.auth.id != "" && user = @request.auth.id';
  unmarshal({
    "listRule": ownedRule,
    "viewRule": ownedRule,
    "createRule": createRule,
    "updateRule": ownedRule,
    "deleteRule": ownedRule
  }, collection);
  app.save(collection);

  const users = app.findRecordsByFilter("users", "1=1", "", 1, 0);
  if (users.length) {
    const defaultUserId = users[0].id;
    const records = app.findRecordsByFilter("pbc_categories123", "1=1", "", 500, 0);
    records.forEach((record) => {
      if (!record.getString("user")) {
        record.set("user", defaultUserId);
        app.save(record);
      }
    });
  }
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_categories123");
  const field = collection.fields.getByName("user");
  if (field) {
    collection.fields.removeById(field.id);
  }
  unmarshal({
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": ""
  }, collection);
  app.save(collection);
})
