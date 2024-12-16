import { Component, ContentChild, EventEmitter, Input, NgZone, Output, ViewContainerRef, ViewEncapsulation } from '@angular/core';
import { ReactifyNgComponent } from 'ngx-reactify';
import {
    Background,
    Controls,
    MiniMap,
    ReactFlow,
    ReactFlowProps,
    ReactFlowProvider
} from '@xyflow/react';
import * as React from 'react';
import { BackgroundDirective } from './background.directive';
import { ControlsDirective } from './controls.directive';
import { MinimapDirective } from './minimap.directive';


type XYFlowProps = ReactFlowProps<any, any>;

@Component({
    selector: 'ngx-xyflow',
    template: '',
    styleUrls: ['../../node_modules/@xyflow/react/dist/style.css'],
    encapsulation: ViewEncapsulation.None
})
export class XYFlowComponent extends ReactifyNgComponent {

    @Input() nodes: XYFlowProps['nodes'];
    @Input() edges: XYFlowProps['edges'];
    @Input() defaultEdgeOptions: XYFlowProps['defaultEdgeOptions'];

    nodeTypes: XYFlowProps['nodeTypes'] = {};
    edgeTypes: XYFlowProps['edgeTypes'] = {};

    @Input() connectionLineType: XYFlowProps['connectionLineType'];
    @Input() connectionLineStyle: XYFlowProps['connectionLineStyle'];
    @Input() connectionLineComponent: XYFlowProps['connectionLineComponent'];
    @Input() connectionLineContainerStyle: XYFlowProps['connectionLineContainerStyle'];
    @Input() connectionMode: XYFlowProps['connectionMode'];
    @Input() deleteKeyCode: XYFlowProps['deleteKeyCode'];
    @Input() selectionKeyCode: XYFlowProps['selectionKeyCode'];
    @Input() selectionOnDrag: XYFlowProps['selectionOnDrag'];
    @Input() selectionMode: XYFlowProps['selectionMode'];
    @Input() panActivationKeyCode: XYFlowProps['panActivationKeyCode'];
    @Input() multiSelectionKeyCode: XYFlowProps['multiSelectionKeyCode'];
    @Input() zoomActivationKeyCode: XYFlowProps['zoomActivationKeyCode'];
    @Input() snapToGrid: XYFlowProps['snapToGrid'];
    @Input() snapGrid: XYFlowProps['snapGrid'];
    @Input() onlyRenderVisibleElements: XYFlowProps['onlyRenderVisibleElements'];
    @Input() nodesDraggable: XYFlowProps['nodesDraggable'];
    @Input() nodesConnectable: XYFlowProps['nodesConnectable'];
    @Input() nodesFocusable: XYFlowProps['nodesFocusable'];
    @Input() nodeOrigin: XYFlowProps['nodeOrigin'];
    @Input() edgesFocusable: XYFlowProps['edgesFocusable'];
    @Input() elementsSelectable: XYFlowProps['elementsSelectable'];
    @Input() selectNodesOnDrag: XYFlowProps['selectNodesOnDrag'];
    @Input() panOnDrag: XYFlowProps['panOnDrag'];
    @Input() minZoom: XYFlowProps['minZoom'];
    @Input() maxZoom: XYFlowProps['maxZoom'];
    @Input() defaultViewport: XYFlowProps['defaultViewport'];
    @Input() translateExtent: XYFlowProps['translateExtent'];
    @Input() preventScrolling: XYFlowProps['preventScrolling'];
    @Input() nodeExtent: XYFlowProps['nodeExtent'];
    @Input() defaultMarkerColor: XYFlowProps['defaultMarkerColor'];
    @Input() zoomOnScroll: XYFlowProps['zoomOnScroll'];
    @Input() zoomOnPinch: XYFlowProps['zoomOnPinch'];
    @Input() panOnScroll: XYFlowProps['panOnScroll'];
    @Input() panOnScrollSpeed: XYFlowProps['panOnScrollSpeed'];
    @Input() panOnScrollMode: XYFlowProps['panOnScrollMode'];
    @Input() zoomOnDoubleClick: XYFlowProps['zoomOnDoubleClick'];
    @Input() noDragClassName: XYFlowProps['noDragClassName'];
    @Input() noWheelClassName: XYFlowProps['noWheelClassName'];
    @Input() noPanClassName: XYFlowProps['noPanClassName'];
    @Input() fitView: XYFlowProps['fitView'];
    @Input() fitViewOptions: XYFlowProps['fitViewOptions'];
    @Input() connectOnClick: XYFlowProps['connectOnClick'];
    @Input() attributionPosition: XYFlowProps['attributionPosition'];
    @Input() proOptions: XYFlowProps['proOptions'];
    @Input() elevateNodesOnSelect: XYFlowProps['elevateNodesOnSelect'];
    @Input() elevateEdgesOnSelect: XYFlowProps['elevateEdgesOnSelect'];
    @Input() disableKeyboardA11y: XYFlowProps['disableKeyboardA11y'];
    @Input() autoPanOnNodeDrag: XYFlowProps['autoPanOnNodeDrag'];
    @Input() autoPanOnConnect: XYFlowProps['autoPanOnConnect'];
    @Input() connectionRadius: XYFlowProps['connectionRadius'];

