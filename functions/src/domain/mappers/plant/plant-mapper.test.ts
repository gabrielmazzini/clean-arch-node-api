import {describe, it} from "node:test";
import * as assert from "node:assert";
import { Plant } from "../../entity/plant/plantEntity";
import { PlantMapper } from "./plant-mapper";

describe("Plant Mapper", () => {
it("should create a Plant entity from data", () => {
    const data = {
        id: "1",
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    };
    const result = PlantMapper.toEntity(data);
    const expect = new Plant({
        id: "1",
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    });
    assert.deepStrictEqual(expect, result);
});

it("should convert a Plant entity to DTO", () => {
    const plant = new Plant({
        id: "1",
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

it("should convert an object to a Plant object", () => {
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
