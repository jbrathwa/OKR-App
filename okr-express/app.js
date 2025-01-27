import express from 'express';
import {faker} from '@faker-js/faker';

const app = express();

let mockObjective = {
    id: faker.string.uuid(),
    objective: faker.company.buzzNoun(),
    keyResults: [
        {
            title: faker.company.buzzNoun(),
            initialValue: faker.number.int({min: 0, max: 0}),
            currentValue: faker.number.int({min: 0, max: 10}),
            targetValue: faker.number.int({min: 10, max: 10}),
            metric: faker.company.buzzNoun(),
        }
    ]
}

let dummyData = {
    firstName: faker.person.firstName(),
    lastName: faker.person.lastName(),
    bio: faker.person.bio(),
    age: faker.number.int({
        min: 1,
        max: 100,
    }),
}

app.get("/", (req, res) => {
    console.log(dummyData);
    res.json(mockObjective);
})


const PORT = 3000;
app.listen(PORT, () => {
    console.log("Server running on port 3000");
});