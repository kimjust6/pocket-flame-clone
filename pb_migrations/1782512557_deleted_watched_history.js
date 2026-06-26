/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_4195867592");

  return app.delete(collection);
}, (app) => {
  const collection = new Collection({
    "createRule": "",
    "deleteRule": "list.owner = @request.auth.id",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
        "help": "",
        "hidden": false,
        "id": "text3208210256",
        "max": 15,
        "min": 15,
        "name": "id",
        "pattern": "^[a-z0-9]+$",
        "presentable": false,
        "primaryKey": true,
        "required": true,
        "system": true,
        "type": "text"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_4044198014",
        "help": "",
        "hidden": false,
        "id": "relation492761711",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "movie",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "cascadeDelete": false,
        "collectionId": "pbc_3277857102",
        "help": "",
        "hidden": false,
        "id": "relation1154021400",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "list",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number3632866850",
        "max": null,
        "min": null,
        "name": "tmdb_score",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number582985948",
        "max": null,
        "min": null,
        "name": "imdb_score",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "help": "",
        "hidden": false,
        "id": "number2584987602",
        "max": null,
        "min": null,
        "name": "rt_score",
        "onlyInt": false,
        "presentable": false,
        "required": false,
        "system": false,
        "type": "number"
      },
      {
        "help": "",
        "hidden": false,
        "id": "date1180390397",
        "max": "",
        "min": "",
        "name": "watched",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "date"
      },
      {
        "cascadeDelete": false,
        "collectionId": "_pb_users_auth_",
        "help": "",
        "hidden": false,
        "id": "relation1771793327",
        "maxSelect": 1,
        "minSelect": 0,
        "name": "added_by",
        "presentable": false,
        "required": false,
        "system": false,
        "type": "relation"
      },
      {
        "hidden": false,
        "id": "autodate2990389176",
        "name": "created",
        "onCreate": true,
        "onUpdate": false,
        "presentable": false,
        "system": false,
        "type": "autodate"
      },
      {
        "hidden": false,
        "id": "autodate3332085495",
        "name": "updated",
        "onCreate": true,
        "onUpdate": true,
        "presentable": false,
        "system": false,
        "type": "autodate"
      }
    ],
    "id": "pbc_4195867592",
    "indexes": [],
    "listRule": "",
    "name": "watched_history",
    "system": false,
    "type": "base",
    "updateRule": "",
    "viewRule": ""
  });

  return app.save(collection);
})
