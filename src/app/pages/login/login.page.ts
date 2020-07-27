import { Component, OnInit } from '@angular/core';
import { NavController,ToastController } from '@ionic/angular';
import { ContactService,Contact,ContactList} from '../../contact.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {
  // contacts: ContactList[];
  contacts: ContactList[];
  constructor(
    private navCtrl:NavController,
    private contactProvider:ContactService,
    private toast: ToastController
  ) { }
  ngOnInit() { }
  ionViewDidEnter() {
    this.contactProvider.getAll()
    .then(results=>{
      this.contacts = results;
    })
  }
  addContact(){
    this.navCtrl.navigateRoot(['edit-contact']);
  }

  editContact(item:ContactList){
    /* this.navCtrl.navigateRoot('edit-contact'+{key: item.key, contact: item.contact */
    this.navCtrl.navigateRoot('edit-contact');
  }

  removeContact(item:ContactList){
    this.contactProvider.remove(item.key)
    .then(()=>{
      let index = this.contacts.indexOf(item);
      this.contacts.splice(index,1);
      this.presentToast('Contato removido.');
    })
  }
  async presentToast(a) {
    const toast = await this.toast.create({
      message:a,
      duration:3000,
      position:"bottom"
    });
    toast.present();
  }
}
