/// <reference path="../pb_data/types.d.ts" />
migrate((app) => {
  // Create flame_settings collection
  const flameSettings = new Collection({
    "id": "pbc_settingsflam",
    "name": "flame_settings",
    "type": "base",
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
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
        "name": "color_primary",
        "type": "text",
        "required": false
      },
      {
        "name": "color_accent",
        "type": "text",
        "required": false
      },
      {
        "name": "color_background",
        "type": "text",
        "required": false
      },
      {
        "name": "weather_lat",
        "type": "text",
        "required": false
      },
      {
        "name": "weather_lon",
        "type": "text",
        "required": false
      },
      {
        "name": "weather_unit",
        "type": "text",
        "required": false
      },
      {
        "name": "search_engine",
        "type": "text",
        "required": false
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
    ]
  });
  app.save(flameSettings);

  // Create applications collection
  const applications = new Collection({
    "id": "pbc_applications",
    "name": "applications",
    "type": "base",
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
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
        "name": "name",
        "type": "text",
        "required": true
      },
      {
        "name": "url",
        "type": "text",
        "required": true
      },
      {
        "name": "icon",
        "type": "text",
        "required": false
      },
      {
        "name": "description",
        "type": "text",
        "required": false
      },
      {
        "name": "order",
        "type": "number",
        "required": false
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
    ]
  });
  app.save(applications);

  // Create bookmark_categories collection
  const bookmarkCategories = new Collection({
    "id": "pbc_categories123",
    "name": "bookmark_categories",
    "type": "base",
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
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
        "name": "name",
        "type": "text",
        "required": true
      },
      {
        "name": "order",
        "type": "number",
        "required": false
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
    ]
  });
  app.save(bookmarkCategories);

  // Create bookmarks collection
  const bookmarks = new Collection({
    "id": "pbc_bookmarksflam",
    "name": "bookmarks",
    "type": "base",
    "listRule": "",
    "viewRule": "",
    "createRule": "",
    "updateRule": "",
    "deleteRule": "",
    "fields": [
      {
        "autogeneratePattern": "[a-z0-9]{15}",
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
        "name": "name",
        "type": "text",
        "required": true
      },
      {
        "name": "url",
        "type": "text",
        "required": true
      },
      {
        "name": "icon",
        "type": "text",
        "required": false
      },
      {
        "cascadeDelete": true,
        "collectionId": "pbc_categories123",
        "hidden": false,
        "id": "relationCategory",
        "maxSelect": 1,
        "minSelect": 1,
        "name": "category",
        "presentable": false,
        "required": true,
        "system": false,
        "type": "relation"
      },
      {
        "name": "order",
        "type": "number",
        "required": false
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
    ]
  });
  app.save(bookmarks);

  // Seed default settings
  const settingsRecord = new Record(flameSettings);
  settingsRecord.set("id", "defaultsettings");
  settingsRecord.set("color_primary", "#d9d9d9");
  settingsRecord.set("color_accent", "#50fbc2");
  settingsRecord.set("color_background", "#282525");
  settingsRecord.set("weather_lat", "43.6532");
  settingsRecord.set("weather_lon", "-79.3832");
  settingsRecord.set("weather_unit", "celsius");
  settingsRecord.set("search_engine", "https://www.google.com/search?q=");
  app.save(settingsRecord);

  // SVGs used for applications
  const photosSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M8.5,13.5L11,16.5L14.5,12L19,18H5M21,19V5C21,3.89 20.1,3 19,3H5A2,2 0 0,0 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19Z" style="fill: var(--color-primary);"></path></svg>`;
  const nginxSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M16.2,17H14.2L12,13.2L9.8,17H7.8L11,12L7.8,7H9.8L12,10.8L14.2,7H16.2L13,12M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3Z" style="fill: var(--color-primary);"></path></svg>`;
  const proxmoxSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M22,12A10,10 0 0,1 12,22A10,10 0 0,1 2,12A10,10 0 0,1 12,2A10,10 0 0,1 22,12M14.34,7.74C14.92,8.07 15.65,7.87 16,7.3C16.31,6.73 16.12,6 15.54,5.66C14.97,5.33 14.23,5.5 13.9,6.1C13.57,6.67 13.77,7.41 14.34,7.74M11.88,15.5C11.35,15.5 10.85,15.39 10.41,15.18L9.57,16.68C10.27,17 11.05,17.22 11.88,17.22C12.37,17.22 12.83,17.15 13.28,17.03C13.36,16.54 13.64,16.1 14.1,15.84C14.56,15.57 15.08,15.55 15.54,15.72C16.43,14.85 17,13.66 17.09,12.33L15.38,12.31C15.22,14.1 13.72,15.5 11.88,15.5M11.88,8.5C13.72,8.5 15.22,9.89 15.38,11.69L17.09,11.66C17,10.34 16.43,9.15 15.54,8.28C15.08,8.45 14.55,8.42 14.1,8.16C13.64,7.9 13.36,7.45 13.28,6.97C12.83,6.85 12.37,6.78 11.88,6.78C11.05,6.78 10.27,6.97 9.57,7.32L10.41,8.82C10.85,8.61 11.35,8.5 11.88,8.5M8.37,12C8.37,10.81 8.96,9.76 9.86,9.13L9,7.65C7.94,8.36 7.15,9.43 6.83,10.69C7.21,11 7.45,11.47 7.45,12C7.45,12.53 7.21,13 6.83,13.31C7.15,14.56 7.94,15.64 9,16.34L9.86,14.87C8.96,14.24 8.37,13.19 8.37,12M14.34,16.26C13.77,16.59 13.57,17.32 13.9,17.9C14.23,18.47 14.97,18.67 15.54,18.34C16.12,18 16.31,17.27 16,16.7C15.65,16.12 14.92,15.93 14.34,16.26M5.76,10.8C5.1,10.8 4.56,11.34 4.56,12C4.56,12.66 5.1,13.2 5.76,13.2C6.43,13.2 6.96,12.66 6.96,12C6.96,11.34 6.43,10.8 5.76,10.8Z" style="fill: var(--color-primary);"></path></svg>`;
  const qbittorrentSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M17,13L12,18L7,13H10V9H14V13M19.35,10.03C18.67,6.59 15.64,4 12,4C9.11,4 6.6,5.64 5.35,8.03C2.34,8.36 0,10.9 0,14A6,6 0 0,0 6,20H19A5,5 0 0,0 24,15C24,12.36 21.95,10.22 19.35,10.03Z" style="fill: var(--color-primary);"></path></svg>`;
  const portainerSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M21.81 10.25C21.75 10.21 21.25 9.82 20.17 9.82C19.89 9.82 19.61 9.85 19.33 9.9C19.12 8.5 17.95 7.79 17.9 7.76L17.61 7.59L17.43 7.86C17.19 8.22 17 8.63 16.92 9.05C16.72 9.85 16.84 10.61 17.25 11.26C16.76 11.54 15.96 11.61 15.79 11.61H2.62C2.28 11.61 2 11.89 2 12.24C2 13.39 2.18 14.54 2.58 15.62C3.03 16.81 3.71 17.69 4.58 18.23C5.56 18.83 7.17 19.17 9 19.17C9.79 19.17 10.61 19.1 11.42 18.95C12.54 18.75 13.62 18.36 14.61 17.79C15.43 17.32 16.16 16.72 16.78 16C17.83 14.83 18.45 13.5 18.9 12.35H19.09C20.23 12.35 20.94 11.89 21.33 11.5C21.59 11.26 21.78 10.97 21.92 10.63L22 10.39L21.81 10.25M3.85 11.24H5.61C5.69 11.24 5.77 11.17 5.77 11.08V9.5C5.77 9.42 5.7 9.34 5.61 9.34H3.85C3.76 9.34 3.69 9.41 3.69 9.5V11.08C3.7 11.17 3.76 11.24 3.85 11.24M6.28 11.24H8.04C8.12 11.24 8.2 11.17 8.2 11.08V9.5C8.2 9.42 8.13 9.34 8.04 9.34H6.28C6.19 9.34 6.12 9.41 6.12 9.5V11.08C6.13 11.17 6.19 11.24 6.28 11.24M8.75 11.24H10.5C10.6 11.24 10.67 11.17 10.67 11.08V9.5C10.67 9.42 10.61 9.34 10.5 9.34H8.75C8.67 9.34 8.6 9.41 8.6 9.5V11.08C8.6 11.17 8.66 11.24 8.75 11.24M11.19 11.24H12.96C13.04 11.24 13.11 11.17 13.11 11.08V9.5C13.11 9.42 13.05 9.34 12.96 9.34H11.19C11.11 9.34 11.04 9.41 11.04 9.5V11.08C11.04 11.17 11.11 11.24 11.19 11.24M6.28 9H8.04C8.12 9 8.2 8.91 8.2 8.82V7.25C8.2 7.16 8.13 7.09 8.04 7.09H6.28C6.19 7.09 6.12 7.15 6.12 7.25V8.82C6.13 8.91 6.19 9 6.28 9M8.75 9H10.5C10.6 9 10.67 8.91 10.67 8.82V7.25C10.67 7.16 10.61 7.09 10.5 7.09H8.75C8.67 7.09 8.6 7.15 8.6 7.25V8.82C8.6 8.91 8.66 9 8.75 9M11.19 9H12.96C13.04 9 13.11 8.91 13.11 8.82V7.25C13.11 7.16 13.04 7.09 12.96 7.09H11.19C11.11 7.09 11.04 7.15 11.04 7.25V8.82C11.04 8.91 11.11 9 11.19 9M11.19 6.72H12.96C13.04 6.72 13.11 6.65 13.11 6.56V5C13.11 4.9 13.04 4.83 12.96 4.83H11.19C11.11 4.83 11.04 4.89 11.04 5V6.56C11.04 6.64 11.11 6.72 11.19 6.72M13.65 11.24H15.41C15.5 11.24 15.57 11.17 15.57 11.08V9.5C15.57 9.42 15.5 9.34 15.41 9.34H13.65C13.57 9.34 13.5 9.41 13.5 9.5V11.08C13.5 11.17 13.57 11.24 13.65 11.24" style="fill: var(--color-primary);"></path></svg>`;
  const mediaManagerSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M4,2C2.89,2 2,2.89 2,4V20C2,21.11 2.89,22 4,22H20C21.11,22 22,21.11 22,20V4C22,2.89 21.11,2 20,2H4M8.56,6H12.06L15.5,12L12.06,18H8.56L12,12L8.56,6Z" style="fill: var(--color-primary);"></path></svg>`;
  const glinetSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M3,2A2,2 0 0,0 1,4V16C1,17.11 1.9,18 3,18H10V20H8V22H16V20H14V18H21A2,2 0 0,0 23,16V4A2,2 0 0,0 21,2M3,4H21V16H3M15,5L11.5,8.5L15,12L16.4,10.6L14.3,8.5L16.4,6.4M9,8L7.6,9.4L9.7,11.5L7.6,13.6L9,15L12.5,11.5" style="fill: var(--color-primary);"></path></svg>`;
  const zimaosSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M12 2C17.5 2 22 6.5 22 12S17.5 22 12 22 2 17.5 2 12 6.5 2 12 2M12 4C10.1 4 8.4 4.6 7.1 5.7L18.3 16.9C19.3 15.5 20 13.8 20 12C20 7.6 16.4 4 12 4M16.9 18.3L5.7 7.1C4.6 8.4 4 10.1 4 12C4 16.4 7.6 20 12 20C13.9 20 15.6 19.4 16.9 18.3Z" style="fill: var(--color-primary);"></path></svg>`;

  const seedApps = [
    { name: "Photos", url: "https://photos.jkim.win", icon: photosSvg, description: "photos.jkim.win", order: 1 },
    { name: "nginx", url: "https://nginx.jkim.win", icon: nginxSvg, description: "nginx.jkim.win", order: 2 },
    { name: "Proxmox", url: "https://192.168.68.79:8006/", icon: proxmoxSvg, description: "192.168.68.79:8006", order: 3 },
    { name: "qBittorrent", url: "http://192.168.68.20:8080", icon: qbittorrentSvg, description: "192.168.68.20:8080", order: 4 },
    { name: "Portainer 4060", url: "https://192.168.68.65:9443", icon: portainerSvg, description: "192.168.68.65:9443", order: 5 },
    { name: "Portainer 6700xt", url: "https://192.168.68.20:9443", icon: portainerSvg, description: "192.168.68.20:9443", order: 6 },
    { name: "Portainer 155h", url: "https://192.168.68.60:9443/#!/home", icon: portainerSvg, description: "192.168.68.60:9443/#!/home", order: 7 },
    { name: "Portainer 5500", url: "https://192.168.68.21:9443", icon: portainerSvg, description: "192.168.68.21:9443", order: 8 },
    { name: "Overseer", url: "http://192.168.68.20:5055", icon: mediaManagerSvg, description: "192.168.68.20:5055", order: 9 },
    { name: "Radarr", url: "http://192.168.68.20:7878", icon: mediaManagerSvg, description: "192.168.68.20:7878", order: 10 },
    { name: "Sonarr", url: "http://192.168.68.20:8989", icon: mediaManagerSvg, description: "192.168.68.20:8989", order: 11 },
    { name: "Prowlarr", url: "http://192.168.68.20:9696", icon: mediaManagerSvg, description: "192.168.68.20:9696", order: 12 },
    { name: "GLiNet", url: "https://192.168.68.71/#/", icon: glinetSvg, description: "192.168.68.71/#", order: 13 },
    { name: "ZimaOS", url: "https://zimaos.local/#/", icon: zimaosSvg, description: "zimaos.local/#", order: 14 }
  ];

  const appCollection = app.findCollectionByNameOrId("pbc_applications");
  seedApps.forEach((appData) => {
    const record = new Record(appCollection);
    record.set("name", appData.name);
    record.set("url", appData.url);
    record.set("icon", appData.icon);
    record.set("description", appData.description);
    record.set("order", appData.order);
    app.save(record);
  });

  // Seed default categories
  const catCollection = app.findCollectionByNameOrId("pbc_categories123");
  const notesCat = new Record(catCollection);
  notesCat.set("id", "catnotes1234567");
  notesCat.set("name", "Notes");
  notesCat.set("order", 1);
  app.save(notesCat);

  // SVGs for Bookmarks
  const docSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7.03 11.34L8.23 15.28H9.6L10.91 8.72H9.53L8.75 12.6L7.64 8.85H6.5L5.31 12.62L4.53 8.72H3.09L4.4 15.28H5.77M20.75 19.5V17H8.25V19.5M20.75 15.75V12.63H12V15.75M20.75 11.38V8.25H12V11.38M20.75 7V4.5H8.25V7Z" style="fill: var(--color-primary);"></path></svg>`;
  const sheetSvg = `<svg viewBox="0 0 24 24" role="presentation" class="Icon_Icon__jzcrU"><path d="M21.17 3.25Q21.5 3.25 21.76 3.5 22 3.74 22 4.08V19.92Q22 20.26 21.76 20.5 21.5 20.75 21.17 20.75H7.83Q7.5 20.75 7.24 20.5 7 20.26 7 19.92V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H7V4.08Q7 3.74 7.24 3.5 7.5 3.25 7.83 3.25M7 13.06L8.18 15.28H9.97L8 12.06L9.93 8.89H8.22L7.13 10.9L7.09 10.96L7.06 11.03Q6.8 10.5 6.5 9.96 6.25 9.43 5.97 8.89H4.16L6.05 12.08L4 15.28H5.78M13.88 19.5V17H8.25V19.5M13.88 15.75V12.63H12V15.75M13.88 11.38V8.25H12V11.38M13.88 7V4.5H8.25V7M20.75 19.5V17H15.13V19.5M20.75 15.75V12.63H15.13V15.75M20.75 11.38V8.25H15.13V11.38M20.75 7V4.5H15.13V7Z" style="fill: var(--color-primary);"></path></svg>`;

  const seedBookmarks = [
    { name: "Dayforce Notes", url: "https://docs.google.com/document/d/16SwQ5IR2CGiAFmnZni4CVT1hNN-BxGrpRgZxJXrib_Q/edit?usp=drivesdk", icon: docSvg, order: 1 },
    { name: "Weight Vs Time", url: "https://docs.google.com/spreadsheets/d/1s0qWWUECiFf6RAthnU3mK8gZ25QNYlZyPBtprXc4OE4/edit?gid=0#gid=0", icon: sheetSvg, order: 2 },
    { name: "Y x J", url: "https://docs.google.com/spreadsheets/d/1anuhQ70v0ojQc8ZV_AdS_qwzJ2N0Ncsllpuv4VB8EA8/edit?gid=1190531926#gid=1190531926", icon: sheetSvg, order: 3 }
  ];

  const bookmarksCollection = app.findCollectionByNameOrId("pbc_bookmarksflam");
  seedBookmarks.forEach((bData) => {
    const record = new Record(bookmarksCollection);
    record.set("name", bData.name);
    record.set("url", bData.url);
    record.set("icon", bData.icon);
    record.set("category", "catnotes1234567");
    record.set("order", bData.order);
    app.save(record);
  });
}, (app) => {
  const collection1 = app.findCollectionByNameOrId("pbc_bookmarksflam");
  const collection2 = app.findCollectionByNameOrId("pbc_categories123");
  const collection3 = app.findCollectionByNameOrId("pbc_applications");
  const collection4 = app.findCollectionByNameOrId("pbc_settingsflam");

  app.delete(collection1);
  app.delete(collection2);
  app.delete(collection3);
  app.delete(collection4);
})
