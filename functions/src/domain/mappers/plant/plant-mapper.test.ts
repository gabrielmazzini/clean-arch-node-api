import {it} from "node:test";
import * as assert from "node:assert";
import { Plant } from "../../entity/plant/plantEntity";
import { PlantMapper } from "./plant-mapper";

export default class MockPlant extends Plant {
    constructor(data: any) {
        super({
            id: data.id,
            scientificName: data.scientificName,
            popularName: data.popularName,
            species: data.species,
            image: data.image,
        });
    }
    static with(data: any): MockPlant {
        return new MockPlant(data);
    }
    static toDto(plant: MockPlant): object {
        return {
            id: plant._id,
            scientificName: plant._scientificName,
            popularName: plant._popularName,
            species: plant._species,
            image: plant._image,
        };
    }
    static toObject(input: object): object {
        const updatedObject: Record<string, any> = {};
        for (const [key, value] of Object.entries(input)) {
            if (value === undefined || key === "_id") continue;
            updatedObject[`_${key}`] = value;
        }
        return updatedObject;
    }
}

it("should create a Plant entity from data", () => {
    const data = {
        _id: "1",
        _scientificName: "Test Scientific Name",
        _popularName: "Test Popular Name",
        _species: "Test Species",
        _image: "Test Image",
    };
    const result = PlantMapper.toEntity(data);
    const expect = MockPlant.with(data);
    console.log("data", data);
    console.log("result", result);
    console.log("expect", expect);
    assert.deepStrictEqual(result, expect);
});

it("should convert a Plant entity to DTO", () => {
    const plant = new MockPlant({
        id: "1",
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    });

    const dto = MockPlant.toDto(plant);
    console.log("plant dto", plant);
    assert.deepStrictEqual(dto, {
        id: plant._id,
        scientificName: plant._scientificName,
        popularName: plant._popularName,
        species: plant._species,
        image: plant._image,
    });
});

it("should convert an object to a Plant object", () => {
    const input = {
        id: "1",
        scientificName: "Test Scientific Name",
        popularName: "Test Popular Name",
        species: "Test Species",
        image: "Test Image",
    };

    const result = MockPlant.toObject(input);
    console.log("plant object", result);
    assert.deepStrictEqual(result, {
        _id: input.id,
        _scientificName: input.scientificName,
        _popularName: input.popularName,
        _species: input.species,
        _image: input.image,
    });
});

