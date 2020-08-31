// ***********************************************************
// This example support/index.js is processed and
// loaded automatically before your test files.
//
// This is a great place to put global configuration and
// behavior that modifies Cypress.
//
// You can change the location of this file or turn off
// automatically serving support files with the
// 'supportFile' configuration option.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

import "./commands";

import addContext from "mochawesome/addContext";

Cypress.on("test:after:run", (test) => {
  const specName = Cypress.spec.name;

  const videoName = specName.replace("/.js.*", ".js");
  const videoUrl = "videos/" + videoName + ".mp4";

  addContext({ test }, {title:"Screenshot", value: videoUrl});
});
