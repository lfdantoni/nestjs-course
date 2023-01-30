import { CallHandler, ExecutionContext, NestInterceptor, UseInterceptors } from "@nestjs/common";
import { map, Observable } from "rxjs";
import { plainToClass } from 'class-transformer';

interface ClassConstructor {
  new (...args: any[]): {}
}

export function Serialize(dto: ClassConstructor) {
  return UseInterceptors(new SerializerInterceptor(dto))
}

class SerializerInterceptor implements NestInterceptor {
  constructor(private dto: ClassConstructor) { }
  intercept(context: ExecutionContext, next: CallHandler<any>): Observable<any> {
    console.log('running before the handler', context)

    return next.handle().pipe(
      map((data: any) => {
        console.log('running after the handler is sent out', data)

        return plainToClass(this.dto, data, {
          excludeExtraneousValues: true
        })
      })
    )
  }

}