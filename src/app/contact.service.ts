import { Injectable } from '@angular/core';
import { Storage } from '@ionic/storage';
import { DatePipe } from "@angular/common";


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  constructor(
    private storage: Storage,
    private datepipe: DatePipe
  ) { }
  public insert(contact:Contact) {
    let key = this.datepipe.transform(new Date(),"ddMMyyyHHmmss");
    return this.save(key, contact);
  }
  public update(key: string, contact:Contact) {
    return this.save(key,contact);
  }
  public save(key: string, contact:Contact) {
    return this.storage.set(key,contact);
  }
  public remove(key) {
    return this.storage.remove(key);
  }
  async getAll() {
    let contacts: ContactList[]=[];
    return this.storage.forEach((value:Contact,key:string,itrationNumber:Number)=>{
      let contact= new ContactList();
      contact.key = key;
      contact.contact = value;
      contacts.push(contact);
    })
    .then(()=>{
      return Promise.resolve(contacts);
    })
    .catch((error)=>{
      return Promise.reject(error);
    });
  }


}
export class Contact{
      name:String;
      phone: Number;
      birth: Date;
      active: Boolean;
}

export class ContactList{
  key:String;
  contact: Contact;
}