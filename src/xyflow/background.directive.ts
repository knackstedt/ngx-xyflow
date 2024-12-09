import { Directive, Input } from '@angular/core';
import { BackgroundProps } from '@xyflow/react';
import { XYFlowComponent } from './xyflow.component';

@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-background'
})
export class BackgroundDirective implements BackgroundProps {

    @Input() bgColor: BackgroundProps['bgColor'];
    @Input() className: BackgroundProps['className'];
    @Input() color: BackgroundProps['color'];
    @Input() gap: BackgroundProps['gap'];
    @Input() id: BackgroundProps['id'];
    @Input() lineWidth: BackgroundProps['lineWidth'];
    @Input() offset: BackgroundProps['offset'];
    @Input() patternClassName: BackgroundProps['patternClassName'];
    @Input() size: BackgroundProps['size'];
    @Input() style: BackgroundProps['style'];
    @Input() variant: BackgroundProps['variant'];

    constructor(private readonly xyflow: XYFlowComponent) {}
    ngOnChanges() {
        this.xyflow.ngOnChanges();
    }
}
