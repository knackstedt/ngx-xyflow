import { NgTemplateOutlet } from '@angular/common';
import {
    ApplicationRef,
    Component,
    Directive,
    ElementRef,
    Injector,
    Input,
    NgZone,
    TemplateRef,
    createComponent
} from '@angular/core';
import * as React from 'react';
import { XYFlowComponent } from './xyflow.component';


@Component({
    selector: "ngx-xyflow-edge",
    template: `
        <div style="width: 100%; height: 100%;">
            @if(template) {
                <ng-container
                    [ngTemplateOutlet]="template"
                    [ngTemplateOutletContext]="{ '$implicit': props }"
                />
            }
        </div>
    `,
    imports: [
        NgTemplateOutlet
    ],
    standalone: true
})
class XYFlowEdgeComponent {
    @Input() template: TemplateRef<any>;
    @Input() props: any;
}


@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-edge'
})
export class EdgeDirective {

    @Input() edgeType: string;

    @Input() template: ElementRef<TemplateRef<any>>;

    constructor(
        private readonly xyflow: XYFlowComponent,
        private readonly appRef: ApplicationRef,
        private readonly injector: Injector,
        private readonly ngZone: NgZone
    ) { }

    ngAfterViewInit() {
        if (!this.edgeType) {
            console.error(new Error("NGX: XYFlow Edge bootstrapped without an edge type!\n"));
            return;
        }

        // Manual Wrapper to bypass ngx-reactify issues
        const ManualWrapper = React.memo((props: any) => {
            const domRef = React.useRef(null);
            const compRef = React.useRef<any>(null);

            React.useEffect(() => {
                if (!domRef.current) return undefined;

                const ref = createComponent(XYFlowEdgeComponent, {
                    environmentInjector: this.appRef.injector,
                    elementInjector: this.injector,
                    hostElement: domRef.current
                });

                ref.setInput('template', this.template);
                ref.setInput('props', props);

                this.appRef.attachView(ref.hostView);
                ref.changeDetectorRef.detectChanges();
                compRef.current = ref;

                return () => {
                    ref.destroy();
                    compRef.current = null;
                };
            }, []);

            React.useEffect(() => {
                if (compRef.current) {
                    compRef.current.setInput('props', props);
                    compRef.current.changeDetectorRef.detectChanges();
                }
            }, [props]);

            // Render using BaseEdge as the wrapper
            return React.createElement(React.Fragment, {},
                React.createElement('div', {
                    ref: domRef,
                    className: 'ngx-xyflow-edge-wrapper',
                    style: { width: '100%', height: '100%', display: 'block' }
                })
            );
        });

        this.xyflow.edgeTypes[this.edgeType] = ManualWrapper;

        // Force re-render of the React component to pick up the new edge type
        this.xyflow.edgeTypes = { ...this.xyflow.edgeTypes };
        (this.xyflow as any)._render();
    }
}
