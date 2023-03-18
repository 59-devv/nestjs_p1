import { Injectable } from "@nestjs/common"

@Injectable()
export class AppService {
  getHello(): string {
    var foo = {
      bar: "bar",
      hel: "hel",
    }
    return "Hello World!"
  }
}
