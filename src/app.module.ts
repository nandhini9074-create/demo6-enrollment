import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { SequelizeModule } from '@nestjs/sequelize';
import { validate } from 'env.validation';
import { appConfig, grafanaCredentials, databaseConfig, kafkaConfig, servicesURLs } from '../config/server.config';
import { databaseBuilder } from './common/helpers/database';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AllExceptionsFilter } from './common/errors/catch-all-errors';
import { GenericHttpModule } from './http/http.module';
import { PINO_LOGGER_OPTIONS_TOKEN, PinoLoggerInterceptor } from './logger/logger.interceptor';
import { LoggerModule, PinoLogger } from 'nestjs-pino';
import { CustomLoggerModule } from './logger/logger.module';
import { CardController as EnrollController } from './enrollment/controllers/enroll.controller';
import { CardController as UnenrollController } from './enrollment/controllers/unenroll.controller';
import { CardService as EnrollService } from './enrollment/services/enroll.service';
import { CardService as UnenrollService } from './enrollment/services/unenroll.service';
import { Customer } from './enrollment/entities/customer.model';
import { UserCard } from './enrollment/entities/user-card.model';
import { ActivityLog } from './enrollment/entities/activityLog.model';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [appConfig, databaseConfig, grafanaCredentials, servicesURLs, kafkaConfig],
      cache: true,
      isGlobal: true,
      validate,
    }),
    SequelizeModule.forRootAsync({
      inject: [ConfigService],
      useFactory: (config: ConfigService) => {
        return databaseBuilder(config);
      },
    }),
    SequelizeModule.forFeature([Customer, UserCard, ActivityLog]),
    LoggerModule.forRoot(),
    CustomLoggerModule,
    GenericHttpModule,
  ],
  controllers: [AppController, EnrollController, UnenrollController],
  providers: [
    AppService,
    EnrollService,
    UnenrollService,
    PinoLogger,
    {
      provide: PINO_LOGGER_OPTIONS_TOKEN,
      useValue: {
        logRequests: true,
        logResponseBody: true,
      },
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PinoLoggerInterceptor,
    },
    {
      provide: APP_FILTER,
      useClass: AllExceptionsFilter,
    },
  ],
  exports: [EnrollService, UnenrollService],
})
export class AppModule {}