    @Output() onBeforeDelete = new EventEmitter<[XYFlowProps['onBeforeDelete']]>
    @Output() onClickConnectEnd = new EventEmitter<[XYFlowProps['onClickConnectEnd']]>
    @Output() onClickConnectStart = new EventEmitter<[XYFlowProps['onClickConnectStart']]>
    @Output() onConnect = new EventEmitter<[XYFlowProps['onConnect']]>
    @Output() onConnectEnd = new EventEmitter<[XYFlowProps['onConnectEnd']]>
    @Output() onConnectStart = new EventEmitter<[XYFlowProps['onConnectStart']]>
    @Output() onDelete = new EventEmitter<[XYFlowProps['onDelete']]>
    @Output() onEdgeClick = new EventEmitter<[XYFlowProps['onEdgeClick']]>
    @Output() onEdgeContextMenu = new EventEmitter<[XYFlowProps['onEdgeContextMenu']]>
    @Output() onEdgeDoubleClick = new EventEmitter<[XYFlowProps['onEdgeDoubleClick']]>
    @Output() onEdgeMouseEnter = new EventEmitter<[XYFlowProps['onEdgeMouseEnter']]>
    @Output() onEdgeMouseLeave = new EventEmitter<[XYFlowProps['onEdgeMouseLeave']]>
    @Output() onEdgeMouseMove = new EventEmitter<[XYFlowProps['onEdgeMouseMove']]>
    @Output() onEdgesChange = new EventEmitter<[XYFlowProps['onEdgesChange']]>
    @Output() onEdgesDelete = new EventEmitter<[XYFlowProps['onEdgesDelete']]>
    @Output() onError = new EventEmitter<[XYFlowProps['onError']]>
    @Output() onInit = new EventEmitter<[XYFlowProps['onInit']]>
    @Output() onMove = new EventEmitter<[XYFlowProps['onMove']]>
    @Output() onMoveEnd = new EventEmitter<[XYFlowProps['onMoveEnd']]>
    @Output() onMoveStart = new EventEmitter<[XYFlowProps['onMoveStart']]>
    @Output() onNodeClick = new EventEmitter<[XYFlowProps['onNodeClick']]>
    @Output() onNodeContextMenu = new EventEmitter<[XYFlowProps['onNodeContextMenu']]>
    @Output() onNodeDoubleClick = new EventEmitter<[XYFlowProps['onNodeDoubleClick']]>
    @Output() onNodeDrag = new EventEmitter<[XYFlowProps['onNodeDrag']]>
    @Output() onNodeDragStart = new EventEmitter<[XYFlowProps['onNodeDragStart']]>
    @Output() onNodeDragStop = new EventEmitter<[XYFlowProps['onNodeDragStop']]>
    @Output() onNodeMouseEnter = new EventEmitter<[XYFlowProps['onNodeMouseEnter']]>
    @Output() onNodeMouseLeave = new EventEmitter<[XYFlowProps['onNodeMouseLeave']]>
    @Output() onNodeMouseMove = new EventEmitter<[XYFlowProps['onNodeMouseMove']]>
    @Output() onNodesChange = new EventEmitter<[XYFlowProps['onNodesChange']]>
    @Output() onNodesDelete = new EventEmitter<[XYFlowProps['onNodesDelete']]>
    @Output() onPaneClick = new EventEmitter<[XYFlowProps['onPaneClick']]>
    @Output() onPaneContextMenu = new EventEmitter<[XYFlowProps['onPaneContextMenu']]>
    @Output() onPaneMouseEnter = new EventEmitter<[XYFlowProps['onPaneMouseEnter']]>
    @Output() onPaneMouseLeave = new EventEmitter<[XYFlowProps['onPaneMouseLeave']]>
    @Output() onPaneMouseMove = new EventEmitter<[XYFlowProps['onPaneMouseMove']]>
    @Output() onPaneScroll = new EventEmitter<[XYFlowProps['onPaneScroll']]>

