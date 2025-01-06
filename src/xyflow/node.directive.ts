import { NgTemplateOutlet } from '@angular/common';
import { ApplicationRef, Component, ContentChild, ContentChildren, Directive, ElementRef, EventEmitter, Injector, Input, NgZone, Output, QueryList, TemplateRef, ViewChildren } from '@angular/core';
import { ReactifyNgComponent, ReactifyReactComponent } from 'ngx-reactify';
import { Handle, NodeResizer, NodeToolbar } from '@xyflow/react';
import * as React from 'react';
import { HandleDirective } from './handle.directive';
import { XYFlowComponent } from './xyflow.component';
import { NodeResizerDirective } from './node-resizer.directive';
import { NodeToolbarDirective } from './node-toolbar.directive';


@Component({
    selector: "ngx-xyflow-node",
    template: `
        @if(template) {
            <ng-container
                [ngTemplateOutlet]="template"
                [ngTemplateOutletContext]="{ '$implicit': data, 'node': node }"
            />
        }
        @else {
            <span style="color: red">
                Node has no template.
            </span>
        }
    `,
    imports: [
        NgTemplateOutlet
    ],
    standalone: true
})
class XYFlowNodeComponent {
    @Input() template: TemplateRef<any>;
    @Input() data: any;
    @Input() node: any;
}


@Directive({
    selector: 'ngx-xyflow>ngx-xyflow-node',
    inputs: ['nodeType']
})
export class NodeDirective {

    @ContentChildren(HandleDirective) handles: QueryList<HandleDirective>;

    @Input() nodeType: string;

    @ContentChild(TemplateRef) template: ElementRef;
    @ContentChild(NodeResizerDirective) nodeResizer: NodeResizerDirective;
    @ContentChild(NodeToolbarDirective) nodeToolbar: NodeToolbarDirective;

    @Output() f = new EventEmitter();

    // @Output() onClick = new EventEmitter<Parameters<MiniMapProps['onClick']>>();
    // @Output() onNodeClick = new EventEmitter<Parameters<MiniMapProps['onNodeClick']>>();
    @Output() blur = new EventEmitter<HTMLElementEventMap['blur']>();
    @Output() click = new EventEmitter<HTMLElementEventMap['click']>();
    @Output() contextmenu = new EventEmitter<HTMLElementEventMap['contextmenu']>();
    @Output() dblclick = new EventEmitter<HTMLElementEventMap['dblclick']>();
    @Output() drag = new EventEmitter<HTMLElementEventMap['drag']>();
    @Output() dragend = new EventEmitter<HTMLElementEventMap['dragend']>();
    @Output() dragenter = new EventEmitter<HTMLElementEventMap['dragenter']>();
    @Output() dragleave = new EventEmitter<HTMLElementEventMap['dragleave']>();
    @Output() dragover = new EventEmitter<HTMLElementEventMap['dragover']>();
    @Output() dragstart = new EventEmitter<HTMLElementEventMap['dragstart']>();
    @Output() focus = new EventEmitter<HTMLElementEventMap['focus']>();
    @Output() keydown = new EventEmitter<HTMLElementEventMap['keydown']>();
    @Output() keyup = new EventEmitter<HTMLElementEventMap['keyup']>();
    @Output() keypress = new EventEmitter<HTMLElementEventMap['keypress']>();
    @Output() mousedown = new EventEmitter<HTMLElementEventMap['mousedown']>();
    @Output() mouseenter = new EventEmitter<HTMLElementEventMap['mouseenter']>();
    @Output() mouseleave = new EventEmitter<HTMLElementEventMap['mouseleave']>();
    @Output() mousemove = new EventEmitter<HTMLElementEventMap['mousemove']>();
    @Output() mouseout = new EventEmitter<HTMLElementEventMap['mouseout']>();
    @Output() mouseover = new EventEmitter<HTMLElementEventMap['mouseover']>();
    @Output() mouseup = new EventEmitter<HTMLElementEventMap['mouseup']>();
    @Output() mousewheel = new EventEmitter<HTMLElementEventMap['wheel']>();
    @Output() pointercancel = new EventEmitter<HTMLElementEventMap['pointercancel']>();
    @Output() pointerdown = new EventEmitter<HTMLElementEventMap['pointerdown']>();
    @Output() pointerenter = new EventEmitter<HTMLElementEventMap['pointerenter']>();
    @Output() pointerleave = new EventEmitter<HTMLElementEventMap['pointerleave']>();
    @Output() pointermove = new EventEmitter<HTMLElementEventMap['pointermove']>();
    @Output() pointerout = new EventEmitter<HTMLElementEventMap['pointerout']>();
    @Output() pointerover = new EventEmitter<HTMLElementEventMap['pointerover']>();
    @Output() pointerrawupdate = new EventEmitter<Event>();
    @Output() pointerup = new EventEmitter<HTMLElementEventMap['pointerup']>();
    @Output() resize = new EventEmitter<HTMLElementEventMap['resize']>();
    @Output() scroll = new EventEmitter<HTMLElementEventMap['scroll']>();
    @Output() wheel = new EventEmitter<HTMLElementEventMap['wheel']>();

