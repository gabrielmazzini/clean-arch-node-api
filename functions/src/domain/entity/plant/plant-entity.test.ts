import {after, before, describe, it} from "node:test";
import * as assert from "node:assert";
import { Plant } from "./plantEntity";
import crypto = require("node:crypto");

describe("Plant entity", () => {
  describe("test creating valid plant", () => {
    const idFixed = "58fda34c-6a17-48ba-abe5-d1738e9f79de";

    before(() => {
      crypto.randomUUID = () => idFixed;
    });

    after(async () => {
      crypto.randomUUID = (await import("node:crypto")).randomUUID;
    });

    it("you must create a plant", () => {
      const expectedPlant = {
        id: idFixed,
        scientificName: "Nome teste",
        popularName: "Nome popular teste",
        species: "Espécie teste",
        image: "Imagem teste",
      };
      const plant: Omit<Plant, "id"> = Plant.create({
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
      });
      assert.deepEqual(plant, expectedPlant);
    });
  });
});
