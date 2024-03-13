import { Body, Controller, Get, Param, Post, Query, Res } from '@nestjs/common';
import { AppService } from './app.service';
import { Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  // We can't use Get('/:variable') under dynamic route, if the route have child/tree route. e.g /detail or /ticket/1
  // Because, Get('/:variable') will replacing the child route. e.g /detail and @Get('/:name') will replacing /detail to /name
  // if we have static route like {host}/detail, we need declare it above dynamic params route
  // because express/nest read the code from top to the bottom and it'll execute the first route it finds
  // Param example: localhost:3000/detail    ---> (we can get the 'detail' using @Get('localhost:3000/:variableName') )
  // Param example: localhost:3000/ticket/1    ---> (we can get the '1' using @Get('localhost:3000/ticket/:variableName') )
  // @Get('/:variableName')
  // getHelloParam(@Param('variableName') variableName: string) {
  //   return `Param: ${variableName}`;
  // }

  // we can't use both Get() and Get(@Query) because it's was a same route. So, it'll be execute first route that is Get()
  // Query example:  localhost:3000?name='Antony'&age=20   ---> (use '&' to add more field or query)
  // Query example:  localhost:3000/ticket?name='Antony'&price=50000   ---> (use '&' to add more field or query)
  // @Get()
  // getHelloQUery(@Query('variableName') variableName: string) {
  //   return `Query: ${variableName}`
  // }

  // @Post()
  // postHelloKitty(@Body() req: any) {
  //   return {
  //     message: 'Success With Post Method',
  //     data: req
  //   }
  // }

  // post with response method
  @Post()
  postMethod(@Body() req: any, @Res() res: Response) {
    // we can return the data either directly or with response.
    // with response method, the value will wait the API executing the function and after finish it'll return the value
    // But, to communicate with Front End Developer we need use response method
    return res.status(400).send({
      message: 'Success Response',
      data: req
    })
  }
}