    @Output() onReconnect = new EventEmitter<[XYFlowProps['onReconnect']]>
    @Output() onReconnectStart = new EventEmitter<[XYFlowProps['onReconnectStart']]>
    @Output() onReconnectEnd = new EventEmitter<[XYFlowProps['onReconnectEnd']]>

    @Output() onSelectionChange = new EventEmitter<[XYFlowProps['onSelectionChange']]>
    @Output() onSelectionContextMenu = new EventEmitter<[XYFlowProps['onSelectionContextMenu']]>
    @Output() onSelectionDrag = new EventEmitter<[XYFlowProps['onSelectionDrag']]>
    @Output() onSelectionDragStart = new EventEmitter<[XYFlowProps['onSelectionDragStart']]>
    @Output() onSelectionDragStop = new EventEmitter<[XYFlowProps['onSelectionDragStop']]>
    @Output() onSelectionEnd = new EventEmitter<[XYFlowProps['onSelectionEnd']]>
    @Output() onSelectionStart = new EventEmitter<[XYFlowProps['onSelectionStart']]>


    @ContentChild(BackgroundDirective) _background: BackgroundDirective;
    @ContentChild(ControlsDirective) _controls: ControlsDirective;
    @ContentChild(MinimapDirective) _minimap: MinimapDirective;

    override ngReactComponent = ({ props }) => {
        const getProps = (obj = {}) => {
            const props = {};
            Object.entries(obj).forEach(([k, v]) => {
                // Omit keys prefixed with _
                if (k.startsWith('_')) return;
                // Omit event emitter properties
                if (k.startsWith('on')) return;

                props[k] = v;
            })
            return props as any;
        }

        const controlProps = getProps(this._controls);
        const minimapProps = getProps(this._minimap);

        controlProps.onFitView = () =>
            this._controls.onFitView.emit();
        controlProps.onInteractiveChange = (interactiveStatus) =>
            this._controls.onInteractiveChange.emit(interactiveStatus);
        controlProps.onZoomIn = () =>
            this._controls.onZoomIn.emit();
        controlProps.onZoomOut = () =>
            this._controls.onZoomOut.emit();

        minimapProps.onClick = () =>
            this._minimap.onClick.emit();
        minimapProps.onNodeClick = () =>
            this._minimap.onNodeClick.emit();

        const reactDirectives = [
            this._background ? React.createElement(Background, getProps(this._background)) : null,
            this._controls ? React.createElement(Controls, controlProps) : null,
            this._minimap ? React.createElement(MiniMap, minimapProps) : null,
        ].filter(r => r);
        return React.createElement(ReactFlowProvider, { children: [] },
            React.createElement(ReactFlow, { ...props } as any,
                ...reactDirectives
            )
        );
    };

    constructor(
        ngContainer: ViewContainerRef,
        ngZone: NgZone
    ) {
        super(ngContainer, ngZone);
    }

    override ngOnInit() {

    }

    override ngAfterViewInit() {
        super.ngAfterViewInit();
    }
}
