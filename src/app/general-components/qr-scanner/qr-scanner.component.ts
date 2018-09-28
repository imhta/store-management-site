import {Component, EventEmitter, OnInit, Output, ViewChild} from '@angular/core';
import {ZXingScannerComponent} from '@zxing/ngx-scanner';

@Component({
  selector: 'app-qr-scanner',
  templateUrl: './qr-scanner.component.html',
  styleUrls: ['./qr-scanner.component.css']
})
export class QrScannerComponent implements OnInit {

  @Output() product = new EventEmitter<string>();
  @ViewChild('scanner')
  scanner: ZXingScannerComponent;

  hasCameras = false;
  hasPermission: boolean;

  availableDevices: MediaDeviceInfo[];
  selectedDevice: MediaDeviceInfo;
  static playAudio() {
    const audio = new Audio();
    audio.src = '../../assets/audio/audio_beep.wav';
    audio.load();
    audio.play().then();
  }
  ngOnInit() {

    this.scanner.camerasFound.subscribe((devices: MediaDeviceInfo[]) => {
      this.hasCameras = true;

      console.log('Devices: ', devices);
      this.availableDevices = devices;

      // selects the devices's back camera by default
      for (const device of devices) {
          if (/back|rear|environment/gi.test(device.label)) {
              this.scanner.changeDevice(device);
              this.selectedDevice = device;
              break;
          }
      }
    });

    this.scanner.camerasNotFound.subscribe((devices: MediaDeviceInfo[]) => {
      console.error('An error has occurred when trying to enumerate your video-stream-enabled devices.');
    });

    this.scanner.permissionResponse.subscribe((answer: boolean) => {
      this.hasPermission = answer;
    });

  }

  getProduct(product: string) {
    this.product.emit(product);
  }
  handleQrCodeResult(resultString: string) {
    QrScannerComponent.playAudio();
    this.getProduct(resultString);
  }

  onDeviceSelectChange(selectedValue: string) {
    console.log('Selection changed: ', selectedValue);
    this.selectedDevice = this.scanner.getDeviceById(selectedValue);
  }
}
