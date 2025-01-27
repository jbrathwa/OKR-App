import {faker} from "@faker-js/faker";

export class objectivesService{
    mockObjective = [{
        id: faker.string.uuid(),
        objective: faker.company.buzzNoun(),
        keyResults: [
            {
                title: faker.company.buzzNoun(),
                initialValue: faker.number.int({min: 0, max: 0}),
                currentValue: faker.number.int({min: 0, max: 10}),
                targetValue: faker.number.int({min: 10, max: 10}),
                metrics: faker.company.buzzNoun(),
            }
        ]
    }]

    fetchAll(){
        return this.mockObjective;
    }
}