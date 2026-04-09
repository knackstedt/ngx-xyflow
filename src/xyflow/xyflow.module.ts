import { NgModule } from '@angular/core';
import { BackgroundDirective } from './background.directive';
import { ControlButtonDirective } from './control-button.directive';
import { ControlsDirective } from './controls.directive';
import { EdgeLabelRendererDirective } from './edge-label-renderer.directive';
import { EdgeToolbarDirective } from './edge-toolbar.directive';
import { EdgeDirective } from './edge.directive';
import { HandleDirective } from './handle.directive';
import { MinimapDirective } from './minimap.directive';
import { NodeResizerDirective } from './node-resizer.directive';
import { NodeToolbarDirective } from './node-toolbar.directive';
import { NodeDirective } from './node.directive';
import { PanelDirective } from './panel.directive';
import { ViewportPortalDirective } from './viewport-portal.directive';
import { XYFlowComponent } from './xyflow.component';

@NgModule({
    declarations: [
        XYFlowComponent,
        NodeDirective,
        EdgeDirective,
        BackgroundDirective,
        ControlsDirective,
        ControlButtonDirective,
        HandleDirective,
        MinimapDirective,
        NodeResizerDirective,
        NodeToolbarDirective,
        EdgeToolbarDirective,
        PanelDirective,
        EdgeLabelRendererDirective,
        ViewportPortalDirective
   ],
    exports: [
        XYFlowComponent,
        NodeDirective,
        EdgeDirective,
        BackgroundDirective,
        ControlsDirective,
        ControlButtonDirective,
        HandleDirective,
        MinimapDirective,
        NodeResizerDirective,
        NodeToolbarDirective,
        EdgeToolbarDirective,
        PanelDirective,
        EdgeLabelRendererDirective,
        ViewportPortalDirective
    ]
})
export class XYFlowModule { }
