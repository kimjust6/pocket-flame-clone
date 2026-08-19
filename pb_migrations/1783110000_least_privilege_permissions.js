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

  // 1. Update bookmark_categories to have a user field and strict owned permissions
  const categoriesCollection = app.findCollectionByNameOrId("pbc_categories123");
  if (!categoriesCollection.fields.getByName("user")) {
    categoriesCollection.fields.addAt(3, userField("relation3010000004"));
  }
  unmarshal({
    "listRule": ownedRule,
    "viewRule": ownedRule,
    "createRule": createRule,
    "updateRule": ownedRule,
    "deleteRule": ownedRule
  }, categoriesCollection);
  app.save(categoriesCollection);

  // Backfill existing bookmark_categories to the first user if not set
  const users = app.findRecordsByFilter("users", "1=1", "", 1, 0);
  if (users.length) {
    const userId = users[0].id;
    const catRecords = app.findRecordsByFilter("pbc_categories123", "1=1", "", 500, 0);
    catRecords.forEach((record) => {
      if (!record.getString("user")) {
        record.set("user", userId);
        app.save(record);
      }
    });
  }

  // 2. Bookmarks collection: users can only add/update bookmarks for their own profile and owned categories
  const bookmarksCol = app.findCollectionByNameOrId("pbc_bookmarksflam");
  unmarshal({
    "listRule": "user = @request.auth.id",
    "viewRule": "user = @request.auth.id",
    "createRule": "@request.auth.id != \"\" && user = @request.auth.id && category.user = @request.auth.id",
    "updateRule": "user = @request.auth.id && category.user = @request.auth.id",
    "deleteRule": "user = @request.auth.id"
  }, bookmarksCol);
  app.save(bookmarksCol);

  // 3. Ensure flame_settings and applications strictly enforce ownership
  const collections = [
    "pbc_settingsflam",
    "pbc_applications"
  ];
  collections.forEach((colId) => {
    const col = app.findCollectionByNameOrId(colId);
    unmarshal({
      "listRule": ownedRule,
      "viewRule": ownedRule,
      "createRule": createRule,
      "updateRule": ownedRule,
      "deleteRule": ownedRule
    }, col);
    app.save(col);
  });

  // 4. Ensure users collection restricts list/view/update/delete to the owner
  const usersCollection = app.findCollectionByNameOrId("_pb_users_auth_");
  unmarshal({
    "listRule": "id = @request.auth.id",
    "viewRule": "id = @request.auth.id",
    "createRule": "",
    "updateRule": "id = @request.auth.id",
    "deleteRule": "id = @request.auth.id"
  }, usersCollection);
  app.save(usersCollection);
}, (app) => {
  const categoriesCollection = app.findCollectionByNameOrId("pbc_categories123");
  const userF = categoriesCollection.fields.getByName("user");
  if (userF) {
    categoriesCollection.fields.remove(userF.id);
  }
  unmarshal({
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": ""
  }, categoriesCollection);
  app.save(categoriesCollection);

  const bookmarksCol = app.findCollectionByNameOrId("pbc_bookmarksflam");
  unmarshal({
    "listRule": "user = @request.auth.id",
    "viewRule": "user = @request.auth.id",
    "createRule": "@request.auth.id != \"\" && user = @request.auth.id",
    "updateRule": "user = @request.auth.id",
    "deleteRule": "user = @request.auth.id"
  }, bookmarksCol);
  app.save(bookmarksCol);
})
