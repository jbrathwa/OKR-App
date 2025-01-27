import { Injectable } from '@nestjs/common';

@Injectable()
export class HelloWorldService {
    show(){
        return 'Hello World!';
    }
}
