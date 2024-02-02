// src/events/events.service.ts

import { Injectable } from '@nestjs/common';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class EventsService {
  private events = [];

  getAllEvents() {
    return this.events;
  }

  addEvent(event) {
    const eventWithId = { ...event, id: uuidv4() };
  
    // Parse start time and end time to Date objects
    const parsedStartTime = new Date(eventWithId.startTime);
    const parsedEndTime = new Date(eventWithId.endTime);
  
    eventWithId.startTime = parsedStartTime;
    eventWithId.endTime = parsedEndTime;
  
    this.events.push(eventWithId);
    return eventWithId;
  }
  deleteEventById(id: string) {
    const index = this.events.findIndex(event => event.id === id);
    if (index !== -1) {
      this.events.splice(index, 1);
    }
  }  
}
