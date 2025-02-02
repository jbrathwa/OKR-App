import axios from 'axios';
import { INestApplication } from '@nestjs/common';
import { App } from 'supertest/types';
import {Test, TestingModule} from "@nestjs/testing";
import {AppModule} from "../src/app.module";
import * as request from "supertest";

describe('HelloWorld Integration', () => {
    let app  : INestApplication<App>;
    const PORT = "3001";
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
            imports: [AppModule],
        }).compile();

        app = module.createNestApplication();
        await  app.init();
        // await app.listen(PORT)
    });

    afterEach(async () => {
        await app.close();
    })

    // it('should returns hello world on calling @Get' , async () =>{
    //     const response = await axios.get(`http://localhost:${PORT}/hello-world`);
    //     expect(response.data).toBe('Hello World!');
    // })

    it('should returns hello world on calling @Get' , async () =>{
        const response = await request(app.getHttpServer()).get("/hello-world/");

        expect(response.text).toBe('Hello World!');
    })
})