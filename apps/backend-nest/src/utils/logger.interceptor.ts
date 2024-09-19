import { tap } from 'rxjs/operators';
import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import * as fs from 'fs';

@Injectable()
export class LoggerInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const [req] = context.getArgs();
    const logMessage = `-----------------------\nBefore:${req.hostname}\n`;

    // Guardar en el archivo
    fs.appendFile('logs.txt', logMessage, (err) => {
      if (err) {
        console.error('Error al escribir en el archivo de registro:', err);
      }
    });

    return next.handle().pipe(
      tap((value) => {
        const responseMessage = `Respuesta: ${value}\n -------------------`;

        // Guardar en el archivo
        fs.appendFile('logs.txt', responseMessage, (err) => {
          if (err) {
            console.error('Error al escribir en el archivo de registro:', err);
          }
        });

        // Asegurarse de que el valor se pase sin cambios
        return value;
      }),
    );
  }
}
