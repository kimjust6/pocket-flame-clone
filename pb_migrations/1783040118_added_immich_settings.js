/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  const collection = app.findCollectionByNameOrId("pbc_settingsflam")

  collection.fields.addAt(9, new Field({
    "hidden": false,
    "id": "text_immich_url",
    "name": "immich_url",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  collection.fields.addAt(10, new Field({
    "hidden": false,
    "id": "text_immich_api_key",
    "name": "immich_api_key",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  collection.fields.addAt(11, new Field({
    "hidden": false,
    "id": "text_immich_album_id",
    "name": "immich_album_id",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "text"
  }))

  collection.fields.addAt(12, new Field({
    "hidden": false,
    "id": "num_slideshow_interval",
    "name": "slideshow_interval",
    "presentable": false,
    "required": false,
    "system": false,
    "type": "number"
  }))

  return app.save(collection)
}, (app) => {
  const collection = app.findCollectionByNameOrId("pbc_settingsflam")

  collection.fields.removeById("text_immich_url")
  collection.fields.removeById("text_immich_api_key")
  collection.fields.removeById("text_immich_album_id")
  collection.fields.removeById("num_slideshow_interval")

  return app.save(collection)
})
