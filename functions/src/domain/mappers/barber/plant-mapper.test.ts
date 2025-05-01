import {it} from "node:test";
import * as assert from "node:assert";
import { Barber } from "../../entities/serviceProvider/serviceProvider-entity";
import { BarberMapper } from "./barber-mapper";

export default class MockBarber extends Barber {
    constructor(data: any) {
        super({
            id: data.id,
            name: data.name,
            lastName: data.lastName,
            email: data.email,
            phone: data.phone,
            featuredImage: data.featuredImage,
            portfolio: data.portfolio,
            address: data.address,
            reviews: data.reviews,
            typeOfService: data.typeOfService,
            transationsId: data.transationsId,
            barbershopId: data.barbershopId,
            openingHours: data.openingHours,
            socialMedia: data.socialMedia,
            createdAt: data.createdAt,
            typeUser: data.typeUser,
        });
    }
    static with(data: any): MockBarber {
        return new MockBarber(data);
    }
    static toDto(data: MockBarber): object {
        return {
            id: data._id,
            name: data._name,
            lastName: data._lastName,
            email: data._email,
            phone: data._phone,
            featuredImage: data._featuredImage,
            portfolio: data._portfolio,
            address: data._address,
            reviews: data._reviews,
            typeOfService: data._typeOfService,
            transationsId: data._transationsId,
            barbershopId: data._barbershopId,
            openingHours: data._openingHours,
            socialMedia: data._socialMedia,
            createdAt: data._createdAt,
            typeUser: data._typeUser,
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

it("should create a barber entity from data", () => {
    const data = {
        id: "1",
        name: "Test barber",
        lastName: "Test last name",
        email: "teste@email.com",
        phone: 1234567890,
        featuredImage: "Test image",
        portfolio: ["Test portfolio"],
        address: "Test address",
        reviews: [1, 2, 3],
        typeOfService: ["Test service"],
        transationsId: ["Test transaction"],
        barbershopId: "Test barbershop",
        openingHours: ["Test opening hours"],
        socialMedia: ["Test social media"],
        createdAt: new Date(),
        typeUser: "user"
    };
    const result = BarberMapper.toEntity(data);
    const expect = MockBarber.with(data);
    assert.deepStrictEqual(result, expect);
});

it("should convert a Barber entity to DTO", () => {
    const barber = new MockBarber({
        id: "1",
        name: "Test barber",
        lastName: "Test last name",
        email: "teste@email.com",
        phone: 1234567890,
        featuredImage: "Test image",
        portfolio: ["Test portfolio"],
        address: "Test address",
        reviews: [1, 2, 3],
        typeOfService: ["Test service"],
        transationsId: ["Test transaction"],
        barbershopId: "Test barbershop",
        openingHours: ["Test opening hours"],
        socialMedia: ["Test social media"],
        createdAt: new Date(),
        typeUser: "user",
    });

    const dto = MockBarber.toDto(barber);
    assert.deepStrictEqual(dto, {
        id: barber._id,
        name: barber._name,
        lastName: barber._lastName,
        email: barber._email,
        phone: barber._phone,
        featuredImage: barber._featuredImage,
        portfolio: barber._portfolio,
        address: barber._address,
        reviews: barber._reviews,
        typeOfService: barber._typeOfService,
        transationId: barber._transationsId,
        barbershopId: barber._barbershopId,
        openingHours: barber._openingHours,
        socialMedia: barber._socialMedia,
        createdAt: barber._createdAt,
        typeUser: barber._typeUser,
    });
});

it("should convert an object to a Barber object", () => {
    const input = {
        id: "1",
        name: "Test barber",
        lastName: "Test last name",
        email: "teste@email.com",
        phone: 1234567890,
        featuredImage: "Test image",
        portfolio: ["Test portfolio"],
        address: "Test address",
        reviews: [1, 2, 3],
        typeOfService: ["Test service"],
        transationsId: ["Test transaction"],
        barbershopId: "Test barbershop",
        openingHours: ["Test opening hours"],
        socialMedia: ["Test social media"],
        createdAt: new Date(),
        typeUser: "user",
    };

    const result = MockBarber.toObject(input);
    assert.deepStrictEqual(result, {
        id: input.id,
        name: input.name,
        lastName: input.lastName,
        email: input.email,
        phone: input.phone,
        featuredImage: input.featuredImage,
        portfolio: input.portfolio,
        address: input.address,
        reviews: input.reviews,
        typeOfService: input.typeOfService,
        transationId: input.transationsId,
        barbershopId: input.barbershopId,
        openingHours: input.openingHours,
        socialMedia: input.socialMedia,
        createdAt: input.createdAt,
        typeUser: input.typeUser,
    });
});

