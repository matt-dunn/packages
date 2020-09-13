import { Given, When, Then, And, But, Fusion } from "jest-cucumber-fusion";

import { Rocket } from "./rocket";
let rocket;

Given( /^I am (.*) attempting to launch a rocket into space$/, (astronaut: string) => {
  rocket = Rocket(astronaut);
} );

When( "I launch the rocket", () => {
  rocket.launch();
} );

Then( "the rocket should end up in space", () => {
  expect(rocket.isInSpace()).toBe(true);
} );

And(/^the astronaut is (.*)$/, (astronaut: string) => {
  expect(rocket.whoIsInSpace()).toBe(astronaut);
});

And( /^the booster\(s\) should land back on the launch pad$/, () => {
  expect(rocket.boostersLanded()).toBe(true);
} );

But( "nobody should doubt me ever again", () => {
  expect("people").not.toBe("haters");
} );


Fusion( "rocket-launching.feature" );
