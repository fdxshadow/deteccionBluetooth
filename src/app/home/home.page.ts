import { Component, NgZone } from '@angular/core';
import { BluetoothLE } from '@ionic-native/bluetooth-le/ngx';
import { Platform } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  devices:any = [];

  constructor(private bluetoothle:BluetoothLE,private plt:Platform,private ngZone:NgZone) {
    this.plt.ready().then((readySource)=>{
      console.log('Platform lista para',readySource);
      this.bluetoothle.initialize().subscribe(ble => {
        console.log('ble', ble.status) // logs 'enabled'
      });
    });
  }


  Scan(){
    this.bluetoothle.startScan({}).subscribe((device)=>{
      this.OnDeviceDiscovered(device);
    });
  
  }

  OnDeviceDiscovered(device){
    this.ngZone.run(()=>{
      this.devices.push(device);
      console.log(device);
    });
  }

}
