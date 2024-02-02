import { Controller, Get, Post, Body, UploadedFile, UseInterceptors, Delete, Param } from '@nestjs/common';
import { EventsService } from './events.service';
import { FileInterceptor } from '@nestjs/platform-express/multer';

@Controller('events')
export class EventsController {
  constructor(private readonly eventsService: EventsService) {}

  @Get()
  getAllEvents() {
    return this.eventsService.getAllEvents();
  }

  @Post()
  @UseInterceptors(FileInterceptor('mediaFile'))
  addEvent(@Body() event, @UploadedFile() mediaFile) {
    // `mediaFile` contains the uploaded file details
    this.eventsService.addEvent({ ...event, mediaFile });
    return { message: 'Event added successfully', event };
  }

  @Delete(':id')
  deleteEvent(@Param('id') id: string) {
    this.eventsService.deleteEventById(id);
    return { message: 'Event deleted successfully' };
  }
}
