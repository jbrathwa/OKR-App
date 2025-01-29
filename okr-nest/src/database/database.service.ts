import {Injectable} from '@nestjs/common';
import {Pool} from 'pg';

@Injectable()
export class DatabaseService {
    private pool: Pool;

    constructor() {
        this.pool = new Pool({
            user: 'sahilnayak',
            host: 'localhost',
            database: 'okrs',
            password: '1234',
            port: 5432,
        });
    }

    async execQuery(q: string) {
        const resonse = await this.pool.query(q);
        return resonse.rows;
    }
}
