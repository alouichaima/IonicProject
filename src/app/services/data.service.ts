import { Injectable } from '@angular/core';
import { addDoc, collection, collectionData, deleteDoc, doc, docData, Firestore, updateDoc } from '@angular/fire/firestore';

import { Participation } from 'model/Participation';
import { Observable } from 'rxjs';

export interface EventApp {
  id?: string;
  name: string;
  date: string;
  description: string;
  imageUrl?: string;
}
@Injectable({
  providedIn: 'root'
})
export class DataService {

  constructor(private firestore: Firestore) { }

  getEvents(): Observable<EventApp[]> {
    const eventsRef = collection(this.firestore, 'events');
    return collectionData(eventsRef, { idField: 'id' }) as Observable<EventApp[]>;
  }

  getEventById(id: string): Observable<EventApp> {
    const eventDocRef = doc(this.firestore, `events/${id}`);
    return docData(eventDocRef, { idField: 'id' }) as Observable<EventApp>;
  }

  addEvent(event: EventApp) {
    const eventsRef = collection(this.firestore, 'events');
    return addDoc(eventsRef, event).then(() => {
        console.log('Event added successfully');
    }).catch((error) => {
        console.error('Error adding event: ', error);
    });
  }

  updateEvent(event: EventApp) {
    const eventDocRef = doc(this.firestore, `events/${event.id}`);
    return updateDoc(eventDocRef, {
      name: event.name,
      date: event.date,
      description: event.description,
      imageUrl: event.imageUrl
    });
  }

  deleteEvent(event: EventApp) {
    const eventDocRef = doc(this.firestore, `events/${event.id}`);
    return deleteDoc(eventDocRef);
  }

    addParticipation(participation: Participation) {
      const participationsRef = collection(this.firestore, 'participations');
      return addDoc(participationsRef, participation);
    }


}

