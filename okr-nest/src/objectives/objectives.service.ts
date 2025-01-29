import {Injectable} from '@nestjs/common';
import {faker} from '@faker-js/faker';
import {DatabaseService} from '../database/database.service';

@Injectable()
export class ObjectivesService {
    constructor(private readonly databaseService: DatabaseService) {
    }

    mockObjective = [
        {
            id: faker.string.uuid(),
            objective: faker.company.buzzNoun(),
            keyResults: [
                {
                    title: faker.company.buzzNoun(),
                    initialValue: faker.number.int({min: 0, max: 0}),
                    currentValue: faker.number.int({min: 0, max: 10}),
                    targetValue: faker.number.int({min: 10, max: 10}),
                    metrics: faker.company.buzzNoun(),
                },
            ],
        },
    ];

    async fetchAll() {
        // return this.mockObjective;
        return await this.databaseService.execQuery(
            `SELECT *
             FROM objectives`,
        );
    }

    async create(okrs) {
        const {title} = okrs;
        return await this.databaseService.execQuery(
            `INSERT INTO objectives(title)
             values ('${title}')`,
        );
    }
}
