import { NgModule } from '@angular/core';

import { BootstrapIconsModule } from 'ng-bootstrap-icons';
import { MicFill, MicMuteFill} from 'ng-bootstrap-icons/icons';

const icons = {
  MicFill,
  MicMuteFill

};

@NgModule({
  imports: [
    BootstrapIconsModule.pick(icons)
  ],
  exports: [
    BootstrapIconsModule
  ]
})
export class IconsModule { }