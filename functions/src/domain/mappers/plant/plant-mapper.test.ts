import {describe, it, before, after} from "node:test";
import * as assert from "node:assert";
import { Plant } from "../../entity/plant/plantEntity";
import { PlantMapper } from "./plant-mapper";

describe("Plant Mapper", () => {
    const idFixed = "58fda34c-6a17-48ba-abe5-d1738e9f79de";

before(() => {
    crypto.randomUUID = () => idFixed;
});

after(async () => {
    crypto.randomUUID = (await import("node:crypto")).randomUUID;
});

it("should create a Plant entity from data", () => {
    const data = {
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    };
    const result = PlantMapper.toEntity(data);
    const expect = Plant.create({
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    });
    assert.deepStrictEqual(expect, result);
});

it("should convert a Plant entity to DTO", () => {
    const plant = Plant.create({
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    });
    const result = PlantMapper.toDto(plant);
    const expected = {
        id: plant._id,
        scientificName: plant._scientificName,
        popularName: plant._popularName,
        species: plant._species,
        image: plant._image,
    }
    assert.deepStrictEqual(expected, result);
});

it("Must update an object's attributes", () => {
    const input = {
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    };
    const result = PlantMapper.toObject(input);
    const expected = {
        scientificName: input.scientificName,
        popularName: input.popularName,
        species: input.species,
        image: input.image,
    }
    assert.deepStrictEqual(expected, result);
    });
});
