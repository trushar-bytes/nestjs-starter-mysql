import { Global, Module } from '@nestjs/common';
import { UsersModule } from './api/users/users.module';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from '../config/configuration'
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AuthModule } from './api/auth/auth.module';
import { CommonService } from 'utils/common.service';
import { ErrorHandlerService } from 'utils/error-handler.service';
import { JwtService } from '@nestjs/jwt';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      isGlobal: true,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get('database.host'),
        port: +configService.get('database.port'),
        username: configService.get('database.user'),
        password: configService.get('database.password'),
        database: configService.get('database.name'),
        entities: [],
        synchronize: true,
        autoLoadEntities: true,
      }),
      inject: [ConfigService],
    }),
    UsersModule,
    AuthModule
  ],
  controllers: [],
  providers: [JwtService],
})
export class AppModule {
  constructor(private dataSource: DataSource) { }
}