    constructor(
        private readonly xyflow: XYFlowComponent,
        private readonly appRef: ApplicationRef,
        private readonly injector: Injector,
        private readonly ngZone: NgZone
    ) { }

    ngOnChanges() {
        this.xyflow.ngOnChanges();
    }

    ngAfterViewInit() {
        if (!this.nodeType) {
            console.error(new Error("NGX: XYFlow Node bootstrapped without a node type!\n"));
            return;
        }

        const getProps = (obj = {}) => {
            const props = {};
            Object.entries(obj).forEach(([k, v]) => {
                // Omit things prefixed with an underscore
                if (k.startsWith('_')) return;
                // Omit output event emitters
                if (k.startsWith('on')) return;

                props[k] = v;
            });
            return props;
        }

        this.xyflow.nodeTypes[this.nodeType] = ReactifyReactComponent({
            component: XYFlowNodeComponent,
            appRef: this.appRef,
            injector: this.injector,
            ngZone: this.ngZone,
            preSiblings: [
                this.nodeResizer ? React.createElement(NodeResizer, getProps(this.nodeResizer)) : null,
                this.nodeToolbar ? React.createElement(NodeToolbar, getProps(this.nodeToolbar)) : null
            ].filter(s => s),
            additionalChildren: [
                ...(this.handles?.map(handle => {
                    const props = getProps(handle) as any;
                    // props.onConnect = (connection) =>
                    //     handle.onConnect.next(connection);

                    return React.createElement(Handle, props);
                }) || []),
            ].filter(c => c),
            rootElementName: React.Fragment as any,// "ngx-xyflow-node",
            containerElementName: "ngx-xyflow-node-container",
            staticInputs: { template: this.template },
            staticOutputs: {
                blur: (e) => this.blur.emit(e),
                click: (e) => this.click.emit(e),
                contextMenu: (e) => this.contextmenu.emit(e),
                dblclick: (e) => this.dblclick.emit(e),
                drag: (e) => this.drag.emit(e),
                dragend: (e) => this.dragend.emit(e),
                dragenter: (e) => this.dragenter.emit(e),
                dragleave: (e) => this.dragleave.emit(e),
                dragover: (e) => this.dragover.emit(e),
                dragstart: (e) => this.dragstart.emit(e),
                focus: (e) => this.focus.emit(e),
                keydown: (e) => this.keydown.emit(e),
                keyup: (e) => this.keyup.emit(e),
                keypress: (e) => this.keypress.emit(e),
                mousedown: (e) => this.mousedown.emit(e),
                mouseenter: (e) => this.mouseenter.emit(e),
                mouseleave: (e) => this.mouseleave.emit(e),
                mousemove: (e) => this.mousemove.emit(e),
                mouseout: (e) => this.mouseout.emit(e),
                mouseover: (e) => this.mouseover.emit(e),
                mouseup: (e) => this.mouseup.emit(e),
                mousewheel: (e) => this.mousewheel.emit(e),
                pointercancel: (e) => this.pointercancel.emit(e),
                pointerdown: (e) => this.pointerdown.emit(e),
                pointerenter: (e) => this.pointerenter.emit(e),
                pointerleave: (e) => this.pointerleave.emit(e),
                pointermove: (e) => this.pointermove.emit(e),
                pointerout: (e) => this.pointerout.emit(e),
                pointerover: (e) => this.pointerover.emit(e),
                pointerrawupdate: (e) => this.pointerrawupdate.emit(e),
                pointerup: (e) => this.pointerup.emit(e),
                resize: (e) => this.resize.emit(e),
                scroll: (e) => this.scroll.emit(e),
                wheel: (e) => this.wheel.emit(e),
            }
        })
    }
}
