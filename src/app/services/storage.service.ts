import { Injectable } from '@angular/core';
import { AngularFireStorage, AngularFireUploadTask } from '@angular/fire/compat/storage';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class StorageService {

  constructor(private storage: AngularFireStorage, private authService: AuthService) { }

  uploadFile(file: File): AngularFireUploadTask {
    const userId = this.authService.getUser()?.uid;
    const date = new Date();
    const filePath = userId+'/project0/'+file.name;
    const fileRef = this.storage.ref(filePath);
    return fileRef.put(file);
  }

  deleteFile(filePath: string): void {
    if (!filePath) {
      const fileRef = this.storage.ref(filePath);
      fileRef.delete().subscribe(() => {
        console.log('File deleted');
      }, (error) => {
        console.log(error);
      });
    } else {
      return;
    }
  }

  async getFileAsBase64(filePath: string): Promise<string> {
    const ref = this.storage.ref('F4QfeqBx8SPhaSwxZbuKSUgkRsg1/project0/Koala_-_Nur-Nuru-Bin.jpg');
    const file = await ref.getDownloadURL().toPromise();
    const response = await fetch(file);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (reader.result) {
          const base64data = reader.result.toString().split(',')[1];
          resolve(base64data);
        }
      };
      reader.onerror = () => {
        reject(new Error('Failed to convert file to base64'));
      };
    });
  }
}




