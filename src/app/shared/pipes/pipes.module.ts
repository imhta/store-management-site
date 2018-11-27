import { NgModule } from '@angular/core';
import {FileSizePipe} from './pipe/file-size-pipe/file-size.pipe';

@NgModule({
  imports: [
  ],
  declarations: [FileSizePipe],
  exports: [FileSizePipe]
})
export class PipesModule { }
