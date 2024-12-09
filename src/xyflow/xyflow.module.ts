import { NgModule } from '@angular/core';
import { BackgroundDirective } from './background.directive';
import { ControlsDirective } from './controls.directive';
import { HandleDirective } from './handle.directive';
import { MinimapDirective } from './minimap.directive';
import { NodeResizerDirective } from './node-resizer.directive';
import { NodeToolbarDirective } from './node-toolbar.directive';
import { NodeDirective } from './node.directive';
import { XYFlowComponent } from './xyflow.component';

@NgModule({
    declarations: [
        XYFlowComponent,
        NodeDirective,
        BackgroundDirective,
        ControlsDirective,
        HandleDirective,
        MinimapDirective,
        NodeResizerDirective,
        NodeToolbarDirective
   ],
    exports: [
        XYFlowComponent,
        NodeDirective,
        HandleDirective,
        BackgroundDirective,
        ControlsDirective,
        HandleDirective,
        MinimapDirective,
        NodeResizerDirective,
        NodeToolbarDirective
    ]
})
export class XYFlowModule { }
