import { Controller, Get, Post, Body, Put, UploadedFile, UseInterceptors, Delete, Param } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express/multer';
import { diskStorage } from 'multer';
import { MemoryStorage } from 'multer';
import { extname } from 'path';
import { EventsService } from './events.service';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Post()
  @UseInterceptors(
    FileInterceptor('mediaFile', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async addEvent(@Body() event, @UploadedFile() mediaFile) {
    if (mediaFile) {
      console.log('Image Buffer:', mediaFile.buffer);
      event.mediaFile = {
        buffer: mediaFile.buffer,
        originalname: mediaFile.originalname,
        mimetype: mediaFile.mimetype,
      };
    }

    const result = await this.eventsService.addEvent(event);
    return { message: 'Event added successfully', event: result };
  }

  @Put(':id')
  @UseInterceptors(
    FileInterceptor('mediaFile', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, callback) => {
          const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
          const extension = extname(file.originalname);
          callback(null, `${uniqueSuffix}${extension}`);
        },
      }),
    }),
  )
  async updateEvent(@Param('id') id: string, @Body() updatedEvent, @UploadedFile() mediaFile) {
    if (mediaFile) {
      updatedEvent.mediaFile = mediaFile.filename;
    }

    const result = await this.eventsService.updateEvent(id, updatedEvent);
    if (result) {
      return { message: 'Event updated successfully', event: result };
    } else {
      return { message: 'Event not found' };
    }
  }

  @Delete(':id')
  async deleteEvent(@Param('id') id: string) {
    await this.eventsService.deleteEventById(id);
    return { message: 'Event deleted successfully' };
  }
}
