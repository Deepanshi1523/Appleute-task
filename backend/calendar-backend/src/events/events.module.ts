import { Module } from '@nestjs/common';
import { EventsController } from './events.controller';
import { EventsService } from './events.service';
import { MulterModule } from '@nestjs/platform-express';

@Module({
  imports: [
    MulterModule.register({
      dest: './uploads', 
    }),
  ],
  controllers: [EventsController],
  providers: [EventsService],
})
export class EventsModule {}
