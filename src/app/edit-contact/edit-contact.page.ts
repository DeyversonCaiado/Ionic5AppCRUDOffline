import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
import { ContactService,Contact} from '../contact.service';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-edit-contact',
  templateUrl: './edit-contact.page.html',
  styleUrls: ['./edit-contact.page.scss'],
})
export class EditContactPage implements OnInit {
  // model = [
  //   {
  //     name : "",
  //     phone : "",
  //     birth : "",
  //     active : Boolean
  //   }];
  model= new Contact();
  key: string;

  name:String;
  phone: Number;
  birth: Date;
  active: Boolean;
  constructor(
    public navCtrl: NavController,
    private contactProvider:ContactService,
    private toast:ToastController,
    private storage:Storage
  ) { 
   /* if(this.navParams.data.contact && this.navParams.data.key){
      this.model = this.navParams.data.contact;
      this.key = this.navParams.data.key;
    }else{
      this.model = new Contact();
    }*/
  }

  save(){
    this.saveContact()
    .then(()=>{
      this.presentToast('Contato salvo');
      this.navCtrl.pop();
    })
    .catch(()=>{
      this.presentToast('Erro ao salvar o contato');

    });

    /*this.storage.forEach((value:Contact,key:string,itrationNumber:Number)=>{
      let contact= new ContactList();
      contact.key = key;
      contact.contact = value;
      contacts.push(contact);
    })
    .then(()=>{
      return Promise.resolve(contacts);
    }) */

    this.storage.forEach((value: any, key: string, iterationNumber: Number) => {
      console.log("key " + key);
      console.log("iterationNumber " + iterationNumber);
      console.log("value " + value);
    });
  }

private saveContact(){
  if(this.key){
    return this.contactProvider.update(this.key, this.model);
  }else{
    return this.contactProvider.insert(this.model);
  }
}

async presentToast(a) {
  const toast = await this.toast.create({
    message:a,
    duration:3000,
    position:"bottom"
  });
  toast.present();
}

  ngOnInit() {
  }

}
