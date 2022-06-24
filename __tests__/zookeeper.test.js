//requesting access to filesystem
const fs = require("fs");
const {
    filterByQuery,
    findById,
    createNewZookeeper,
    validateZookeeper
} = require("../lib/zookeepers.js");
const { zookeepers } = require('../data/zookeepers.json')

//prevent test to add zookeeper
jest.mock('fs');

test("creates a zookeeper object", () => {
    const zookeeper = createNewZookeeper (
        {
            name: "person1", id: "testing12345",
        },
        zookeepers
    );

    expect(zookeeper.name).toBe("person1");
    expect(zookeeper.id).toBe("testing12345");
});

test("filters by query", () => {
    const startingZookeepers = [
        {
            id: "2",
            name: "Lucas",
            age: 31,
            favoriteAnimal: "penguin"
        },
        {
            id: "3",
            name: "Lari",
            age: 67,
            favoriteAnimal: "bear"
        },
    ];

    const updatedZookeepers = filterByQuery({ age: "31"}, startingZookeepers)

    expect(updatedZookeepers.length).toEqual(1)
});

test("finds by Id", () => {
    const startingZookeepers = [
        {
            id: "4",
            name: "Joao",
            age: 31,
            favoriteAnimal: "penguin",
        },
        {
            id: "5",
            name: "Antonio",
            age: 65,
            favoriteAnimal: "bear"
        }
    ];
    const result = findById("5", startingZookeepers)

    expect(result.name).toBe("Antonio");
});

test("validates age", () => {
    const zookeeper = {
        id: "6",
        name: "Ronaldo",
        age: 31,
        favoriteAnimal: "penguin",
    };

    const invalidZookeeper = {
        id: "7",
        name: "Eduardo",
        age: "25",
        favoriteAnimal: "bear",
    };

    const result = validateZookeeper(zookeeper);
    const result2 = validateZookeeper(invalidZookeeper)

    expect(result).toBe(true);
    expect(result2).toBe(false)
});

